using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Repository.DTOs
{
    public class JobSkillDto
    {
        public int JobSkillsId { get; set; }
        public int IdJob { get; set; }
        public string JobTitle { get; set; } // כותרת המשרה
        public int IdSkills { get; set; }
        public string SkillName { get; set; } // שם המיומנות
        public string Name { get; set; }
        public int Mark { get; set; }
    }
}
