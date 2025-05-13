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
    //efrat&ahuvi the best
    public class JobService : IService<JobDto>
    {
        private readonly IRepository<Job> repository;
        private readonly IMapper mapper;

        public JobService(IRepository<Job> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }
        public JobDto AddItem(JobDto item)
        {
            Job job = mapper.Map<JobDto, Job>(item);
            job.Manager = null;
            job.ManagerId = item.ManagerId;
            return mapper.Map<Job, JobDto>(repository.AddItem(mapper.Map<JobDto, Job>(item)));
        }

        public void DeleteItem(int id)
        {
            repository.DeleteItem(id);
        }

        public List<JobDto> GetAll()
        {
            return mapper.Map<List<Job>, List<JobDto>>(repository.GetAll());
        }

        public JobDto GetById(int id)
        {
            return mapper.Map<Job, JobDto>(repository.GetById(id));
        }

        public void UpdateItem(int id, JobDto item)
        {
            repository.UpdateItem(id, mapper.Map<JobDto, Job>(item));
        }
    }
}
