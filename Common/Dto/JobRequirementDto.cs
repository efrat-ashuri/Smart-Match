using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Common.Dto
{
    public class JobRequirementDto
    {
        public int JobRequirementId { get; set; }
        public int IdJob { get; set; }
        public string JobTitle { get; set; } // כותרת המשרה
        public int IdRequirement { get; set; }
        public string RequirementDescription { get; set; } // תיאור הדרישה
        public string AdvantageOrMust { get; set; } // "advantage" או "must"
    }
}
