import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
import Footer from "layouts/authentication/components/Footer";

const BasicLayoutLanding = ({ image, children }) => {
  return (
    <PageLayout>
      <DefaultNavbar />
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh" // Full viewport height
        height="100%" // Ensure it spans the entire page
        sx={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingTop:"150px",
          backgroundAttachment: "fixed", // Ensures background stays fixed
          overflow: "hidden", // Prevents unwanted scroll
          position: "relative", // Ensures proper layout structure
        }}
      >
        {children}
      </MDBox>
      <Footer />
    </PageLayout>
  );
};

BasicLayoutLanding.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BasicLayoutLanding;
