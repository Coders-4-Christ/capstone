﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Tasks
    {
        public int TaskID { get; set; }
        public string Task { get; set; }
        public int Priority { get; set; }
        public float EstimatedCost { get; set; }
        public int AssignedToPersonID { get; set; }
    }
}