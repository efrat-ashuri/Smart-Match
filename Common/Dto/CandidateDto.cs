﻿//using Repository.Entities;
//using System;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations;

//namespace Common.Dto
//{
//    public class CandidateDto
//    {
//        public int CandidateId { get; set; }

//        [Required(ErrorMessage = "Name is required")]
//        [MinLength(2, ErrorMessage = "Name must be at least 2 characters")]
//        public string Name { get; set; }

//        [Required(ErrorMessage = "Email is required")]
//        [EmailAddress(ErrorMessage = "Invalid email format")]
//        public string Email { get; set; }

//        [Required(ErrorMessage = "Phone is required")]
//        [Phone(ErrorMessage = "Invalid phone number")]
//        public string Phone { get; set; }

//        [Required(ErrorMessage = "ExperienceYears is required")]
//        [Range(0, 100, ErrorMessage = "Experience must be between 0 and 100 years")]
//        public int ExperienceYears { get; set; }

//        [Required(ErrorMessage = "Role is required")]
//        public string Role { get; set; }

//        [Required(ErrorMessage = "Area is required")]
//        public string Area { get; set; }

//        [Required(ErrorMessage = "English level is required")]
//        [EnumDataType(typeof(eEnglishLevel), ErrorMessage = "Invalid English level")]
//        public eEnglishLevel EnglishLevel { get; set; }

//        public virtual List<RequirementsDto> ListRequirement { get; set; } = new();
//        public virtual List<SkillsDto> ListSkills { get; set; } = new();
//    }
//}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dto
{

    public class CandidateDto
    {
        public int CandidateId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int ExperienceYears { get; set; }
        public string Role { get; set; }
        public string Area { get; set; }
        public string EnglishLevel { get; set; }

        public List<RequirementsDto> ListRequirement { get; set; }
        public List<SkillsDto> ListSkills { get; set; }
    }

}

