using Repository.Entities;
using Repository.Repositories;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;

namespace Repository.Repositories
{
    public class JobRepository : IRepository<Job>
    {
        private readonly IContext context;
        public JobRepository(IContext context) => this.context = context;

        public async Task< Job> AddItem(Job item)
        {
           await context.Jobs.AddAsync(item);
           await context.Save();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            var job = GetById(id);
            context.Jobs.Remove(await job);
            await context.Save();
        }

        public async Task<List<Job>> GetAll()
        {
            return await context.Jobs
                    .Include(c => c.ListRequirement)
                    .Include(c => c.ListSkills)
                    .ToListAsync();
        }


        public async Task< Job> GetById(int id) =>
          await  context.Jobs
        .Include(j => j.ListRequirement)
        .Include(j => j.ListSkills)
        .FirstOrDefaultAsync(j => j.JobId == id);

        public async Task UpdateItem(int id, Job item)
        {
            var job =await context.Jobs
                .Include(c => c.ListSkills)
                .Include(c => c.ListRequirement)
                .FirstOrDefaultAsync(c => c.JobId == id);

            if (job == null)
                return;

            // עדכון שדות פשוטים
            job.Title = item.Title;
            job.Description = item.Description;
            job.Area = item.Area;
            job.EnglishLevel = item.EnglishLevel;
            job.ManagerId = item.ManagerId;
            job.PassingScore = item.PassingScore;
            job.NumCandidate = item.NumCandidate;
            job.ExperienceYears = item.ExperienceYears;


            // עדכון Skills
            foreach (var skillDto in item.ListSkills)
            {
                var skill = job.ListSkills.FirstOrDefault(s => s.SkillsId == skillDto.SkillsId);
                if (skill != null)
                {
                    skill.Name = skillDto.Name;
                    skill.Mark = skillDto.Mark;
                }
            }

            // עדכון Requirements
            foreach (var reqDto in item.ListRequirement)
            {
                var req = job.ListRequirement.FirstOrDefault(r => r.RequirementId == reqDto.RequirementId);
                if (req != null)
                {
                    req.Description = reqDto.Description;
                    req.AdvantageOrMust = reqDto.AdvantageOrMust;
                }
            }

           await context.Save();
        }
    }
}