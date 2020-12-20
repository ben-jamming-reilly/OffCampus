import React, { Fragment, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Bootstrap stuff
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

import { getHouse } from "../../actions/search";
import { getReviews, likeReview, unlikeReview } from "../../actions/review";

// Subcomponets
import House from "../house/House";
import Review from "./Review";

const HousePage = ({
  getHouse,
  getReviews,
  likeReview,
  unlikeReview,
  houses,
  reviews,
}) => {
  const history = useHistory();
  // This get address from
  const { address } = useParams();
  useEffect(() => getHouse(address), [getHouse, address]);

  useEffect(() => getReviews(address), [getReviews, address]);

  return (
    <Fragment>
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
              <House
                capacity={houses.house.capacity}
                rent={houses.house.rent}
                address={houses.house.address}
                pic={houses.house.file_name}
                showLink={false}
              />
            </Col>
          )}
        </Row>
        <Row>
          {!houses.loading && houses.house && (
            <Col>
              <Button
                onClick={(e) => history.push(`/addreview/${address}`)}
                block
              >
                Leave a Review
              </Button>
            </Col>
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
                <Review
                  data={r}
                  address={address}
                  likeFunc={likeReview}
                  unlikeFunc={unlikeReview}
                />
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
  likeReview: PropTypes.func.isRequired,
  unlikeReview: PropTypes.func.isRequired,
  houses: PropTypes.object.isRequired,
  reviews: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  houses: state.houses,
  reviews: state.reviews,
});

export default connect(mapStateToProps, {
  getHouse,
  getReviews,
  likeReview,
  unlikeReview,
})(HousePage);
