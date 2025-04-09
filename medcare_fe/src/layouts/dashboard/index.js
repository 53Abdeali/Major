import React, { useContext, useEffect, useState } from 'react';
import { Table, Layout, Menu, theme,Space, Tag,message,Pagination } from 'antd';
import { AuthContext } from 'context';
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import recommendationService from 'services/recommendation.service';
import AddRecommendationModal from './components/Modal';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import Grid from "@mui/material/Grid";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import DataTable from "examples/Tables/DataTable";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import moment from 'moment';


const { Header, Content, Footer } = Layout;

const items = new Array(1).fill(null).map((_, index) => ({
  key: String(index + 1),
  label: `nav ${index + 1}`,
}));
const App = () => {
  const Author = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );
const columns = [
  { Header: "Disease", accessor: "disease", align: "left" },
      { Header: "Description", accessor: "description", align: "center" },
      { Header: "Submission Date", accessor: "submission_date", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
];
const authContext = useContext(AuthContext)
const { i18n,t } = useTranslation(); // Get i18n instance

// Fetch data when the component mounts or when the language changes
const navigate = useNavigate();
const [data, setData] = useState([]); // To store data from API
  const [loading, setLoading] = useState(true); // To show a loader while fetching data
  const [error, setError] = useState(null); // For tracking errors
  const [totalItems, setTotalItems] = useState(0); 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    fetchData(currentPage, pageSize);
  }, [i18n.language, currentPage, pageSize]);
  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  // Function to fetch data from the authenticated API
  const fetchData = async (page = currentPage, limit = pageSize) => {
    try {
      setLoading(true);
      const result = await recommendationService.getRecommendation(page, limit);
      if (result?.data) {
        const formattedData = result.data.map(item => {
          return{
            disease: <Author name={item.disease} />,
            description: <Job description={item.description} />,
            submission_date: (
              <MDTypography variant="caption" color="text" fontWeight="medium">
                {moment(item.created_at).format("DD/MM/YYYY")}
              </MDTypography>
            ),
            action: (
              <IconButton onClick={() => navigate(`/recommendations/${item._id}`)} color="primary">
                <VisibilityIcon />
              </IconButton>
            ),
          } 
        });
        setData(formattedData);
        setTotalItems(result.total); // Update total items
      } else {
        console.error("Unexpected API response:", result.data);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
   const handleLogOut = async () => {
      await authContext.logout();
    };
  return (
    <Layout>
      <DashboardNavbar/>
      <Content style={{ padding: "20px" }}>
      <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Recommendations
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns,rows:data }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  loading = {loading}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        <Pagination
          total={totalItems}
          current={currentPage}
          pageSize={pageSize}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          onChange={handlePaginationChange}
          style={{ marginTop: "20px", textAlign: "center" }}
        />
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
      </Footer>
    </Layout>
  );
};
export default App;