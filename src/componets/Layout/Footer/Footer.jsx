import { Row, Col, Container } from "reactstrap";
import './Footer.css'
export default function Footer() {
  return (
    <Container fluid className="footer_container">
      <Row>
        <Col xs={12} md={12}>
          <Row>
            <Col xs={12} md={4} className='px-4 left-content'>
              <h5 className='footer_text' >Version 1.0</h5>
            </Col>
            <Col xs={12} md={8}>
              <Row>
                <Col xs={12} md={4} className='px-4 right-content'>
                  <h5 className='footer_text' >About Us</h5>
                </Col>
                <Col xs={12} md={4} className='px-4 right-content'>
                  <h5 className='footer_text' >Privacy</h5>
                </Col>
                <Col xs={12} md={4} className='px-4 right-content'>
                  <h5 className='footer_text' >Terms</h5>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
