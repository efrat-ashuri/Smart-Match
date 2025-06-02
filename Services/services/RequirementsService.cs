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
    public class RequirementsService : IService<RequirementsDto>
    {
        private readonly IRepository<Requirements> repository;
        private readonly IMapper mapper;

        public RequirementsService(IRepository<Requirements> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public RequirementsDto AddItem(RequirementsDto item)
        {
            return mapper.Map<Requirements, RequirementsDto>(repository.AddItem(mapper.Map<RequirementsDto, Requirements>(item)));
            throw new NotImplementedException();
        }

        public void DeleteItem(int id)
        {
            repository.DeleteItem(id);
        }

        public List<RequirementsDto> GetAll()
        {
            return mapper.Map<List<Requirements>, List<RequirementsDto>>(repository.GetAll());
        }

        public RequirementsDto GetById(int id)
        {
            return mapper.Map<Requirements, RequirementsDto>(repository.GetById(id));
        }


        public void UpdateItem(int id, RequirementsDto item)
        {
            Requirements requirementEntity = mapper.Map<RequirementsDto, Requirements>(item);
            repository.UpdateItem(id, requirementEntity);
        }
    }
}
