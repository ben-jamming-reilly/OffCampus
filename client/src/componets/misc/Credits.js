import React from "react";

import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import me from "../../media/instagram_profile.jpg";
import nick from "../../media/nick_closeup.jpg";

const Credits = () => {
  return (
    <div className='container'>
      <br />
      <Row>
        <Col className='text-center'>
          <h3 className='font-weight-bold'>Version Alpha, Dev Deployment</h3>
        </Col>
      </Row>
      <Row className=' bg-light rounded border'>
        <Col className='text-center mx-0'>
          <Image src={me} rounded className='border' width='325' />
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
          <p>
            <a href='https://github.com/ben-jamming-reilly'>
              Check out Ben's Github
            </a>
          </p>
          <p>
            <a href='https://www.linkedin.com/in/benjamin-reilly-18b58619a/'>
              Add Ben as a connection on LinkedIn
            </a>
          </p>
        </Col>
      </Row>
      <br />
      <Row className='bg-light rounded border'>
        <Col className='text-center mx-0'>
          <Image src={nick} rounded className='border' width='325' />
        </Col>
        <Col className='my-auto'>
          <h3 className='text-center font-weight-bold'>
            Additional Help By: Nick Smith
          </h3>
          <p>
            Designed favicons, added additional styling, and pentested the WAPP
          </p>
          <p>
            <a href='https://github.com/TheGentlemanCoder'>
              Check out Nick's Github
            </a>
          </p>
          <p>
            <a href='https://www.linkedin.com/in/nicholas-smith-2022/'>
              Add Nick as a connection on LinkedIn
            </a>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Credits;
