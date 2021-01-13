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
      {!loading && (
        <Row className='justify-content-center mx-0'>
          <Row className='justify-content-center'>
            <Col className='text-center d-flex justify-content-center px-0'>
              <Card
                className='m-3 py-4'
                style={{ width: "20rem", height: "15rem" }}
                border='primary'
                bg='light'
              >
                <Card.Body className=''>
                  {!user ? (
                    <Fragment>
                      <Link to='/auth/signup' className='stretched-link'>
                        <h3 className='font-weight-bold'>
                          <i class='fas fa-key'></i> Signup
                        </h3>
                      </Link>
                      <p className='font-weight-bold'>
                        Always anonymous, edit your reviews, like other reviews,
                        and save properties you're interested in. Also it's
                        free.
                      </p>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Link to='/me' className='stretched-link'>
                        <h3 className='font-weight-bold'>
                          <i class='fas fa-user'></i> Hey {user.first_name}
                        </h3>
                      </Link>
                      <p className='font-weight-bold'>
                        Edit all the reviews you have left, see reviews you
                        like, and view your saved properties.
                      </p>
                    </Fragment>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col className='text-center d-flex justify-content-center px-0'>
              <Card
                className='m-3 py-4'
                style={{ width: "20rem", height: "15rem" }}
                border='danger'
                bg='light'
              >
                <Card.Body>
                  <Link to='/search' className='stretched-link text-danger'>
                    <h3 className='font-weight-bold '>
                      <i class='fas fa-stream'></i>Add a Review
                    </h3>
                  </Link>
                  <p className='font-weight-bold'>
                    Simply look up a property, leave a review, and read what
                    others thought about it.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className='justify-content-center'>
            <Col className='text-center d-flex justify-content-center px-0'>
              <Card
                className='m-3 py-4'
                style={{ width: "20rem", height: "15rem" }}
                border='success'
                bg='light'
              >
                <Card.Body>
                  <Link to='/' className='stretched-link text-success'>
                    <h3 className='font-weight-bold '>
                      <i class='fas fa-search'></i> Find Housing
                    </h3>
                  </Link>
                  <p className='font-weight-bold'>
                    Search for housing by your needs, save properties, and get
                    connected with a landlord.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col className='text-center d-flex justify-content-center px-0'>
              <Card
                className='m-3 py-4'
                style={{ width: "20rem", height: "15rem" }}
                border='warning'
                bg='light'
              >
                <Card.Body>
                  <Link to='/' className='stretched-link text-warning'>
                    <h3 className='font-weight-bold '>
                      <small>
                        <i class='fas fa-plus'></i>
                      </small>
                      <i class='fas fa-home'></i> Add a Property
                    </h3>
                  </Link>
                  <p className='font-weight-bold'>
                    Is a property not listed? Feel free to add it here.
                  </p>
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
