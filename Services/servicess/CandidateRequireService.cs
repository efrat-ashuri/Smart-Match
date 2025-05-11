using AutoMapper;
using Common.Dto.Repository.Dto;
using Repository.Entities;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.servicess
{
    public class CandidateRequireService : IService<CandidateRequirementDto>
    {
        private readonly IRepository<CandidateRequirement> repository;
        private readonly IMapper mapper;

        public CandidateRequireService(IRepository<CandidateRequirement> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }
        public CandidateRequirementDto AddItem(CandidateRequirementDto item)
        {
            return mapper.Map<CandidateRequirement, CandidateRequirementDto>(repository.AddItem(mapper.Map<CandidateRequirementDto, CandidateRequirement>(item)));
        }

        public void DeleteItem(int id)
        {
            repository.DeleteItem(id);
        }

        public List<CandidateRequirementDto> GetAll()
        {
            return mapper.Map<List<CandidateRequirement>, List<CandidateRequirementDto>>(repository.GetAll());
        }

        public CandidateRequirementDto GetById(int id)
        {
            return mapper.Map<CandidateRequirement, CandidateRequirementDto>(repository.GetById(id));
        }

        public void UpdateItem(int id, CandidateRequirementDto item)
        {
            repository.UpdateItem(id, mapper.Map<CandidateRequirementDto, CandidateRequirement>(item));
        }
    }
}
