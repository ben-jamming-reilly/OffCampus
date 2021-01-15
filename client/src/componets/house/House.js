import React from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const House = ({ data, showLink }) => {
  /*
  const onClick = () => {
    history.push(`/property/${address}`);
  };*/

  return (
    <div style={{ padding: "0px 0px 0px 0px" }}>
      <Card className='mx-auto text-center'>
        <Card.Header border='primary' className='py-0 text-truncate'>
          {data.street}, {data.city}, {data.state} {String(data.zip)}
        </Card.Header>
        <Card.Body as={Row} className='py-0 px-0'>
          <Col className='my-auto'>
            {data.file_name ? (
              <Image
                style={{
                  minWidth: "10rem",
                  maxWidth: "15rem",
                  maxHeight: "12rem",
                }}
                className='my-auto'
                rounded
                src={"/uploads/" + data.file_name}
              />
            ) : (
              <Image
                style={{
                  minWidth: "10rem",
                  maxWidth: "15rem",
                  maxHeight: "12rem",
                }}
                className='my-auto'
                rounded
                src={data.pic_link}
              />
            )}
          </Col>
          <Col className='my-auto mx-2'>
            <ListGroup variant='flush' className='py-0 '>
              {data.rent && (
                <ListGroup.Item className='py-1'>
                  Rent: ${data.rent}
                </ListGroup.Item>
              )}
              {data.beds && (
                <ListGroup.Item className='py-1'>
                  Beds: {data.beds}
                </ListGroup.Item>
              )}
              {data.baths && (
                <ListGroup.Item className='py-1'>
                  Baths: {data.baths}
                </ListGroup.Item>
              )}
              {data.area && (
                <ListGroup.Item className='py-1'>
                  Area: {data.area}ft<sup>2</sup>
                </ListGroup.Item>
              )}
              {showLink && (
                <ListGroup.Item className='py-1'>
                  <Link
                    to={`/property/${data.zip}/${data.city}/${data.street}`}
                  >
                    <i class='fas fa-stream' /> Reviews
                  </Link>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
          {data.landlord_id !== undefined && data.landlord_id !== null && (
            <Col xs='12' sm='2' md='2' lg='2' className='my-auto'>
              <Link to={`/landlord/${data.landlord_id}`}>
                <i class='fas fa-address-card fa-2x'></i>
              </Link>
            </Col>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default House;
