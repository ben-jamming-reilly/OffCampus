import React, { Fragment, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Bootstrap stuff
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { getHouse } from "../../actions/search";
import {
  getReviews,
  addReview,
  likeReview,
  unlikeReview,
} from "../../actions/review";

// Subcomponets
import House from "../house/House";
import Review from "./Review";
import AddReviewForm from "../review/AddReviewForm";
import EditReviewForm from "../review/EditReviewForm";

const HousePage = ({
  getHouse,
  getReviews,
  addReview,
  likeReview,
  unlikeReview,
  houses,
  reviews,
  user,
}) => {
  const history = useHistory();
  // This get address from
  const { zip, city, street } = useParams();

  console.log(reviews);

  useEffect(() => getHouse(zip, city, street), [getHouse, zip, city, street]);

  useEffect(() => getReviews(zip, city, street), [
    getReviews,
    zip,
    city,
    street,
  ]);

  return (
    <Fragment>
      <br />
      <Col />
      <Col sm='12' md='10' lg='8' xl='8' className='mx-auto'>
        <Row className='float-center'>
          {houses.loading || !houses.house ? (
            <Col className='text-center'>
              <br />
              <Spinner animation='border' />
            </Col>
          ) : (
            <Col xs='12'>
              <House data={houses.house} showLink={false} />
            </Col>
          )}
        </Row>
        <br />
        <Row>
          {!houses.loading && houses.house && (
            <Accordion as={Col}>
              <Card>
                <Accordion.Collapse eventKey='0'>
                  <Card.Body>
                    {!reviews.review ? (
                      <AddReviewForm
                        property={houses.house}
                        addReviewFunc={addReview}
                        user={user}
                      />
                    ) : (
                      "Edit"
                    )}
                  </Card.Body>
                </Accordion.Collapse>
                <Card.Footer className='py-0 px-0 text-center bg-primary'>
                  <Accordion.Toggle
                    as={Button}
                    eventKey='0'
                    className='px-0'
                    style={{ width: "100%" }}
                  >
                    {!reviews.review ? "Leave A Review" : "Edit Review"}
                  </Accordion.Toggle>
                </Card.Footer>
              </Card>
            </Accordion>
          )}
        </Row>
        <Row className='float-center'>
          {reviews.loading ? (
            <Col className='text-center'>
              <br />
              <Spinner animation='border' />
            </Col>
          ) : (
            reviews.reviews.map((r) => (
              <Col xs='12'>
                {
                  <Review
                    data={r}
                    likeFunc={likeReview}
                    unlikeFunc={unlikeReview}
                  />
                }
              </Col>
            ))
          )}
        </Row>
      </Col>
      <Col />
    </Fragment>
  );
};

HousePage.propTypes = {
  getHouse: PropTypes.func.isRequired,
  getReviews: PropTypes.func.isRequired,
  addReview: PropTypes.func.isRequired,
  likeReview: PropTypes.func.isRequired,
  unlikeReview: PropTypes.func.isRequired,
  houses: PropTypes.object.isRequired,
  reviews: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  houses: state.houses,
  reviews: state.reviews,
});

export default connect(mapStateToProps, {
  getHouse,
  getReviews,
  addReview,
  likeReview,
  unlikeReview,
})(HousePage);
