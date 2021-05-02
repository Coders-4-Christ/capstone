using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CapstoneAPI2.Models
{
    public class TasksSkills
    {
        public int TaskSkillID { get; set; }
        public int TaskID { get; set; }
        public int SkillID { get; set; }

        public string Task { get; set; }

        public int PersonID { get; set; }
    }
}
