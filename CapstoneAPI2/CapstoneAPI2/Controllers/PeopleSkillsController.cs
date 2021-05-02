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
    public class PeopleSkillsController : Controller
    {
        private readonly IConfiguration _configuration;

        public PeopleSkillsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string query = @"
                SELECT
                    PeopleSkills.PersonSkillID,
                    PeopleSkills.PersonID,
	                Skills.Skill
	            FROM PeopleSkills 
                JOIN People ON People.PersonID=PeopleSkills.PersonID 
                JOIN Skills ON Skills.SkillID=PeopleSkills.SkillID
                WHERE People.PersonID='" + id + @"'
                   ";
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


        [HttpPost]
        public JsonResult Post(PeopleSkills ps)
        {
            string query = @"
                       insert into dbo.PeopleSkills values
                       (
						'" + ps.PersonID + @"'
						,'" + ps.SkillID+ @"'
                       )
                        ";
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

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(PeopleSkills ps)
        {
            string query = @"
                       update dbo.PeopleSkills set
                       PersonID='" + ps.PersonID + @"'
                       ,SkillID='" + ps.SkillID + @"'
                       where PersonSkillID=" + ps.PersonSkillID + @"
                       ";
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

            return new JsonResult("Updated Successfully");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                       delete from dbo.PeopleSkills
                        where PersonSkillID =" + id + @"
                       ";
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

            return new JsonResult("Deleted Successfully");
        }
    }
}
