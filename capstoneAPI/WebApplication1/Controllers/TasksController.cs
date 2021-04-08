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
    public class TasksController : ApiController
    {
        public HttpResponseMessage Get()
        {
            string query = @"
                   select TaskID, Task, convert(varchar(10),Priority,120) as Priority, 
                   convert(varchar(10),EstimatedCost,120) as EstimatedCost, AssignedToPersonID
                   from dbo.Tasks
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

        public string Post(Tasks t)
        {
            try
            {
                string query = @"
                       insert into dbo.Tasks values
                       (
                       '" + t.Task + @"'
                       ,'" + t.Priority + @"'
                       ,'" + t.EstimatedCost + @"'
                       ,'" + t.AssignedToPersonID +@"'
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

        public string Put(Tasks t)
        {
            try
            {
                string query = @"
                       update dbo.Tasks set
                       Task='" + t.Task + @"'
                       ,Priority='" + t.Priority + @"'
                       ,EstimatedCost='" + t.EstimatedCost + @"'
                       ,AssignedToPersonID='" + t.AssignedToPersonID + @"'
                       where TaskID=" + t.TaskID + @"
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
                       delete from dbo.Tasks
                       where TaskID=" + id + @"
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
