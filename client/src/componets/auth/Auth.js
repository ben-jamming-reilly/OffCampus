import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";

// Styling
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Auth = ({ isAuthenticated }) => {
  const [isLogin, setAuthType] = useState(true);

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      <br />
      <Col />
      <Col sm='10' md='8' lg='6' xl='6' className='mx-auto'>
        <Row
          style={{
            justifyContent: "center",
          }}
          className='float-center'
        >
          <ButtonGroup toggle>
            <Button
              variant={!isLogin ? "secondary" : "primary"}
              onClick={() => setAuthType(true)}
            >
              Login
            </Button>
            <Button
              variant={isLogin ? "secondary" : "primary"}
              onClick={() => setAuthType(false)}
            >
              Signup
            </Button>
          </ButtonGroup>
        </Row>
        <Row
          style={{
            justifyContent: "center",
          }}
        >
          {isLogin ? <Login /> : <Register />}
        </Row>
      </Col>
      <Col />
    </Fragment>
  );
};

Auth.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Auth);
