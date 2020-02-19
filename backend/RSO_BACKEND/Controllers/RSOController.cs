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
    public class RSOController : ControllerBase
    {
        private readonly DatabaseContext _context;

        private readonly ILogger<LoginController> _logger;

        public RSOController(ILogger<LoginController> logger, DatabaseContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<RSO>> GetAllRSO()
        {
            var query = _context.RSOs.FromSqlRaw("SELECT * FROM dbo.RSO").ToList().FirstOrDefault();

            if (query == null)
            {
                return BadRequest();
            }

            return Ok(query);
        }

        [HttpGet("{id}")]
        [Route("{controller}/{id:int}")]
        public ActionResult<IEnumerable<RSODBO>> GetRSO(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Console.WriteLine("admin_id: {0}", id);
            var query = _context.RSOs.FromSqlRaw("SELECT * FROM dbo.RSO WHERE admin_id={0}", id).FirstOrDefault();

            if(query == null)
            {
                return BadRequest();
            }

            var payload = new RSODBO {name = query.name, school = query.school};

            return Ok(payload);
        }
    }
}