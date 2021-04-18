using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class AppSelectionListFields
    {
        public int SelectionListFieldID { get; set; }
        public int SelectionListID { get; set; }
        public int ControlOrder { get; set; }
        public int EntityFieldID { get; set; }
    }
}