SET sql_mode = STRICT_ALL_TABLES;

DROP TABLE if EXISTS Upvote;
DROP TABLE if EXISTS Review;
DROP TABLE if EXISTS Property;
DROP TABLE if EXISTS User;


CREATE TABLE User (
    user_id VARCHAR(36),
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    user_name VARCHAR(20) NOT NULL,
    email VARCHAR(80) NOT NULL,
    password VARCHAR(60) NOT NULL,

    PRIMARY KEY (user_id)
);

CREATE TABLE Property (
    street VARCHAR(50),
    city VARCHAR(50) ,
    zip  INT,
    state VARCHAR(50) NOT NULL,

    rent DECIMAL(8,2) UNSIGNED,
    capacity INT,
    file_name VARCHAR(100),

    PRIMARY KEY (street, city, zip)
);

CREATE TABLE Review (
    user_id VARCHAR(36),
    street VARCHAR(50),
    city VARCHAR(50) ,
    zip  INT,

    review VARCHAR(500),
    rating TINYINT,

    PRIMARY KEY (user_id, street, city, zip),
    FOREIGN KEY (street, city, zip) REFERENCES Property(street, city, zip),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE Upvote (
    user_id VARCHAR(36),
    street VARCHAR(50),
    city VARCHAR(50) ,
    zip  INT,
    upvoter_user_id VARCHAR(50),

    PRIMARY KEY (user_id,  street, city, zip, liker_user_id),
    FOREIGN KEY (user_id) REFERENCES User (user_id),
    FOREIGN KEY (user_id, address) REFERENCES Review (user_id, address)
);
