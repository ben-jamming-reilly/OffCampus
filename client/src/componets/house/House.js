import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const House = ({ capacity, rent, address, pic, showLink }) => {
  let history = useHistory();
  const onClick = () => {
    history.push(`/property/${address}`);
  };

  return (
    <Fragment>
      <br />
      <Card className='mx-auto text-center'>
        <Card.Header border='primary'>
          <h4>{address}</h4>
        </Card.Header>
        <Card.Body as={Row}>
          <Image
            className="'my-auto'"
            rounded
            as={Col}
            src={"/uploads/" + pic}
            width={200}
            height={200}
          />
          <Col className='my-auto'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h4>Tenent Capacity: {capacity}</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Rent: ${rent}</h4>
              </ListGroup.Item>
              {showLink && (
                <ListGroup.Item>
                  <Button variant='link' onClick={onClick}>
                    <h4>
                      <i class='fas fa-stream' /> Reviews
                    </h4>
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default House;
