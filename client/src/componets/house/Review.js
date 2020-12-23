import React, { Fragment } from "react";

// Bootstrap
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Review = ({ data, likeFunc, unlikeFunc }) => {
  const onClick = (e) => {
    /*
    if (data.isLiked) {
      unlikeFunc(data, address);
    } else {
      likeFunc(data, address);
    }
    */
  };

  return (
    <Fragment>
      <br />
      <Card>
        <Card.Body>{data.review}</Card.Body>
        <Card.Footer className='py-1'>
          <Row>
            <Col className='text-left align-self-center'>{data.user_name}</Col>
            <Col className='text-right'>
              <Button
                variant={data.isLiked ? "primary" : "outline-primary"}
                onClick={(e) => onClick(e)}
              >
                <i class='far fa-thumbs-up'></i>{" "}
                {data.numLikes ? Number(data.num_likes) : 0}
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Fragment>
  );
};

export default Review;
