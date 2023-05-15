/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  CardTitle,
  Input,
  Form,
  FormGroup,
  Label,
  Button,
  Spinner,
  FormFeedback,
} from "reactstrap";
import "./register.css";
import { useNavigate } from "react-router-dom";
import FormFooter from "../../../componets/FormFooter";
import { isValidPhoneNumber } from "libphonenumber-js";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import { useRegisterUser } from "../../../hooks/auth.hooks";
import { signupUser, userSelector, clearState } from "../../../redux/userSlice";

const schema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "Must have at least 2 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Must have at least 2 characters"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .min(6, "Must be minimum of 6 characters")
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),

  mobileNumber: yup
    .number()
    .typeError("Please give a valid number")
    .required("Required")
    .min(5, "Must have at least 10 digits"),
});

const Register = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  // const { mutateAsync: registerUser, isLoading } = useRegisterUser();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { isFetching, isSuccess, isError, errorMessage, status } =
    useSelector(userSelector);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      const path = `/success-registered`;
      navigate(path);
    }

    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError]);

  const onSubmit = async (user_info) => {
    const countryCode = "+94";
    const phoneValue = countryCode + user_info.mobileNumber;
    if (!isValidPhoneNumber(phoneValue)) {
      setError("phone_number", {
        type: "custom",
        message: "Invalid phone number!",
      });
    } else {
      const data = {
        email: user_info.email,
        first_name: user_info.firstName,
        last_name: user_info.lastName,
        password: user_info.confirmPassword,
        confirm_password: user_info.confirmPassword,
        mobile_number: phoneValue,
        dob: "1994-01-16",
      };
      try {
        dispatch(signupUser(data));
        // const { message, status } = await registerUser(data);
        // console.log('message', message)

        toast.success("Successfuly registered");
        window.open(`${window.location.origin}/success-registered`, "_self");
      } catch (err) {
        localStorage.clear();
        toast.error(err?.message || err.error);
      }
    }
  };
  return (
    <Container
      fluid
      className='d-flex justify-content-center align-items-center '
      style={{ background: "#205387" }}
    >
      <div style={{ width: "580px", marginTop: "5%", marginBottom: "5%" }}>
        <Row>
          <Col xs={12} md={12}>
            <h2 className='page_header_title'>Create account</h2>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={12}>
            <div className='register_from p-4 rounded shadow-sm white_bg '>
              <CardTitle
                tag='h2'
                className='d-flex justify-content-center align-items-center card-title'
              >
                ABC Company
              </CardTitle>

              <Form className='signup_from ' onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col xs={12} md={6}>
                    <FormGroup className='flex_direction'>
                      <Label for='firstName' className='custom_input_lable'>
                        {" "}
                        First Name
                      </Label>
                      <Controller
                        name='firstName'
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            label={"First Name"}
                            invalid={!!errors.firstName}
                            className='custom_input_style'
                          />
                        )}
                      />
                      {errors.firstName && (
                        <FormFeedback>{errors.firstName.message}</FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <FormGroup className='flex_direction'>
                      <Label for='lastName' className='custom_input_lable'>
                        {" "}
                        Last Name
                      </Label>
                      <Controller
                        name='lastName'
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            label={"Last Name"}
                            invalid={!!errors.lastName}
                            className='custom_input_style'
                          />
                        )}
                      />

                      {errors.lastName && (
                        <FormFeedback>{errors.lastName.message}</FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} md={12}>
                    <Label for='mobileNumber' className='custom_input_lable'>
                      {" "}
                      Mobile Number
                    </Label>
                  </Col>
                  <Col xs={12} md={3}>
                    <FormGroup className='flex_direction'>
                      <Input
                        id='exampleEmail'
                        className='custom_input_style'
                        name='countryCode'
                        type='text'
                        value='+94'
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={9}>
                    <FormGroup className='flex_direction'>
                      <Controller
                        name='mobileNumber'
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            label={"Mobile Number"}
                            invalid={!!errors.mobileNumber}
                            className='custom_input_style'
                          />
                        )}
                      />

                      {errors.mobileNumber && (
                        <FormFeedback>
                          {errors.mobileNumber.message}
                        </FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} md={12}>
                    <FormGroup className='flex_direction'>
                      <Label for='email' className='custom_input_lable'>
                        {" "}
                        Email
                      </Label>
                      <Controller
                        name='email'
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            label={"Email"}
                            invalid={!!errors.email}
                            className='custom_input_style'
                            type='email'
                          />
                        )}
                      />

                      {errors.email && (
                        <FormFeedback>{errors.email.message}</FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} md={12}>
                    <FormGroup className='flex_direction'>
                      <Label for='password' className='custom_input_lable'>
                        Password{" "}
                      </Label>
                      <Controller
                        name='password'
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            label={"Password"}
                            invalid={!!errors.password}
                            className='custom_input_style'
                            type='password'
                          />
                        )}
                      />

                      {errors.password && (
                        <FormFeedback>{errors.password.message}</FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} md={12}>
                    <FormGroup className='flex_direction'>
                      <Label
                        for='confirmPassword'
                        className='custom_input_lable'
                      >
                        Password{" "}
                      </Label>
                      <Controller
                        name='confirmPassword'
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            label={"Confirm Password"}
                            invalid={!!errors.confirmPassword}
                            className='custom_input_style'
                            type='password'
                          />
                        )}
                      />

                      {errors.confirmPassword && (
                        <FormFeedback>
                          {errors.confirmPassword.message}
                        </FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Button
                  type='submit'
                  variant='primary'
                  className={"submit_btn"}
                  size='lg'
                  block
                  disabled={isFetching}
                >
                  {isFetching ? (
                    <Spinner size='sm' variant='white' animation='border' />
                  ) : (
                    <>Create Account</>
                  )}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>

        <FormFooter />
      </div>
    </Container>
  );
};

export default Register;
