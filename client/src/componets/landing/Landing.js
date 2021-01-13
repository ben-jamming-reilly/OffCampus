import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

const Landing = ({ auth: { user, loading } }) => {
  return (
    <Container>
      <br />
      {!loading && (
        <Row className='justify-content-center mx-0'>
          <Row className='justify-content-center'>
            <Col className='text-center d-flex justify-content-center px-0'>
              <Card
                className='m-3 py-4'
                style={{ width: "20rem", height: "15rem" }}
                border='secondary'
                bg='light'
              >
                <Card.Body className=''>
                  {!user ? (
                    <Fragment>
                      <Link to='/auth/signup' className='stretched-link'>
                        <h3 className='font-weight-bold'>Signup</h3>
                      </Link>
                      <p className='font-weight-bold'>
                        Always anonymous, edit your reviews, like other reviews,
                        and save properties you're interested in.
                      </p>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <h3>{`Welcome back ${user.first_name}`}</h3>
                      <p></p>
                    </Fragment>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col className='text-center d-flex justify-content-center px-0'>
              <Card
                className='m-3 py-4'
                style={{ width: "20rem", height: "15rem" }}
                border='secondary'
                bg='light'
              >
                <Card.Body>
                  <h3>hello</h3>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className='justify-content-center'>
            <Col className='text-center d-flex justify-content-center px-0'>
              <Card
                className='m-3 py-4'
                style={{ width: "20rem", height: "15rem" }}
                border='secondary'
                bg='light'
              >
                <Card.Body>
                  <h3>hello</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col className='text-center d-flex justify-content-center px-0'>
              <Card
                className='m-3 py-4'
                style={{ width: "20rem", height: "15rem" }}
                border='secondary'
                bg='light'
              >
                <Card.Body>
                  <h3>hello</h3>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Row>
      )}
    </Container>
  );
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
