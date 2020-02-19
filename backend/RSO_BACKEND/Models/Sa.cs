using System;
using System.ComponentModel.DataAnnotations;

namespace RSO_TEST_API.Models
{
    public class Sa
    {
        [Key]
        public int sa_id { get; set; }
        public string username { get; set;}
        public string email { get; set; }
        public string password { get; set; }

    }
}
/*
CREATE TABLE SA
(
    sa_id Integer NOT NULL Identity,
    username varchar(20) NOT NULL,
    email varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    PRIMARY KEY(sa_id)
)
 */