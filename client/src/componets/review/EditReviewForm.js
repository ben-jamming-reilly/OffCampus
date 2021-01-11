import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import ReactStars from "react-stars";

const EditReviewForm = ({ property, review, editReviewFunc, user }) => {
  const [formData, setFormData] = useState({
    body: review.body,
    rating: review.rating,
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (formData.rating > 0) {
      console.log(formData);
      editReviewFunc(formData, property, user);
    } else {
      console.log("Please add a rating as well.");
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
        <Col xs='4' className='py-1 float-right'>
          <Button type='submit'>Edit Review</Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default EditReviewForm;
