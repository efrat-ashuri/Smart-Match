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
    public class JobSkillService : IService<JobSkillDto>
    {
        private readonly IRepository<JobSkill> repository;
        private readonly IMapper mapper;

        public JobSkillService(IRepository<JobSkill> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public JobSkillDto AddItem(JobSkillDto item)
        {
            return mapper.Map<JobSkill, JobSkillDto>(repository.AddItem(mapper.Map<JobSkillDto, JobSkill>(item)));
        }

        public void DeleteItem(int id)
        {
            
            repository.DeleteItem(id);
        }

        public List<JobSkillDto> GetAll()
        {
            return mapper.Map<List<JobSkill>, List<JobSkillDto>>(repository.GetAll());
        }

        public JobSkillDto GetById(int id)
        {
            return mapper.Map<JobSkill, JobSkillDto>(repository.GetById(id));
        }

        public void UpdateItem(int id, JobSkillDto item)
        {   
            repository.UpdateItem(id, mapper.Map<JobSkillDto, JobSkill>(item));
        }
    }
}
