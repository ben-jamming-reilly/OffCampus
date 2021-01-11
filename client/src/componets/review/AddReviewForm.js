import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import ReactStars from "react-stars";
import ReCAPTCHA from "react-google-recaptcha";

const AddReviewForm = ({ property, user, addReviewFunc, alarmFunc }) => {
  const [formData, setFormData] = useState({
    body: "",
    rating: 0,
  });

  const [captcha, setCaptcha] = useState(null);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (formData.rating > 0 && user) {
      // Add Review by Auth
      addReviewFunc(formData, property, user);
    } else if (formData.rating > 0 && captcha) {
      // Add Review by Captcha
      addReviewFunc(formData, property, captcha);
    } else if (formData.rating === 0) {
      alarmFunc("Rating must not be zero", "danger");
    } else {
      alarmFunc("Captcha is required to post a review", "danger");
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Row className='py-0'>
        <Form.Group as={Col}>
          <Form.Label>Review</Form.Label>
          <Form.Control
            as='textarea'
            name='body'
            value={formData.body}
            required
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row className='py-0'>
        <Col>
          <ReactStars
            name='rating'
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e })}
            size={"30"}
            half={true}
          />
        </Col>
        {user && (
          <Col xs='12' md='6' className='text-center my-auto'>
            <Button variant='primary' type='submit'>
              Post Review
            </Button>
          </Col>
        )}
      </Form.Row>
      {!user && (
        <Form.Row className='py-0'>
          <Col xs='12' md='6' className='py-1 text-center'>
            <ReCAPTCHA
              sitekey='6LfkPCEaAAAAAErMd08ve2nZ48ZSqhMMuJurQxH3'
              onChange={(value) => setCaptcha(value)}
            />
          </Col>
          <Col xs='12' md='6' className='text-center my-auto'>
            <Button variant='primary' type='submit'>
              Post Review
            </Button>
          </Col>
        </Form.Row>
      )}
    </Form>
  );
};

export default AddReviewForm;
