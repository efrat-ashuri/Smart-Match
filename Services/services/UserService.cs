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
    public class UserService : IService<UserDto>
    {
        private readonly IRepository<User> repository;
        private readonly IMapper mapper;
        public UserService(IRepository<User> repository, IMapper mapper)
        {
            this.mapper = mapper;
            this.repository = repository;
        }

        public async Task<UserDto> AddItem(UserDto item)
        {
            return mapper.Map<User, UserDto>(await repository.AddItem(mapper.Map<UserDto, User>(item)));
        }

        public async Task DeleteItem(int id)
        {
            await repository.DeleteItem(id);
        }

        public async Task<List<UserDto>> GetAll()
        {
            return mapper.Map<List<User>, List<UserDto>>(await repository.GetAll());
        }

        public async Task<UserDto> GetById(int id)
        {
            return mapper.Map<User, UserDto>(await repository.GetById(id));
        }

        public async Task UpdateItem(int id, UserDto item)
        {
            User userEntity = mapper.Map<UserDto, User>(item);
            await repository.UpdateItem(id, userEntity);
        }
    }
}
