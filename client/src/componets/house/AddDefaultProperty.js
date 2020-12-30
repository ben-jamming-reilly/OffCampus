import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import Badge from "react-bootstrap/Badge";

const AddDefaultProperty = ({ propertyDefault, addPropertyFunc }) => {
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    zip: "",
    state: "",
    type: "",
    next_lease_date: "",
    beds: "",
    baths: "",
    area: "",
    rent: "",
  });

  const history = useHistory();
  const [previewFile, setPreviewFile] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();

    let file = document.getElementById("image").files;

    if (file) {
      addPropertyFunc(formData, file, history);
    }
  };

  const fileOnChange = (e) => {
    setPreviewFile(URL.createObjectURL(e.target.files[0]));
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <Form
        onSubmit={(e) => onSubmit(e)}
        style={{
          padding: "10px",
          width: "100%",
          border: "",
        }}
        className='bg-light float-center rounded border border-secondary'
      >
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
                value={formData.rent !== 0 ? formData.rent : "Rent"}
                onChange={(e) => onChange(e)}
                placeholder='Rent'
                type='number'
                min={0}
                max={99999}
                step={1}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id='basic-addon1'>Type</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control type='select' as='select'>
                <option value='house'>House</option>
                <option value='apartment'>Apartment</option>
              </Form.Control>
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Row>
              <Form.Group as={Col}>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i class='fas fa-bath '></i>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    name='baths'
                    value={formData.baths}
                    onChange={(e) => onChange(e)}
                    placeholder='Bathrooms'
                    type='number'
                    min={0}
                    max={99999}
                    step={1}
                  />
                </InputGroup>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i class='fas fa-bed'></i>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    name='beds'
                    value={formData.beds}
                    onChange={(e) => onChange(e)}
                    placeholder='Bedrooms'
                    type='number'
                    min={0}
                    max={99999}
                    step={1}
                  />
                </InputGroup>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Col className='align-text-bottom my-auto pt-2' xs='2'>
                <i class='fas fa-image fa-2x'></i>
              </Col>
              <Form.Group as={Col}>
                <Form.File id='image' onChange={fileOnChange} label='' />
              </Form.Group>
            </Form.Row>
          </Col>
          <Col className='text-center my-auto'>
            {previewFile && (
              <Image
                style={{
                  minWidth: "10rem",
                  maxWidth: "15rem",
                  maxHeight: "15rem",
                }}
                rounded
                src={previewFile}
              />
            )}
          </Col>
        </Form.Row>
        <Form.Row className='text-right'>
          <Col>
            <Button type='submit' block>
              Add Property
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </Fragment>
  );
};

export default AddDefaultProperty;
