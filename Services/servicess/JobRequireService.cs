using AutoMapper;
using Common.Dto;
using Repository.Entities;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.servicess
{
    public class JobRequireService:IService<JobRequirementDto>
    {
        private readonly IRepository<JobRequirement> repository;
        private readonly IMapper mapper;

        public JobRequireService(IRepository<JobRequirement> repository, IMapper mapper) 
        {    
            this.repository = repository;
            this.mapper = mapper;
        }

        public JobRequirementDto AddItem(JobRequirementDto item)
        {          
            return mapper.Map<JobRequirement, JobRequirementDto>(repository.AddItem(mapper.Map<JobRequirementDto, JobRequirement>(item)));
        }

        public void DeleteItem(int id)
        {
            repository.DeleteItem(id);
        }

        public List<JobRequirementDto> GetAll()
        {
            return mapper.Map<List<JobRequirement>, List<JobRequirementDto>>(repository.GetAll());
        }

        public JobRequirementDto GetById(int id)
        {    
            return mapper.Map<JobRequirement, JobRequirementDto>(repository.GetById(id));
        }

        public void UpdateItem(int id, JobRequirementDto item)
        {
            repository.UpdateItem(id, mapper.Map<JobRequirementDto, JobRequirement>(item));
        }
    }
}
