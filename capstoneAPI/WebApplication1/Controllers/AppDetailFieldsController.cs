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
    public class AppDetailFieldsController : ApiController
    {
        public HttpResponseMessage Get()
        {
            string query = @"
                   select DetailFieldID, DetailID, ControlOrder, EntityFieldID, ControlTypeID
                   from dbo.AppDetailFields
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

        public string Post(AppDetailFields adf)
        {
            try
            {
                string query = @"
                       insert into dbo.AppDetailFields values
                       (
                       '" + adf.DetailFieldID + @"'
                       ,'" + adf.DetailID + @"'
                       ,'" + adf.ControlOrder + @"'
                       ,'" + adf.EntityFieldID + @"'
                       ,'" + adf.ControlTypeID + @"'
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

        public string Put(AppDetailFields adf)
        {
            try
            {
                string query = @"
                       update dbo.AppControlTypes set
                       DetailID='" + adf.DetailID + @"'
                      ,ControlOrder='" + adf.ControlOrder + @"'
                      ,EntityFieldID='" + adf.EntityFieldID + @"'
                      ,ControlTypeID='" + adf.ControlTypeID + @"'
                       where DetailFieldID=" + adf.DetailFieldID + @"
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
                       delete from dbo.AppDetailFields
                       where DetailFieldID=" + id + @"
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
