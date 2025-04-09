import { useContext, useState } from "react";
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import BasicLayoutLanding from "layouts/authentication/components/BasicLayoutLanding";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import AuthService from "services/auth-service";
import { AuthContext } from "context";
import { InputLabel } from "@mui/material";

const Register = () => {
  const authContext = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dob: "",
    phone: "",
    agree: false,
  });

  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
    genderError: false,
    dobError: false,
    phoneError: false,
    agreeError: false,
    error: false,
    errorText: "",
  });

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs({
      ...inputs,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneFormat = /^[0-9]{10}$/; // Adjust for your phone number format

    if (inputs.name.trim().length === 0) {
      setErrors({ ...errors, nameError: true });
      return;
    }

    if (inputs.email.trim().length === 0 || !inputs.email.trim().match(mailFormat)) {
      setErrors({ ...errors, emailError: true });
      return;
    }

    if (inputs.password.trim().length < 8) {
      setErrors({ ...errors, passwordError: true });
      return;
    }

    if (inputs.password !== inputs.confirmPassword) {
      setErrors({ ...errors, confirmPasswordError: true });
      return;
    }

    if (!inputs.gender) {
      setErrors({ ...errors, genderError: true });
      return;
    }

    if (!inputs.dob) {
      setErrors({ ...errors, dobError: true });
      return;
    }

    if (!inputs.phone.match(phoneFormat)) {
      setErrors({ ...errors, phoneError: true });
      return;
    }

    if (!inputs.agree) {
      setErrors({ ...errors, agreeError: true });
      return;
    }

    const newUser = {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
      gender: inputs.gender,
      dob: inputs.dob,
      phone: inputs.phone,
    };

    try {
      const response = await AuthService.register(newUser);
      authContext.login(response.access_token, response.refresh_token);

      setInputs({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        dob: "",
        phone: "",
        agree: false,
      });

      setErrors({});
    } catch (err) {
      setErrors({ ...errors, error: true, errorText: err.message });
    }
  };

  return (
    <BasicLayoutLanding image={bgImage}>

<Card raised={true} sx={{ width: 600, padding: 3 }}>
      <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your details to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" method="POST" onSubmit={submitHandler}>
            <MDBox
              display="flex"
              flexWrap="wrap"
              gap={2} // Adjust gap between fields
              sx={{ justifyContent: "space-between" }}
            >
              {/* Left Column */}
              <MDBox flex="1" minWidth="45%">
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="Name"
                    fullWidth
                    name="name"
                    value={inputs.name}
                    onChange={changeHandler}
                    error={errors.nameError}
                  />
                  {errors.nameError && (
                    <MDTypography variant="caption" color="error">
                      The name cannot be empty
                    </MDTypography>
                  )}
                </MDBox>

                <MDBox mb={2}>
                  <MDInput
                    type="email"
                    label="Email"
                    fullWidth
                    name="email"
                    value={inputs.email}
                    onChange={changeHandler}
                    error={errors.emailError}
                  />
                  {errors.emailError && (
                    <MDTypography variant="caption" color="error">
                      Enter a valid email
                    </MDTypography>
                  )}
                </MDBox>

                <MDBox mb={2}>
                  <MDInput
                    type="password"
                    label="Password"
                    fullWidth
                    name="password"
                    value={inputs.password}
                    onChange={changeHandler}
                    error={errors.passwordError}
                  />
                  {errors.passwordError && (
                    <MDTypography variant="caption" color="error">
                      Password must be at least 8 characters
                    </MDTypography>
                  )}
                </MDBox>

                <MDBox mb={2}>
                  <Checkbox name="agree" checked={inputs.agree} onChange={changeHandler} />
                  <MDTypography variant="button" fontWeight="medium" color="text">
                    &nbsp;I agree to the&nbsp;
                    <MDTypography
                      component={Link}
                      to="/terms"
                      variant="button"
                      color="info"
                      fontWeight="bold"
                      textGradient
                    >
                      Terms and Conditions
                    </MDTypography>
                  </MDTypography>
                </MDBox>
              </MDBox>

              {/* Right Column */}
              <MDBox flex="1" minWidth="45%">
                <MDBox mb={2}>
                  <MDInput
                    type="password"
                    label="Confirm Password"
                    fullWidth
                    name="confirmPassword"
                    value={inputs.confirmPassword}
                    onChange={changeHandler}
                    error={errors.confirmPasswordError}
                  />
                  {errors.confirmPasswordError && (
                    <MDTypography variant="caption" color="error">
                      Passwords do not match
                    </MDTypography>
                  )}
                </MDBox>

                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="Gender"
                    fullWidth
                    name="gender"
                    value={inputs.gender}
                    onChange={changeHandler}
                    error={errors.genderError}
                  />
                  {errors.genderError && (
                    <MDTypography variant="caption" color="error">
                      Please select your gender
                    </MDTypography>
                  )}
                </MDBox>

                <MDBox mb={2}>
                <MDInput
                  type="date"
                  label="Date of Birth"
                  fullWidth
                  name="dob"
                  value={inputs.dob}
                  onChange={changeHandler}
                  error={errors.dobError}
                  InputLabelProps={{
                    shrink: true, // Keeps the label floated
                  }}
                  placeholder="dd/mm/yyyy"
                />
                {errors.dobError && (
                  <MDTypography variant="caption" color="error">
                    Date of birth is required
                  </MDTypography>
                )}
              </MDBox>

                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="Phone"
                    fullWidth
                    name="phone"
                    value={inputs.phone}
                    onChange={changeHandler}
                    error={errors.phoneError}
                  />
                  {errors.phoneError && (
                    <MDTypography variant="caption" color="error">
                      Enter a valid phone number
                    </MDTypography>
                  )}
                </MDBox>
              </MDBox>
            </MDBox>

            {/* Submit Button */}
            <MDBox mt={4}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Register
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayoutLanding>

  );
};

export default Register;
