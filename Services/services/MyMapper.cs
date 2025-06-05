using AutoMapper;
using Common.Dto;

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
            // CreateMap<Candidate, CandidateDto>().ReverseMap();

            CreateMap<Candidate, CandidateDto>()
    .ForMember(dest => dest.ListRequirement, opt => opt.MapFrom(src => src.ListRequirement))
    .ForMember(dest => dest.ListSkills, opt => opt.MapFrom(src => src.ListSkills))
    .ReverseMap();

            CreateMap<Skills, SkillsDto>().ReverseMap();
            CreateMap<Requirements, RequirementsDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
        }
    }
}
