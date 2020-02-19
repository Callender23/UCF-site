using RSO_TEST_API.Models;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace RSO_TEST_API
{
    public class RSO
    {
        public RSO()
        {
            //this.Admins = new List<Admin>();
        }
        [Key]
        public int rso_id { get; set; }
        public string name { get; set; }
        public string school { get; set; }
        public int admin_id { get; set; }
        //public virtual ICollection<Admin> Admins { get; set; }
    }
}