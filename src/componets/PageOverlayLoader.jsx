import React from 'react';
import { Spinner } from 'reactstrap'

export default function PageOverlayLoader() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Spinner variant="primary" animation="border" />
    </div>
  );
}
