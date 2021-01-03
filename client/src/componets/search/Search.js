import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
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

const Search = ({ searchHouses, houses: { houses, loading } }) => {
  const [hasQuery, setHasQuery] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (formData.address) {
      setHasQuery(true);
      console.log(formData);
      await searchHouses();
    }

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
            <InputGroup>
              <InputGroup.Prepend>
                <Button variant='outline-secondary' type='submit'>
                  <i class='fas fa-search'></i>
                </Button>
              </InputGroup.Prepend>
              <Form.Control
                required
                as='select'
                name='address'
                defaultValue='Choose...'
                onChange={(e) => onChange(e)}
              >
                <option value=''>Choose...</option>
                <option value='all'>All</option>
                <option value='address'>Address</option>
                <option value='rent'>Rent</option>
              </Form.Control>
              {/*<Form.Control type='text' />*/}
            </InputGroup>
          </Form>
        </Row>
        {/* This is where the house result will go */}
        <Row className='mx-auto '>
          {!hasQuery ? (
            ""
          ) : loading ? (
            <Col className='text-center'>
              <br />
              <Spinner animation='border' />
            </Col>
          ) : (
            houses.map((h) => (
              <Col xs='12'>
                <House data={h} showLink={true} />
              </Col>
            ))
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
