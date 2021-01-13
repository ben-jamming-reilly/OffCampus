import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PageNotFound = () => {
  return (
    <div className='container'>
      <Row className='text-center py-5 '>
        <Col>
          <br />
          <br />
          <h1>
            <i class='far fa-frown fa-5x'></i>
          </h1>
          <br />
          <h1>404</h1>
          <br />
          <h5>Oops... page not found</h5>
          <Link to='/'>
            <h5>Go Back</h5>
          </Link>
          <br />
          <br />
          <Link to='/credits' className='text-danger'>
            <h5>Credits</h5>
          </Link>
          <br />
          <br />
        </Col>
      </Row>
    </div>
  );
};

export default PageNotFound;
