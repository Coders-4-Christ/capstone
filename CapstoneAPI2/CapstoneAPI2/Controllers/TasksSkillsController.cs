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
    public class TasksSkillsController : Controller
    {
        private readonly IConfiguration _configuration;

        public TasksSkillsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string query = @"
				SELECT
	                Tasks.Task
	            FROM TasksSkills 
				JOIN Tasks ON Tasks.TaskID=TasksSkills.TaskID
				JOIN PeopleSkills ON PeopleSkills.SkillID=TasksSkills.SkillID
				WHERE PeopleSkills.PersonID='" + id + @"'
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
        public JsonResult Post(TasksSkills ts)
        {
            string query = @"
                       insert into dbo.TasksSkills values
                       (
                       '" + ts.TaskID + @"'
                       ,'" + ts.SkillID + @"'
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
        public JsonResult Put(TasksSkills ts)
        {
            string query = @"
                       update dbo.TasksSkills set
                       TaskID='" + ts.TaskID + @"'
                       ,SkillID='" + ts.SkillID + @"'
                       where TaskSkillID=" + ts.TaskSkillID + @"
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
                       delete from dbo.TasksSkills
                       where TaskSkillID=" + id + @"
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
