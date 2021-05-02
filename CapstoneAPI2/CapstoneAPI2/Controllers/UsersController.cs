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
    public class UsersController : Controller
    {
        private readonly IConfiguration _configuration;

        public UsersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                   select UserID, FirstName, LastName, UserName, Passphrase 
                   from dbo.Users
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
        public JsonResult Post(Users u)
        {
            string query = @"
                       insert into dbo.Users values
                       (
                       '" + u.FirstName + @"'
                       ,'" + u.LastName + @"'
                       ,'" + u.UserName + @"'
                       ,'" + u.Passphrase + @"'
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
        public JsonResult Put(Users u)
        {
            string query = @"
                       update dbo.Users set
                       FirstName='" + u.FirstName + @"'
                       ,LastName='" + u.LastName + @"'
                       ,UserName='" + u.UserName + @"'
                       ,Passphrase='" + u.Passphrase + @"'
                       where TaskID=" + u.UserID + @"
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
                       delete from dbo.Users
                       where UserID=" + id + @"
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
