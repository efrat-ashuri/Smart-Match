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
    internal class CandidateSkillsService : IService<CandidateSkillsDto>
    {
        private readonly IRepository<CandidateSkills> repository;

        private readonly IMapper mapper;

        public CandidateSkillsDto AddItem(CandidateSkillsDto item)
        {
            return mapper.Map<CandidateSkills, CandidateSkillsDto>(repository.AddItem(mapper.Map<CandidateSkillsDto, CandidateSkills>(item)));
        }

        public void DeleteItem(int id)
        {
            repository.DeleteItem(id);
        }

        public List<CandidateSkillsDto> GetAll()
        {
            return mapper.Map<List<CandidateSkills>, List<CandidateSkillsDto>>(repository.GetAll());
        }

        public CandidateSkillsDto GetById(int id)
        {
            return mapper.Map<CandidateSkills, CandidateSkillsDto>(repository.GetById(id));
        }

        public void UpdateItem(int id, CandidateSkillsDto item)
        {
            repository.UpdateItem(id, mapper.Map<CandidateSkillsDto, CandidateSkills>(item));
        }
    }
}
