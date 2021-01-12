import React from "react";
import { Link } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Landing = () => {
  return (
    <div className='container'>
      <Row className='my-3 mx-auto'>
        <Col
          style={{ width: "50%", height: "100%" }}
          className='my-auto bg-light rounded border py-3 px-3 mx-3 text-center'
        >
          <Link to='/auth/signup'>
            <h3>Signup, it's free</h3>
          </Link>
        </Col>
        <Col
          style={{ width: "50%", height: "100%" }}
          className='my-auto bg-light rounded border py-3 px-3 mx-3 text-center'
        >
          <h3>hello</h3>
        </Col>
      </Row>
      <Row className='my-3 mx-auto'>
        <Col
          style={{ width: "50%", height: "100%" }}
          className='my-auto bg-light rounded border py-3 px-3 mx-3 text-center'
        >
          <h3>hello</h3>
        </Col>
        <Col
          style={{ width: "50%", height: "100%" }}
          className='my-auto bg-light rounded border py-3 px-3 mx-3 text-center'
        >
          <h3>hello</h3>
        </Col>
      </Row>
    </div>
  );
};

export default Landing;
