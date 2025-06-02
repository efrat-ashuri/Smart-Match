using AutoMapper;
using Common.Dto;
using Repository.Entities;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.services
{
    public class UserService:IService<UserDto>
    {
        private readonly IRepository<User> repository;
        private readonly IMapper mapper;
        public UserService(IRepository<User> repository, IMapper mapper)
        {
            this.mapper = mapper;
            this.repository = repository;
        }

        public UserDto AddItem(UserDto item)
        {
            return mapper.Map<User, UserDto>(repository.AddItem(mapper.Map<UserDto, User>(item)));
        }

        public void DeleteItem(int id)
        {
            repository.DeleteItem(id);
        }

        public List<UserDto> GetAll()
        {
            return mapper.Map<List<User>, List<UserDto>>(repository.GetAll());
        }

        public UserDto GetById(int id)
        {
            return mapper.Map<User, UserDto>(repository.GetById(id));
        }

        public void UpdateItem(int id, UserDto item)
        {
            User userEntity = mapper.Map<UserDto, User>(item);
            repository.UpdateItem(id, userEntity);
        }
    }
}
