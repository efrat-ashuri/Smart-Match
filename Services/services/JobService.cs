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
    public class JobService : IService<JobDto>
    {
        private readonly IRepository<Job> repository;
        private readonly IMapper mapper;

        public JobService(IRepository<Job> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }
        public async Task<JobDto> AddItem(JobDto item)
        {
            Job job = mapper.Map<JobDto, Job>(item);
            job.Manager = null;
            job.ManagerId = item.ManagerId;
            return mapper.Map<Job, JobDto>( await repository.AddItem(mapper.Map<JobDto, Job>(item)));
        }

        public async Task DeleteItem(int id)
        {
           await repository.DeleteItem(id);
        }

        public async Task< List<JobDto>> GetAll()
        {
            return  mapper.Map<List<Job>, List<JobDto>>(await repository.GetAll());
        }

        public async Task< JobDto> GetById(int id)
        {
            return mapper.Map<Job, JobDto>(await repository.GetById(id));
        }
        public async Task UpdateItem(int id, JobDto item)
        {
            Job jobEntity = mapper.Map<JobDto, Job>(item);
            await repository.UpdateItem(id, jobEntity);
        }
    }
}
