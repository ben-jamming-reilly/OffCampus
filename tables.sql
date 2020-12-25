SET sql_mode = STRICT_ALL_TABLES;

DROP TABLE if EXISTS Upvote;
DROP TABLE if EXISTS Review;
DROP TABLE if EXISTS Property;
DROP TABLE if EXISTS User;


CREATE TABLE User (
    user_id VARCHAR(36),
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    user_name VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(80) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,

    PRIMARY KEY (user_id)
);

CREATE TABLE Property (
    street VARCHAR(50),
    city VARCHAR(50),
    zip  INT,

    state VARCHAR(50) NOT NULL,
    type VARCHAR(10),
    bed TINYINT UNSIGNED,
    bath TINYINT UNSIGNED,
    area INT UNSIGNED,
    rent DECIMAL(8,2) UNSIGNED,
    file_name VARCHAR(100),

    PRIMARY KEY (street, city, zip)
);

CREATE TABLE Review (
    user_id VARCHAR(36),
    street VARCHAR(50),
    city VARCHAR(50),
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
    upvoter_user_id VARCHAR(36),

    PRIMARY KEY (user_id,  street, city, zip, upvoter_user_id),
    FOREIGN KEY (user_id) REFERENCES User (user_id),
    FOREIGN KEY (user_id, street, city, zip) REFERENCES Review (user_id, street, city, zip)
);

/* City of Spokane Tax Info */

CREATE TABLE AddressPID (
    street VARCHAR(50),
    city VARCHAR(50),
    zip  INT,
    pid DECIMAL(9, 4) UNIQUE,

    PRIMARY KEY (street, city, zip)
);

CREATE TABLE PIDFloorFeature (
    pid DECIMAL(9, 4),
    floor_type VARCHAR(10),
    beds TINYINT,
    baths TINYINT,
    fin_area INT,
    area INT,

    PRIMARY KEY (pid, floor_type)
);


/* Queries */

SELECT U.user_name, U.user_id, R.review, R.rating, COUNT(Up.upvoter_user_id) as likes
FROM User U JOIN Review R USING(user_id) 
    LEFT JOIN Upvote Up Using(user_id, zip, city, street)
WHERE R.zip = 99163 AND R.city = "Spokane" AND R.street  = "123 XYZ RD"
GROUP BY R.user_id 
ORDER BY likes DESC;



SELECT U.user_name, U.user_id, R.review, R.rating, COUNT(Up.upvoter_user_id) as likes
FROM User U JOIN Review R USING(user_id) 
    LEFT JOIN Upvote Up Using(user_id, zip, city, street)
WHERE R.zip = 99163 AND R.city = "Spokane" AND R.street  = "123 XYZ RD"
GROUP BY R.user_id 
ORDER BY likes DESC;