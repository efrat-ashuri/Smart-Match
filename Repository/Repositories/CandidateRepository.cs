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

        public Candidate AddItem(Candidate item)
        {
            context.Candidates.Add(item);
            context.Save();
            return item;
        }

        public void DeleteItem(int id)
        {
            var candidate = GetById(id);
            context.Candidates.Remove(candidate);
            context.Save();
        }

        public List<Candidate> GetAll()
        {
            Console.WriteLine("fekgdwihjlksqf");
            return context.Candidates
                    .Include(c => c.ListRequirement)
                    .Include(c => c.ListSkills)
                    .ToList();
        }
        public Candidate GetById(int id) =>
            context.Candidates
                .Include(c => c.ListRequirement)
                .Include(c => c.ListSkills)
                .FirstOrDefault(c => c.CandidateId == id);

     
        public void UpdateItem(int id, Candidate item)
        {
            var candidate = context.Candidates
                .Include(c => c.ListSkills)
                .Include(c => c.ListRequirement)
                .FirstOrDefault(c => c.CandidateId == id);

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

            context.Save();
        }

    }
}
