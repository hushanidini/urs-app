import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  CardTitle,
  Button,
  Input,
  FormFeedback,
  Spinner,
} from "reactstrap";
import "./EditProfile.css";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, clearState } from "../../../redux/userSlice";

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
  dob: yup.string().required("Date of birth is required"),
});
export default function EditProfile() {
  const dispatch = useDispatch();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { isFetching} = useSelector(userSelector);
  const onSubmit = async (user_info) => {

  };

  return (
    <Container
      fluid
      className='d-flex justify-content-center align-items-center'
    >
      <div>
        <Row>
          <Col xs={12} md={12} lg={12}>
            <Row>
              <Col xs={12} md={12}>
                <div className='profile_from p-4 '>
                  <CardTitle
                    tag='h2'
                    className='d-flex justify-content-center align-items-center card-title'
                  >
                    Edit Profile
                  </CardTitle>

                  <Form
                    className='edit_profile_from '
                    onSubmit={handleSubmit(onSubmit)}
                  >
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
                            <FormFeedback>
                              {errors.firstName.message}
                            </FormFeedback>
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
                            <FormFeedback>
                              {errors.lastName.message}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} md={12}>
                        <FormGroup className='flex_direction'>
                          <Label
                            for='exampleEmail'
                            className='custom_input_lable'
                          >
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
                          <Label
                            for='dateOfBirth'
                            className='custom_input_lable'
                          >
                            Date Of Birth{" "}
                          </Label>
                          <Controller
                            name='dob'
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                invalid={!!errors.dob}
                                className='custom_input_style'
                                type='date'
                              />
                            )}
                          />

                          {errors.dob && (
                            <FormFeedback>{errors.dob.message}</FormFeedback>
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
                        <> Update Profile Details</>
                      )}
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
