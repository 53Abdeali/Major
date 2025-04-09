import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { message } from "antd";
import recommendationService from "services/recommendation.service";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import MedicationIcon from "@mui/icons-material/Medication";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import WarningIcon from "@mui/icons-material/Warning";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Card, CardContent, Chip, Stack } from "@mui/material";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const RecommendationDetail = () => {
  const { id } = useParams();
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    fetchData();
  }, [i18n.language, id]);

  useEffect(() => {
    console.log(recommendation);
  }, [recommendation]);
  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await recommendationService.getRecommendationBy(id);
      if (result?.data) {
        setRecommendation(result.data);
      } else {
        console.error("Unexpected API response:", result.data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!recommendation) return <p>Loading...</p>;

  return (
    <div>
      <DashboardNavbar />
      <Box sx={{ flexGrow: 1, padding: "10px" }}>
        <Card sx={{p:'10px', display:'flex'}}>
          <Typography sx={{fontWeight:'bold'}}>
          Disease :
          </Typography>
          <Typography>
            {recommendation.disease}
          </Typography>
        </Card>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={12} sx={{ backgroundColor: "white", mt: 1 }}>
            <Card>
              <CardContent>
                <Typography
                  sx={{ mt: 4, mb: 2, display: "flex", alignItems: "center" }}
                  variant="h6"
                >
                  <FitnessCenterIcon sx={{ mr: 1 }} /> Symptoms
                </Typography>
                <Demo>
                <Stack direction="row" spacing={1}>
                    {recommendation.symptoms?.map((item, index) => (
                      <Chip label={item} color="primary"  variant="outlined"/>
                    ))}
                  </Stack>
                </Demo>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={2}  sx={{ mt: 1 }}>
          {/* Precautions */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography
                  sx={{ mt: 2, mb: 2, display: "flex", alignItems: "center" }}
                  variant="h6"
                >
                  <WarningIcon sx={{ mr: 1 }} /> Precautions
                </Typography>
                <Demo>
                  <List dense={dense}>
                    {recommendation.precaution?.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={item}
                          secondary={secondary ? "Important" : null}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Demo>
              </CardContent>
            </Card>
          </Grid>

          {/* Medications */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography
                  sx={{ mt: 2, mb: 2, display: "flex", alignItems: "center" }}
                  variant="h6"
                >
                  <MedicationIcon sx={{ mr: 1 }} /> Medications
                </Typography>
                <Demo>
                  <List dense={dense}>
                    {recommendation.medications?.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={item}
                          secondary={secondary ? "Prescription" : null}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Demo>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ backgroundColor: "white", mt: 1 }}>
          {/* Diets */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography
                  sx={{ mt: 2, mb: 2, display: "flex", alignItems: "center" }}
                  variant="h6"
                >
                  <RestaurantIcon sx={{ mr: 1 }} /> Diets
                </Typography>
                <Demo>
                  <List dense={dense}>
                    {recommendation.diets?.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={item}
                          secondary={secondary ? "Healthy Choice" : null}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Demo>
              </CardContent>
            </Card>
          </Grid>

          {/* Workouts */}
          <Grid item xs={12} md={6} sx={{ backgroundColor: "white" }}>
            <Card>
              <CardContent>
                <Typography
                  sx={{ mt: 4, mb: 2, display: "flex", alignItems: "center" }}
                  variant="h6"
                >
                  <FitnessCenterIcon sx={{ mr: 1 }} /> Workouts
                </Typography>
                <Demo>
                  <List dense={dense}>
                    {recommendation.workouts?.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={item}
                          secondary={secondary ? "Exercise Routine" : null}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Demo>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default RecommendationDetail;
