/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Container, Row, Col, CardTitle,  Button } from "reactstrap";
import "./SuccessRegistered.css";
import { useNavigate } from "react-router-dom";
import FormFooter from "../../../componets/FormFooter";
import circle from "./../../../assets/images/circle.png";

const SuccessRegistered = () => {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }
  return (
    <Container
      fluid
      className='d-flex justify-content-center align-items-center '
      style={{ background: "#205387" }}
    >
      <div style={{width: '580px', marginTop: '5%', marginBottom: '5%'}}>
        <Row>
          <Col xs={12} md={12}>
            <div className='success_registed p-4 rounded shadow-sm white_bg '>
              <div className='d-flex justify-content-center align-items-center'>
                <img src={circle} alt='success' className='success_img' />
              </div>
              <CardTitle
                tag='h2'
                className='d-flex justify-content-center align-items-center main-title'
              >
                Congratulations
              </CardTitle>

              <CardTitle
                tag='h3'
                className='d-flex justify-content-center align-items-center sub-card-title'
              >
                Your account has been created successfully
              </CardTitle>

              <Button className='submit_btn'  onClick={routeChange} >Back to Login</Button>
            </div>
          </Col>
        </Row>

        <FormFooter />
      </div>
    </Container>
  );
};

export default SuccessRegistered;
