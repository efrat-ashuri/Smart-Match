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

        public  async Task< RequirementsDto> AddItem(RequirementsDto item)
        {
            return mapper.Map<Requirements, RequirementsDto>(await repository.AddItem(mapper.Map<RequirementsDto, Requirements>(item)));
            throw new NotImplementedException();
        }

        public async Task DeleteItem(int id)
        {
           await repository.DeleteItem(id);
        }

        public async Task <List<RequirementsDto>> GetAll()
        {
            return mapper.Map<List<Requirements>, List<RequirementsDto>>(await repository.GetAll());
        }

        public async Task< RequirementsDto> GetById(int id)
        {
            return mapper.Map<Requirements, RequirementsDto>(await repository.GetById(id));
        }


        public async Task UpdateItem(int id, RequirementsDto item)
        {
            Requirements requirementEntity = mapper.Map<RequirementsDto, Requirements>(item);
            await repository.UpdateItem(id, requirementEntity);
        }
    }
}
