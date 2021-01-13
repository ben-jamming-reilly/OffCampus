import React from "react";
import { Link } from "react-router-dom";

import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import me from "../../media/instagram_profile.jpg";

const Credits = () => {
  return (
    <div className='container'>
      <br />
      <Row className='py-3 bg-light rounded border'>
        <Col className='text-center mx-0'>
          <Image src={me} rounded className='border' />
        </Col>
        <Col className='my-auto'>
          <h3 className='text-center font-weight-bold'>
            Created By: Benjamin Reilly
          </h3>
          <p>
            Hello, I created this WAP (Web Application). Hopefully this will be
            useful to you all
          </p>
          <p>
            My Intention with this WAP is to connect gonzaga students with other
            landlords and other property leasers of the area. Simply leave
            reviews of the properties you have lived at and find houses you are
            interested in renting.
          </p>
          <p>Version Alpha, Dev Deployment</p>
        </Col>
      </Row>
    </div>
  );
};

export default Credits;
