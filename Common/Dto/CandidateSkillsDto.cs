using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dto
{
    public class CandidateSkillsDto
    {
        public int CandidateSkillsId { get; set; }
        public int IdSkills { get; set; }
        public string SkillName { get; set; } // שם המיומנות
        public int IdCandidate { get; set; }
        public string CandidateName { get; set; } // שם המועמד
        public string Name { get; set; }
        public int SuccessRate { get; set; }
    }
}

