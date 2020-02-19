CREATE TABLE ADMIN
(
    admin_id Integer NOT NULL Identity,
    username varchar(20) NOT NULL,
    email varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    PRIMARY KEY(admin_id)
)
CREATE TABLE SA
(
    sa_id Integer NOT NULL Identity,
    username varchar(20) NOT NULL,
    email varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    PRIMARY KEY(sa_id)
)
CREATE TABLE RSO_EVENT
(
    rso_event_id Integer NOT NULL,
    admin_id Integer NOT NULL,
    sa_id INTEGER NOT NULL,
    description varchar(100) NOT NULL,
    date datetime NOT NULL,
	PRIMARY KEY(rso_event_id),
    FOREIGN KEY (admin_id) REFERENCES ADMIN
)
CREATE TABLE RSO
(
    rso_id Integer Identity NOT NULL,
    name varchar(50) NOT NULL,
    school varchar(50) NOT NULL,
    admin_id Integer NOT NULL,
    PRIMARY KEY(rso_id),
    FOREIGN KEY (admin_id) REFERENCES ADMIN
)
CREATE TABLE PRIV_EVENT
(
    priv_event_id Integer Identity NOT NULL,
    description varchar(100) NOT NULL,
    admin_id Integer NOT NULL,
    sa_id Integer NOT NULL,
    PRIMARY KEY(priv_event_id),
    FOREIGN KEY(admin_id) REFERENCES ADMIN,
    FOREIGN KEY(sa_id) REFERENCES SA
)
CREATE TABLE PUB_EVENT
(
    pub_event_id Integer Identity NOT NULL,
    description varchar(100) NOT NULL,
    sa_id Integer NOT NULL,
    PRIMARY KEY(pub_event_id),
    FOREIGN KEY(sa_id) REFERENCES SA
)
CREATE TABLE USERS
(
    user_id Integer Identity NOT NULL,
    username varchar(20) NOT NULL,
    email varchar(50) NOT NULL,
    password varchar(100) NOT NULL,
    PRIMARY KEY(user_id)
)

CREATE TABLE PRIV_COMMENTS
(
    priv_comm_id Integer Identity NOT NULL,
    user_id Integer NOT NULL,
    priv_event_id Integer NOT NULL,
    text varchar(100),
    rating Integer,
    timestamp datetime NOT NULL,
    PRIMARY KEY(priv_comm_id),
    FOREIGN KEY(user_id) REFERENCES USERS,
    FOREIGN KEY(priv_event_id) REFERENCES PRIV_EVENT
)
CREATE TABLE PUBL_COMMENTS
(
    pub_comm_id Integer Identity NOT NULL,
    user_id Integer NOT NULL,
    pub_event_id Integer NOT NULL,
    text varchar(100),
    rating Integer,
    timestamp datetime NOT NULL,
    PRIMARY KEY(pub_comm_id),
    FOREIGN KEY(user_id) REFERENCES USERS,
    FOREIGN KEY(pub_event_id) REFERENCES PUB_EVENT
)
CREATE TABLE RSO_COMMENTS
(
    rso_comm_id Integer Identity NOT NULL,
    user_id Integer NOT NULL,
    rso_event_id Integer NOT NULL,
    text varchar(100),
    rating Integer,
    timestamp datetime NOT NULL,
    PRIMARY KEY(rso_comm_id),
    FOREIGN KEY(user_id) REFERENCES USERS,
    FOREIGN KEY(rso_event_id) REFERENCES RSO_EVENT
)