using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;

using RSO_TEST_API.Models;
using RSO_TEST_API.DBO;

using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.EntityFrameworkCore;

namespace RSO_TEST_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly DatabaseContext _context;

        private readonly ILogger<LoginController> _logger;

        public LoginController(ILogger<LoginController> logger, DatabaseContext context)
        {
            _logger = logger;
            _context = context;
        }

        /*
        [HttpGet]
        public ActionResult<IEnumerable<RSO>> Get()
        {
            
            var q = _context.Users.FromSqlRaw("SELECT * FROM dbo.USERS");

            if (q == null)
                return BadRequest();
            return Ok(q.ToList());
        }*/

        [HttpPost]
        /*
            Body Example:
            {
	            "email": "user@example.com",
	            "password" : "user"
            }
        
         */
        public ActionResult LoginCredentials([FromBody] emailDBO payload)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Body from request not formatted.");
            }

            var query = _context.Users.FromSqlRaw("SELECT * FROM dbo.USERS WHERE email={0} AND password={1}", payload.email, payload.password).FirstOrDefault();

            if (query == null)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}
