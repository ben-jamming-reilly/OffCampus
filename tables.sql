SET sql_mode = STRICT_ALL_TABLES;

DROP TABLE if EXISTS Upvote;
DROP TABLE if EXISTS Review;
DROP TABLE if EXISTS Property;
DROP TABLE if EXISTS User;
DROP TABLE if EXISTS SpokaneParcel;


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
    zip INT,

    state VARCHAR(2) NOT NULL,

    type VARCHAR(10),
    next_lease_date DATE,
    bed TINYINT UNSIGNED,
    bath TINYINT UNSIGNED,
    area INT UNSIGNED,

    rent DECIMAL(8,2) UNSIGNED,

    file_name VARCHAR(100),
    pic_link VARCHAR(100),
    verified BOOLEAN,

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
    city VARCHAR(50),
    zip  INT,
    upvoter_user_id VARCHAR(36),

    PRIMARY KEY (user_id,  street, city, zip, upvoter_user_id),
    FOREIGN KEY (user_id) REFERENCES User (user_id),
    FOREIGN KEY (user_id, street, city, zip) REFERENCES Review (user_id, street, city, zip)
);

/* City of Spokane Tax Info */

CREATE TABLE ParcelData (
    street VARCHAR(50),
    city VARCHAR(50),
    zip INT,

    pid VARCHAR(50),

    owner_name VARCHAR(100),
    gross_sale_price DECIMAL(9, 2),
    excise_nbr VARCHAR(20),
    transfer_type VARCHAR(50),
    prop_use_desc VARCHAR(30),
    tax_code_area VARCHAR(4),
    acreage DECIMAL(4,2),
    InspectionYear INT,
    row_num INT,

    PRIMARY KEY (street, city, zip, pid)
);

CREATE TABLE ParcelFeature (
    id INT NOT NULL AUTO_INCREMENT, 
    pid VARCHAR(50) NOT NULL,
    feat_code VARCHAR(10),
    feat_desc VARCHAR(50),

    PRIMARY KEY (id)
);

CREATE TABLE ParcelFloor (
    id INT NOT NULL AUTO_INCREMENT, 

    pid VARCHAR(50) NOT NULL,
    bldg_num VARCHAR(3),
    floor VARCHAR(50),
    sq_ft SMALLINT UNSIGNED,
    fin_area SMALLINT UNSIGNED,
    beds TINYINT UNSIGNED,
    baths DECIMAL(3,1) UNSIGNED,

    PRIMARY KEY (id)
);