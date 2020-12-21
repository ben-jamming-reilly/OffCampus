import React, { Fragment, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

import { addReview, addNewReview } from "../../actions/review";
import { getHouse } from "../../actions/search";

const AddReview = ({
  addNewReview,
  addReview,
  getHouse,
  houses: { house, loading },
}) => {
  const { address } = useParams();
  const history = useHistory();

  const [formData, setFormData] = useState({
    address: "",
    rent: 0,
    lease_date: "",
    capacity: 0,
    landlord_id: "1",
    file_name: "temp",
    review: "",
  });

  useEffect(() => getHouse(address), [getHouse, address]);

  function dateBS(num) {
    let date = new Date(num);
    console.log(date);
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
  }

  useEffect(
    () =>
      setFormData({
        address: !address || loading ? "" : house.address,
        rent: !address || loading ? 0 : house.rent,
        lease_date: !address || loading ? "" : dateBS(house.lease_date),
        capacity: !address || loading ? 0 : house.capacity,
        file_name: !address || loading ? "temp" : house.file_name,
      }),
    [address, house, loading, getHouse]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    if (address) {
      addReview(formData, address, history);
    } else {
      // new property
      let file = document.getElementById("image").files;
      if (file) {
        addNewReview(formData, file, history);
      }
    }
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <br />
      <Col />
      <Col sm='12' md='10' lg='8' xl='8' className='mx-auto'>
        <Row className='float-center'>
          <Form
            onSubmit={(e) => onSubmit(e)}
            style={{
              padding: "5px",
              width: "100%",
            }}
          >
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control
                  name='address'
                  value={formData.address}
                  onChange={(e) => onChange(e)}
                  placeholder='Address'
                  readOnly={address ? true : false}
                  required={!address ? true : false}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Rent</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id='basic-addon1'>$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    name='rent'
                    value={formData.rent}
                    onChange={(e) => onChange(e)}
                    placeholder='Rent'
                    type='number'
                    min={0}
                    max={20000}
                    step={1}
                    readOnly={address ? true : false}
                    required={!address ? true : false}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Tenant Capacity</Form.Label>
                <Form.Control
                  name='capacity'
                  value={formData.capacity}
                  onChange={(e) => onChange(e)}
                  placeholder='Capcity'
                  type='number'
                  min={0}
                  max={20}
                  step={1}
                  readOnly={address ? true : false}
                  required={!address ? true : false}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Lease Date</Form.Label>
                <Form.Control
                  name='lease_date'
                  value={formData.lease_date}
                  onChange={(e) => onChange(e)}
                  placeholder='Address'
                  type='date'
                  readOnly={address ? true : false}
                  required={!address ? true : false}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              {!address ? (
                <Form.Group as={Col}>
                  <Form.File id='image' label='Picture of the Property' />
                </Form.Group>
              ) : (
                <Col>
                  <Image
                    rounded
                    width={200}
                    height={200}
                    src={`/uploads/${formData.file_name}`}
                  />
                </Col>
              )}
            </Form.Row>
            <br />
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control
                  name='review'
                  value={formData.review}
                  onChange={(e) => onChange(e)}
                  placeholder='Review goes here ...'
                  type='textarea'
                  rows={100}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Button type='submit' block>
                Add Review
              </Button>
            </Form.Row>
          </Form>
        </Row>
      </Col>
      <Col />
    </Fragment>
  );
};

AddReview.propTypes = {
  addReview: PropTypes.func.isRequired,
  addNewReview: PropTypes.func.isRequired,
  getHouse: PropTypes.func.isRequired,
  houses: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  houses: state.houses,
});

export default connect(mapStateToProps, { addNewReview, addReview, getHouse })(
  AddReview
);
