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
    public class AppControlTypesController : ApiController
    {
        public HttpResponseMessage Get()
        {
            string query = @"
                   select ControlTypeID, Name
                   from dbo.AppControlTypes
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

        public string Post(AppControlTypes act)
        {
            try
            {
                string query = @"
                       insert into dbo.AppControlTypes values
                       (
                       '" + act.ControlTypeID + @"'
                       ,'" + act.Name + @"'
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

        public string Put(AppControlTypes act)
        {
            try
            {
                string query = @"
                       update dbo.AppControlTypes set
                       Name='" + act.Name + @"'
                       where ControlTypeID=" + act.ControlTypeID + @"
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
                       delete from dbo.AppControlTypes
                       where ControlTypeID=" + id + @"
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
