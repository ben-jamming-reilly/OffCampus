import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Landing = () => {
  return (
    <div className='container'>
      <br />
      <Row className='my-3 mx-auto'>
        <Col
          style={{ width: "50%", height: "100%" }}
          className='my-auto bg-light rounded border py-3 px-3 mx-3'
        >
          hello
        </Col>
        <Col
          style={{ width: "50%", height: "100%" }}
          className='my-auto bg-light rounded border py-3 px-3 mx-3'
        >
          hello
        </Col>
      </Row>
      <Row className='my-3 mx-auto'>
        <Col
          style={{ width: "50%", height: "100%" }}
          className='my-auto bg-light rounded border py-3 px-3 mx-3'
        >
          hello
        </Col>
        <Col
          style={{ width: "50%", height: "100%" }}
          className='my-auto bg-light rounded border py-3 px-3 mx-3'
        >
          hello
        </Col>
      </Row>
    </div>
  );
};

export default Landing;
