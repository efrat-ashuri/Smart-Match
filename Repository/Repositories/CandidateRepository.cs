using Repository.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Repository.Repositories
{
    public class CandidateRepository : IRepository<Candidate>
    {
        private readonly IContext context;
        public CandidateRepository(IContext context) => this.context = context;

        public async Task<Candidate> AddItem(Candidate item)
        {
            await this.context.Candidates.AddAsync(item);
            await this.context.Save();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            var candidate = GetById(id);
            this.context.Candidates.Remove(await candidate);
            await this.context.Save();
        }

        public async Task<List<Candidate>> GetAll()
        {
            return await context.Candidates
                    .Include(c => c.ListRequirement)
                    .Include(c => c.ListSkills)
                    .ToListAsync();
        }
        public async Task<Candidate> GetById(int id) =>
           await context.Candidates
                .Include(c => c.ListRequirement)
                .Include(c => c.ListSkills)
                .FirstOrDefaultAsync(c => c.CandidateId == id);


        public async Task UpdateItem(int id, Candidate item)
        {
            var candidate = await context.Candidates
                .Include(c => c.ListSkills)
                .Include(c => c.ListRequirement)
                .FirstOrDefaultAsync(c => c.CandidateId == id);

            if (candidate == null)
                return;

            // עדכון שדות פשוטים
            candidate.Name = item.Name;
            candidate.Phone = item.Phone;
            candidate.Email = item.Email;
            candidate.ExperienceYears = item.ExperienceYears;
            candidate.EnglishLevel = item.EnglishLevel;
            candidate.Area = item.Area;
            candidate.Role = item.Role;

            // עדכון Skills
            foreach (var skillDto in item.ListSkills)
            {
                var skill = candidate.ListSkills.FirstOrDefault(s => s.SkillsId == skillDto.SkillsId);
                if (skill != null)
                {
                    skill.Name = skillDto.Name;
                    skill.Mark = skillDto.Mark;
                }
            }

            // עדכון Requirements
            foreach (var reqDto in item.ListRequirement)
            {
                var req = candidate.ListRequirement.FirstOrDefault(r => r.RequirementId == reqDto.RequirementId);
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
