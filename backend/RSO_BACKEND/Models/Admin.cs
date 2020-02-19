using System;
using System.ComponentModel.DataAnnotations;

namespace RSO_TEST_API.Models
{
    public class Admin
    {
        [Key]
        public int admin_id { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public string password { get; set; }
    }
}
/*
CREATE TABLE ADMIN
(
    admin_id Integer NOT NULL Identity,
    username varchar(20) NOT NULL,
    email varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    PRIMARY KEY(admin_id)
)
 */