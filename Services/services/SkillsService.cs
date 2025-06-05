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

        public async Task<SkillsDto> AddItem(SkillsDto item)
        {
            return mapper.Map<Skills, SkillsDto>(await repository.AddItem(mapper.Map<SkillsDto, Skills>(item)));
        }

        public async Task DeleteItem(int id)
        {
            await repository.DeleteItem(id);
        }

        public async Task<List<SkillsDto>> GetAll()
        {
            return mapper.Map<List<Skills>, List<SkillsDto>>(await repository.GetAll());
        }

        public async Task<SkillsDto> GetById(int id)
        {
            return mapper.Map<Skills, SkillsDto>(await repository.GetById(id));
        }

        public async Task UpdateItem(int id, SkillsDto item)
        {
            Skills skillsEntity = mapper.Map<SkillsDto, Skills>(item);
            await repository.UpdateItem(id, skillsEntity);
        }
    }
}
