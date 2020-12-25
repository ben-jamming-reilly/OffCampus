import React, { Fragment } from "react";

// Bootstrap
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ReactStars from "react-stars";

const Review = ({ data, property, user, likeFunc, unlikeFunc, alarmFunc }) => {
  const onClick = (e) => {
    if (user) {
      if (data.isLiked) {
        unlikeFunc(data, property);
      } else {
        likeFunc(data, property);
      }
    } else {
      alarmFunc("You must login to like a review", "danger");
    }
  };

  return (
    <Fragment>
      {data && data != undefined && (
        <Card>
          <Card.Body>{data.review}</Card.Body>
          <Card.Footer className='py-1'>
            <Row>
              <Col className='text-left align-self-center'>
                {data.user_name}
              </Col>
              <Col className='text-left align-self-center'>
                <ReactStars
                  value={data.rating}
                  size={"30"}
                  half={false}
                  edit={false}
                />
              </Col>
              <Col className='text-right'>
                <Button
                  variant={data.isLiked ? "primary" : "outline-primary"}
                  onClick={(e) => onClick(e)}
                >
                  <i class='far fa-thumbs-up'></i> {data.likes}
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
