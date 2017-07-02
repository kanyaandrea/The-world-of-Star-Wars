CREATE TABLE usertable (
    id SERIAL,
    username CHARACTER VARYING(30),
    password CHARACTER(80),
    PRIMARY KEY (id)
    );

CREATE TABLE planetvotes (
    id SERIAL,
    planet_id INT,
    user_id INT,
    submisson_time timestamp without time zone,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES usertable (id)
);  