import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import House from "./House";

const AddParcelProperty = ({ property }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    zip: "",
    state: "",
    type: "",
    rent: 0,
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <Accordion>
      <Card>
        <Card.Body className='my-0 mx-0 py-0 px-0'>
          <House data={property} showLink={false} />
        </Card.Body>
        <Accordion.Collapse eventKey='0'>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Control name='type' value={formData.type} required />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Control name='type' value={formData.type} required />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Col className='pl-0 ml-0'>
                  <Button type='submit'>Add Property</Button>
                </Col>
              </Form.Row>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
        <Card.Footer className='py-0 px-0 text-center bg-primary'>
          <Accordion.Toggle
            as={Button}
            eventKey='0'
            className='px-0'
            style={{ width: "100%" }}
          >
            Add Property
          </Accordion.Toggle>
        </Card.Footer>
      </Card>
    </Accordion>
  );
};

export default AddParcelProperty;
