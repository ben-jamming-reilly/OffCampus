import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";

import { newProperty } from "../../actions/property";

const AddProperty = ({ newProperty }) => {
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    zip: 0,
    state: "",
    rent: 0,
    capacity: 0,
    file_name: "",
  });

  const history = useHistory();
  const [previewFile, setPreviewFile] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();

    let file = document.getElementById("image").files;

    if (file) {
      newProperty(formData, file, history);
    }
  };

  const fileOnChange = (e) => {
    setPreviewFile(URL.createObjectURL(e.target.files[0]));
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <br />
      <Col />
      <Col sm='12' md='10' lg='8' xl='8' className='mx-auto'>
        <Row className='float-center rounded border border-secondary'>
          <Form
            onSubmit={(e) => onSubmit(e)}
            style={{
              padding: "10px",
              width: "100%",
              border: "",
            }}
            className='bg-light'
          >
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control
                  name='street'
                  value={formData.street}
                  onChange={(e) => onChange(e)}
                  type='text'
                  required
                  placeholder='Street'
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control
                  name='city'
                  value={formData.city}
                  onChange={(e) => onChange(e)}
                  type='text'
                  required
                  placeholder='City'
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control
                  name='state'
                  value={formData.state}
                  onChange={(e) => onChange(e)}
                  type='select'
                  as='select'
                  required
                  placeholder='State'
                >
                  <option value=''>State</option>
                  <option value='AL'>Alabama</option>
                  <option value='AK'>Alaska</option>
                  <option value='AZ'>Arizona</option>
                  <option value='AR'>Arkansas</option>
                  <option value='CA'>California</option>
                  <option value='CO'>Colorado</option>
                  <option value='CT'>Connecticut</option>
                  <option value='DE'>Delaware</option>
                  <option value='DC'>District Of Columbia</option>
                  <option value='FL'>Florida</option>
                  <option value='GA'>Georgia</option>
                  <option value='HI'>Hawaii</option>
                  <option value='ID'>Idaho</option>
                  <option value='IL'>Illinois</option>
                  <option value='IN'>Indiana</option>
                  <option value='IA'>Iowa</option>
                  <option value='KS'>Kansas</option>
                  <option value='KY'>Kentucky</option>
                  <option value='LA'>Louisiana</option>
                  <option value='ME'>Maine</option>
                  <option value='MD'>Maryland</option>
                  <option value='MA'>Massachusetts</option>
                  <option value='MI'>Michigan</option>
                  <option value='MN'>Minnesota</option>
                  <option value='MS'>Mississippi</option>
                  <option value='MO'>Missouri</option>
                  <option value='MT'>Montana</option>
                  <option value='NE'>Nebraska</option>
                  <option value='NV'>Nevada</option>
                  <option value='NH'>New Hampshire</option>
                  <option value='NJ'>New Jersey</option>
                  <option value='NM'>New Mexico</option>
                  <option value='NY'>New York</option>
                  <option value='NC'>North Carolina</option>
                  <option value='ND'>North Dakota</option>
                  <option value='OH'>Ohio</option>
                  <option value='OK'>Oklahoma</option>
                  <option value='OR'>Oregon</option>
                  <option value='PA'>Pennsylvania</option>
                  <option value='RI'>Rhode Island</option>
                  <option value='SC'>South Carolina</option>
                  <option value='SD'>South Dakota</option>
                  <option value='TN'>Tennessee</option>
                  <option value='TX'>Texas</option>
                  <option value='UT'>Utah</option>
                  <option value='VT'>Vermont</option>
                  <option value='VA'>Virginia</option>
                  <option value='WA'>Washington</option>
                  <option value='WV'>West Virginia</option>
                  <option value='WI'>Wisconsin</option>
                  <option value='WY'>Wyoming</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Control
                      name='zip'
                      value={formData.zip}
                      onChange={(e) => onChange(e)}
                      placeholder='Zip Code'
                      type='number'
                      required
                      min={0}
                      max={99999}
                      step={1}
                    />
                  </Form.Group>
                </Form.Row>
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
                        value={formData.rent !== 0 ? formData.rent : "Zip Code"}
                        onChange={(e) => onChange(e)}
                        placeholder='Rent'
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
                    <Form.File
                      id='image'
                      onChange={fileOnChange}
                      label='Picture of the Property'
                    />
                  </Form.Group>
                </Form.Row>
              </Col>
              <Col className='text-center my-auto'>
                {previewFile && (
                  <Image
                    style={{
                      minWidth: "10rem",
                      maxWidth: "15rem",
                      maxHeight: "10rem",
                    }}
                    src={previewFile}
                  />
                )}
              </Col>
            </Form.Row>
            <Form.Row className='pt-1'>
              <Col>
                <Button type='submit' block>
                  Add Property
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Row>
      </Col>
      <Col />
    </Fragment>
  );
};
/*
AddProperty.propTypes = {
  addProperty: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps, { addProperty })(AddProperty);
*/
export default AddProperty;
