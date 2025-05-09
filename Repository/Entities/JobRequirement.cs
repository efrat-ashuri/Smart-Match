using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class JobRequirement
    {
        [Key]
        public int JobRequirementId { get; set; }

        [ForeignKey("Job")]
        public int IdJob { get; set; }
        public Job Job { get; set; }

        [ForeignKey("Requirement")]
        public int IdRequirement { get; set; }
        public Requirements Requirement { get; set; }

        public string AdvantageOrMust { get; set; } // "advantage" או "must"
    }
}
