using Repository.Entities;
using Repository.Repositories;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Repository.Repositories
{
    public class JobRepository : IRepository<Job>
    {
        private readonly IContext context;
        public JobRepository(IContext context) => this.context = context;

        public Job AddItem(Job item)
        {
            context.Jobs.Add(item);
            context.Save();
            return item;
        }

        public void DeleteItem(int id)
        {
            var job = GetById(id);
            context.Jobs.Remove(job);
            context.Save();
        }



        public List<Job> GetAll() =>
        context.Jobs
            .Include(j => j.ListRequirement)
            .Include(j => j.ListSkills)
            .ToList();


        public Job GetById(int id) =>
         context.Jobs
        .Include(j => j.ListRequirement)
        .Include(j => j.ListSkills)
        .FirstOrDefault(j => j.JobId == id);

        public void UpdateItem(int id, Job item)
        {
            var job = context.Jobs
                .Include(c => c.ListSkills)
                .Include(c => c.ListRequirement)
                .FirstOrDefault(c => c.JobId == id);

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

            context.Save();
        }
    }
}