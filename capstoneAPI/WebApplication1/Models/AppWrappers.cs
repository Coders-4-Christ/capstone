using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class AppWrappers
    {
        public int WrapperID { get; set; }
        public string Name { get; set; }
        public int EntityID { get; set; }
        public int SelectionListID { get; set; }
        public int DetailID { get; set; }
    }
}