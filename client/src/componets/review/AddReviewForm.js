import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import ReactStars from "react-stars";
import ReCAPTCHA from "react-google-recaptcha";

const AddReviewForm = ({ property, addReviewFunc, user, alarmFunc }) => {
  const [formData, setFormData] = useState({
    review: "",
    rating: 0,
    captcha: "",
  });
  console.log(formData.captcha);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (formData.rating > 0 && user) {
      addReviewFunc(formData, user, property);
    } else if (formData.captcha) {
      console.log(formData);
    } else if (!user) {
      console.log(formData);
      alarmFunc("You must login to post a review", "danger");
    } else {
      console.log("Error");
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Row className='py-0'>
        <Form.Group as={Col}>
          <Form.Label>Review</Form.Label>
          <Form.Control
            as='textarea'
            name='review'
            value={formData.review}
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
            half={false}
          />
        </Col>
      </Form.Row>
      <Form.Row className='py-0'>
        <Col xs='12' md='6' className='py-1 text-center'>
          <ReCAPTCHA
            sitekey='6LfkPCEaAAAAAErMd08ve2nZ48ZSqhMMuJurQxH3'
            onChange={(value) => setFormData({ ...formData, captcha: value })}
          />
        </Col>
        <Col xs='12' md='6' className='text-center my-auto'>
          <Button variant='primary' type='submit'>
            Post Review
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default AddReviewForm;
