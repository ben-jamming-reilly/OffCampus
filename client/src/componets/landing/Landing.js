import React from "react";

import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import me from "../../media/instagram_profile.jpg";

const Landing = () => {
  return (
    <div className='container'>
      <br />
      <Row>
        <Col className='text-center mx-0'>
          <Image src={me} rounded />
        </Col>
        <Col>
          <h3 className='text-center font-weight-bold'>By: Benjamin Reilly</h3>
          <p>
            Hello, I created this WAP (Web Application). Hopefully this will be
            useful to you all
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Landing;
