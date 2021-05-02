using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using CapstoneAPI2.Models;

namespace CapstoneAPI2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillsDropController : Controller
    {
        private readonly IConfiguration _configuration;

        public SkillsDropController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string query = @"
                SELECT SkillID, Skill FROM dbo.Skills
                WHERE SkillID NOT IN (SELECT SkillID FROM dbo.PeopleSkills 
                WHERE PersonID='" + id + "')";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("LUCapstoneDB");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }
    }
}
