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
    public class PeopleController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public PeopleController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                   select PersonID, Name, convert(varchar(10),Birthday,120) as Birthday
                   from dbo.People";
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
        public JsonResult Post(People p)
        {
            string query = @"
                       insert into dbo.People values
                       (
                       '" + p.Name + @"'
                       ,'" + p.Birthday + @"'
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
        public JsonResult Put(People p)
        {
            string query = @"
                       update dbo.People set
                       Name='" + p.Name + @"'
                       ,Birthday='" + p.Birthday + @"'
                       where PersonID=" + p.PersonID + @"
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
                       delete from dbo.People
                       where PersonID=" + id + @"
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
