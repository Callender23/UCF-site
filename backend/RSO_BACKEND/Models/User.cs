using System;
using System.ComponentModel.DataAnnotations;
namespace RSO_TEST_API.Models
{
    public class User
    {
        [Key]
        public int user_id { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public string password { get; set; }
    }
}

/*
CREATE TABLE USERS
(
    user_id Integer Identity NOT NULL,
    username varchar(20) NOT NULL,
    email varchar(50) NOT NULL,
    password varchar(100) NOT NULL,
    PRIMARY KEY(user_id)
)
 */