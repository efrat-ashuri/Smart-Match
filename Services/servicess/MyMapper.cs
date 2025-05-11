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
        public MyMapper()
        {
            CreateMap<Manager,ManagerDto>().ReverseMap();
            CreateMap<Job,JobDto>().ReverseMap();
        }
    }
}
