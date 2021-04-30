using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class TasksSkillsController : ApiController
    {
        public HttpResponseMessage Get(int id)
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
            using (var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["LuCapstoneDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Post(TasksSkills ts)
        {
            try
            {
                string query = @"
                       insert into dbo.TasksSkills values
                       (
                       '" + ts.TaskID + @"'
                       ,'" + ts.SkillID + @"'
                       )
                       ";
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["LuCapstoneDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Added Successfully";
            }
            catch (Exception)
            {
                return "Failed to Add";
            }
        }

        public string Put(TasksSkills ts)
        {
            try
            {
                string query = @"
                       update dbo.TasksSkills set
                       TaskID='" + ts.TaskID + @"'
                       ,SkillID='" + ts.SkillID + @"'
                       where TaskSkillID=" + ts.TaskSkillID + @"
                       ";
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["LuCapstoneDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Updated Successfully";
            }
            catch (Exception)
            {
                return "Failed to Update";
            }
        }

        public string Delete(int id)
        {
            try
            {
                string query = @"
                       delete from dbo.TasksSkills
                       where TaskSkillID=" + id + @"
                       ";
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["LuCapstoneDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Deleted Successfully";
            }
            catch (Exception)
            {
                return "Failed to Delete";
            }
        }
    }
}
