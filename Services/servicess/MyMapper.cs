using AutoMapper;
using Common.Dto;
using Common.Dto.Repository.Dto;
using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.servicess
{

    // This is a class that defines the mapping configuration for AutoMapper.
    //מחלקה המטפלת בהמרות ואומרת ממי למי להמיר

    public class MyMapper:Profile
    {
        //מחלקה שמטפלת בהמרות
        ///ולא שומרים ב database את הכתבת url אלא את שם התמונה מקובץ התמונה
      
        public MyMapper()
        {
            CreateMap<Manager,ManagerDto>().ReverseMap();
            CreateMap<Job,JobDto>().ReverseMap();
            CreateMap<Candidate, CandidateDto>().ReverseMap();
            CreateMap<Skills, SkillsDto>().ReverseMap();
            CreateMap<JobRequirement, JobRequirementDto>().ReverseMap();
            CreateMap<JobSkill, JobSkillDto>().ReverseMap();
            CreateMap<CandidateRequirement, CandidateRequirementDto>().ReverseMap();
            CreateMap<CandidateSkills, CandidateSkillsDto>().ReverseMap();
            CreateMap<Requirements, RequirementsDto>().ReverseMap();
        }
    }
}
