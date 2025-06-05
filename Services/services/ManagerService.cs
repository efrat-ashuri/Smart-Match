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
    public class ManagerService : IService<ManagerDto>
    {
        private readonly IRepository<Manager> repository;
        private readonly IMapper mapper;

        public ManagerService(IRepository<Manager> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task<ManagerDto> AddItem(ManagerDto item)
        {
            return mapper.Map<Manager, ManagerDto>(await repository.AddItem(mapper.Map<ManagerDto, Manager>(item)));
        }

        public async Task DeleteItem(int id)
        {
            await repository.DeleteItem(id);
        }

        public async Task<List<ManagerDto>> GetAll()
        {
            return mapper.Map<List<Manager>, List<ManagerDto>>(await repository.GetAll());
        }

        public async Task <ManagerDto> GetById(int id)
        {
            return mapper.Map<Manager, ManagerDto>(await repository.GetById(id));
        }

        public async Task UpdateItem(int id, ManagerDto item)
        {
            Manager managerEntity = mapper.Map<ManagerDto, Manager>(item);
           await repository.UpdateItem(id, managerEntity);
        }
    }
}
