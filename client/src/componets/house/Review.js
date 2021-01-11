import React, { Fragment } from "react";

// Bootstrap
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ReactStars from "react-stars";

const Review = ({
  review,
  property,
  user,
  likeFunc,
  unlikeFunc,
  alarmFunc,
}) => {
  const onClick = (e) => {
    if (user) {
      if (review.isLiked) {
        unlikeFunc(review, property);
      } else {
        likeFunc(review, property);
      }
    } else {
      alarmFunc("You must login to like a review", "danger");
    }
  };

  return (
    <Fragment>
      {review && review !== undefined && (
        <Card>
          <Card.Body>{review.body}</Card.Body>
          <Card.Footer className='py-0'>
            <Row>
              <Col xs='7' sm='4' className='text-left align-self-center'>
                <ReactStars
                  value={review.rating}
                  size={"30"}
                  half={true}
                  edit={false}
                />
              </Col>
              <Col className='text-right pt-1'>
                <Button
                  variant={review.isLiked ? "primary" : "outline-primary"}
                  onClick={(e) => onClick(e)}
                >
                  <i class='far fa-thumbs-up'></i> {review.likes}
                </Button>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      )}
    </Fragment>
  );
};

export default Review;
