import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Actions
import { signup } from "../../actions/auth";
import { setAlarm } from "../../actions/alarm";

// Styling
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// Captcha
import ReCAPTCHA from "react-google-recaptcha";

const Register = ({ signup, setAlarm }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password1: "",
    password2: "",
  });

  const [captcha, setCaptcha] = useState(null);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (formData.password1 !== formData.password2) {
      setAlarm("Passwords do not match", "danger");
      console.log("Passwords do not match.");
      return;
    }

    const userData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      password: formData.password1,
    };
    if (captcha) {
      console.log(captcha);
      signup(userData, captcha);
    } else {
      setAlarm("Captcha is required.", "danger");
    }
  };

  return (
    <Fragment>
      <Form
        className='float-center rounded border border-secondary bg-light'
        onSubmit={(e) => onSubmit(e)}
        style={{
          padding: "10px",
          width: "100%",
        }}
      >
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control
              name='first_name'
              value={formData.first_name}
              onChange={(e) => onChange(e)}
              placeholder='First Name'
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control
              name='last_name'
              value={formData.last_name}
              onChange={(e) => onChange(e)}
              placeholder='Last Name'
            />
          </Form.Group>
        </Form.Row>
        {/*
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control
              name='user_name'
              value={formData.user_name}
              onChange={(e) => onChange(e)}
              placeholder='Username'
              required
            />
          </Form.Group>
          <Col />
        </Form.Row>
        */}
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control
              name='email'
              value={formData.email}
              onChange={(e) => onChange(e)}
              placeholder='Email'
              required
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control
              name='password1'
              type={"password"}
              value={formData.password1}
              onChange={(e) => onChange(e)}
              placeholder='Password'
              minLength='6'
              required
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control
              name='password2'
              type={"password"}
              value={formData.password2}
              onChange={(e) => onChange(e)}
              placeholder='Confirm Password'
              minLength='6'
              required
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <ReCAPTCHA
              sitekey='6LfkPCEaAAAAAErMd08ve2nZ48ZSqhMMuJurQxH3'
              onChange={(value) => setCaptcha(value)}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Button block type='submit'>
              SignUp
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
    </Fragment>
  );
};

Register.propTypes = {
  signup: PropTypes.func.isRequired,
  setAlarm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  signup,
  setAlarm,
})(Register);
