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

        public ManagerDto AddItem(ManagerDto item)
        {
            return mapper.Map<Manager, ManagerDto>(repository.AddItem(mapper.Map<ManagerDto, Manager>(item)));
        }

        public void DeleteItem(int id)
        {
            repository.DeleteItem(id);
        }

        public List<ManagerDto> GetAll()
        {
            return mapper.Map<List<Manager>, List<ManagerDto>>(repository.GetAll());
        }

        public ManagerDto GetById(int id)
        {
            return mapper.Map<Manager, ManagerDto>(repository.GetById(id));
        }

        public void UpdateItem(int id, ManagerDto item)
        {
            Manager managerEntity = mapper.Map<ManagerDto, Manager>(item);
            repository.UpdateItem(id, managerEntity);
        }
    }
}
