import { Row, Col } from "reactstrap";

export default function FormFooter() {
  return (
    <Row>
      <Col xs={12} md={12}>
        <Row>
          <Col xs={12} md={4} className='px-4'>
            <h5 className='form_footer_text'>Version 1.0</h5>
          </Col>
          <Col xs={12} md={8}>
            <Row>
              <Col xs={12} md={4} className='px-4'>
                <h5 className='form_footer_text'>About Us</h5>
              </Col>
              <Col xs={12} md={4}>
                <h5 className='form_footer_text'>Privacy</h5>
              </Col>
              <Col xs={12} md={4}>
                <h5 className='form_footer_text'>Terms</h5>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
