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
  FormFeedback,
  Spinner,
} from "reactstrap";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import { useLogin } from "../../../hooks/auth.hooks";
// import { fetchAuthUser } from "../../../requests/auth.requests";
import FormFooter from "../../../componets/FormFooter";
import { loginUser, userSelector, clearState } from "../../../redux/userSlice";

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const {
    isFetching,
    isSuccess,
    isError,
    errorMessage,
    access_token,
    expires_in
  } = useSelector(userSelector);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }

    if (isSuccess) {
      dispatch(clearState());
      const path = `/`;
      navigate(path);
    }
  }, [isError, isSuccess]);
  // using react query
  // const { mutateAsync: login, isLoading } = useLogin();

  const onSubmit = async (login_info) => {
    const data = {
      username: login_info.email,
      password: login_info.password,
      client_id: "4",
      client_secret: "sfQfhp6tDeGvEp7ZhVwk0MjbpaP55tJ1oJAKuZAE",
      scope: "",
      grant_type: "password",
    };
    try {
      // using react query
      // const { message, access_token, status } = await login(data);
      dispatch(loginUser(data));

      localStorage.setItem("urs-authtoken", access_token);
      toast.success("Successfully login");
      window.open(`${window.location.origin}/dashboard`, "_self");
     
    } catch (err) {
      localStorage.clear();
      toast.error(err?.message);
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
            <h2 className='page_header_title'>Welcome Back</h2>
            <h4 className='page_header_sub_title'>Login to your account</h4>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={12}>
            <div className='login_from p-4 rounded shadow-sm white_bg '>
              <CardTitle
                tag='h2'
                className='d-flex justify-content-center align-items-center card-title'
              >
                ABC Company
              </CardTitle>

              <Form className='signin_from' onSubmit={handleSubmit(onSubmit)}>
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

                <Button
                  type='submit'
                  variant='primary'
                  className={"login_btn"}
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
              <Row className='mt-4'>
                <Col xs={12} md={12}>
                  <h4 className='singUp_text'>
                    Still have you account?{" "}
                    <a href='/register' className='singUp_link'>
                      SINGUP
                    </a>{" "}
                    Now
                  </h4>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <FormFooter />
      </div>
    </Container>
  );
};

export default Login;
