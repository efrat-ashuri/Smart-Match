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

        public List<Candidate> GetAll() =>
            context.Candidates
                .Include(c => c.ListRequirement)
                .Include(c => c.ListSkills)
                .ToList();

        public Candidate GetById(int id) =>
            context.Candidates
                .Include(c => c.ListRequirement)
                .Include(c => c.ListSkills)
                .FirstOrDefault(c => c.CandidateId == id);

        public void UpdateItem(int id, Candidate item)
        {
            var candidate = GetById(id);
            if (candidate == null) return;

            candidate.Name = item.Name;
            candidate.Phone = item.Phone;
            candidate.Email = item.Email;
            candidate.ExperienceYears = item.ExperienceYears;
            candidate.EnglishLevel = item.EnglishLevel;
            candidate.Area = item.Area;
            candidate.Role = item.Role;
            candidate.ListRequirement = item.ListRequirement;
            candidate.ListSkills = item.ListSkills;
            context.Save();
        }
    }
}
