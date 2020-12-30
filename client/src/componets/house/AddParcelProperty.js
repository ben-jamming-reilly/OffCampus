import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";

import House from "./House";

const AddParcelProperty = ({ property }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    zip: "",
    state: "",
    type: "",
    rent: null,
  });
  const [isClicked, setIsClicked] = useState(false);

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
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id='basic-addon1'>
                        <i class='fas fa-dollar-sign'></i>
                      </InputGroup.Text>
                    </InputGroup.Prepend>

                    <Form.Control
                      name='rent'
                      type='number'
                      value={formData.rent}
                      placeholder='Rent'
                      required
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id='basic-addon1'>Type</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type='select' as='select' required>
                      <option value=''>...</option>
                      <option value='house'>House</option>
                      <option value='apartment'>Apartment</option>
                    </Form.Control>
                  </InputGroup>
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
        <Card.Footer className='py-0 px-0 text-center bg-secondary my-0'>
          <Accordion.Toggle
            eventKey='0'
            className='px-0'
            style={{ width: "100%", margin: "0px" }}
          >
            <Button
              block
              variant='secondary'
              style={{ height: "100%", width: "100%" }}
              onClick={(e) => setIsClicked(!isClicked)}
            >
              {!isClicked ? "Add Property" : "Close"}
            </Button>
          </Accordion.Toggle>
        </Card.Footer>
      </Card>
    </Accordion>
  );
};

export default AddParcelProperty;
