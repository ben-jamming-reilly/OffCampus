import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import ReactStars from "react-stars";

const AddReviewForm = ({ property, addReviewFunc, user }) => {
  const [formData, setFormData] = useState({
    review: "",
    rating: 0,
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (formData.rating > 0 && user) {
      console.log(formData);
      addReviewFunc(formData, user, property);
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
        <Col xs='4' className='py-1 float-right'>
          <Button type='submit'>Post Review</Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default AddReviewForm;
