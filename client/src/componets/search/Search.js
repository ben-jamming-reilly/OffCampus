import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Actions
import { searchHouses } from "../../actions/search";

// Subcomponets
import House from "../house/House";

// Bootstrap Items
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Search = ({
  searchHouses,
  houses: { houses, loading, page, endOfQuery },
}) => {
  const [sentQuery, setSentQuery] = useState(false);
  const [formData, setFormData] = useState({
    street: "",
    city: "Spokane",
    zip: 0,
    state: "WA",
    search: "address",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onLoadMore = (e) => {
    searchHouses(formData, page);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setSentQuery(true);
    console.log(formData);
    searchHouses(formData, page);

    return;
  };

  return (
    <Fragment>
      <br />
      <br />
      <br />
      <Col />
      <Col sm='12' md='10' lg='8' xl='8' className='mx-auto'>
        <Row className='float-center'>
          <Form style={{ width: "100%" }} onSubmit={(e) => onSubmit(e)}>
            <Form.Group as={Col}>
              <InputGroup>
                <InputGroup.Prepend>
                  <Button variant='outline-secondary' type='submit'>
                    <i class='fas fa-search'></i>
                  </Button>
                </InputGroup.Prepend>
                <Form.Control
                  style={{ width: "4rem" }}
                  className='text-center px-0'
                  type='text'
                  required
                  name='street'
                  placeholder='Street'
                  onChange={(e) => onChange(e)}
                />
                <Form.Control
                  className='text-center px-0'
                  type='text'
                  required
                  name='city'
                  value={formData.city}
                  onChange={(e) => onChange(e)}
                  disabled
                />
                <Form.Control
                  className='text-center px-0'
                  type='text'
                  required
                  name='state'
                  value={formData.state}
                  onChange={(e) => onChange(e)}
                  disabled
                />
                <Form.Control
                  className='text-center px-0'
                  type='number'
                  required
                  name='zip'
                  value={formData.zip}
                  onChange={(e) => onChange(e)}
                />
              </InputGroup>
            </Form.Group>
          </Form>
        </Row>
        {/* This is where the house result will go */}
        <Row className='mx-auto text-center'>
          {!sentQuery ? (
            ""
          ) : (
            <Fragment>
              {houses.map((h) => (
                <Col xs='12' className='my-2'>
                  <House data={h} showLink={true} />
                </Col>
              ))}

              {loading && (
                <Col className='text-center'>
                  <br />
                  <Spinner animation='border' />
                </Col>
              )}
              {!loading && !endOfQuery && (
                <Col xs='12' className='my-2'>
                  <Button
                    variant='outline-primary'
                    block
                    className='font-weight-bold'
                    onClick={(e) => onLoadMore()}
                  >
                    Load More
                  </Button>
                </Col>
              )}
              {!loading && (
                <Col xs='12' className='text-center'>
                  <h4>
                    <Link to='/property/add'>Add Property</Link>
                  </h4>
                </Col>
              )}
              <Col>
                <br />
                <br />
                <br />
              </Col>
            </Fragment>
          )}
        </Row>
      </Col>
      <Col />
    </Fragment>
  );
};

Search.propTypes = {
  searchHouses: PropTypes.func.isRequired,
  houses: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  houses: state.houses,
});

export default connect(mapStateToProps, { searchHouses })(Search);
