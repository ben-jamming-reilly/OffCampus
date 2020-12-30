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
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";

import AddDefaultProperty from "./AddDefaultProperty";
import AddParcelProperty from "./AddParcelProperty";

import { newProperty, getParcelProperty } from "../../actions/property";

const AddProperty = ({
  getParcelProperty,
  newProperty,
  houses: { houses, house, loading },
}) => {
  const [formData, setFormData] = useState({
    street: "",
    city: "Spokane",
    zip: "",
    state: "WA",
  });

  const [isSearching, setIsSearching] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSearching(true);

    console.log(formData);

    await getParcelProperty(formData);
    console.log(house);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <br />
      <Col />
      <Col sm='12' md='10' lg='8' xl='8' className='mx-auto px-2'>
        <Row className='float-center mx-auto'>
          <Badge className='float-center display-1' variant='secondary'>
            Add A New Property
          </Badge>
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
                  disabled
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
                  disabled
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
              <Form.Group as={Col}>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id='basic-addon1'>Zip</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    name='zip'
                    value={Number(formData.zip) === 0 ? "" : formData.zip}
                    onChange={(e) => onChange(e)}
                    placeholder='Zip Code'
                    type='number'
                    required
                    min={0}
                    max={99999}
                    maxlength={5}
                    step={1}
                  />
                </InputGroup>
              </Form.Group>
              <Col />
            </Form.Row>
            <Form.Row className='pt-1'>
              <Col>
                <Button type='submit' block>
                  Search for Property
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Row>
        <br />
        <Row className='float-center mx-auto '>
          <Col className='text-center py-0 mx-0 px-0'>
            {!isSearching ? (
              ""
            ) : loading ? (
              <Spinner animation='border' />
            ) : house ? (
              <AddParcelProperty property={house} />
            ) : (
              <AddDefaultProperty />
            )}
          </Col>
        </Row>
      </Col>
      <Col />
    </Fragment>
  );
};

AddProperty.propTypes = {
  newProperty: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  houses: state.houses,
});

export default connect(mapStateToProps, { newProperty, getParcelProperty })(
  AddProperty
);
