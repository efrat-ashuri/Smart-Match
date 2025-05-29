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
    public class SkillsService : IService<SkillsDto>
    {
        private readonly IRepository<Skills> repository;
        private readonly IMapper mapper;

        public SkillsService(IRepository<Skills> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public SkillsDto AddItem(SkillsDto item)
        {
            return mapper.Map<Skills, SkillsDto>(repository.AddItem(mapper.Map<SkillsDto, Skills>(item)));
        }

        public void DeleteItem(int id)
        {
            repository.DeleteItem(id);
        }

        public List<SkillsDto> GetAll()
        {
            return mapper.Map<List<Skills>, List<SkillsDto>>(repository.GetAll());
        }

        public SkillsDto GetById(int id)
        {
            return mapper.Map<Skills, SkillsDto>(repository.GetById(id));
        }

        public void UpdateItem(int id, SkillsDto item)
        {
            Skills skillsEntity = mapper.Map<SkillsDto, Skills>(item);
            repository.UpdateItem(id, skillsEntity);
        }
    }
}
