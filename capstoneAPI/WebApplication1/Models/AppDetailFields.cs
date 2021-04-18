using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class AppDetailFields
    {
        public int DetailFieldID { get; set; }
        public int DetailID { get; set; }
        public int ControlOrder { get; set; }
        public int EntityFieldID { get; set; }
        public int ControlTypeID { get; set; }
    }
}