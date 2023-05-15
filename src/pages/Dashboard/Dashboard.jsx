import React from "react";
import { Card , Container} from "reactstrap";
import './Dashboard.css';

export default function Dashboard() {
  return (
    <Container fluid>
      <Card
        className={`mainInforCard mt-3 d-flex justify-content-center`}
      >
        <h1>Welcome</h1>
        <p className={'welcomeDetails'}>
          Welcome to urs Dashboard. Manage your account.
        </p>
      </Card>
    </Container>
  );
}
