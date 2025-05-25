using Repository.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dto
{
    public class RequirementsDto
    {
        public int RequirementId { get; set; }
        public string Description { get; set; }
        public string AdvantageOrMust { get; set; }

    }
}
