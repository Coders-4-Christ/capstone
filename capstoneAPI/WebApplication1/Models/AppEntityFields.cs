using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class AppEntityFields
    {
        public int EntityFieldID { get; set; }
        public int EntityID { get; set; }
        public string FieldName { get; set; }
        public int ControlTypeID { get; set; }
        public Boolean IsPK { get; set; }
    }
}