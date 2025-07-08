//using Repository.Entities;
//using Microsoft.EntityFrameworkCore;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace Repository.Repositories
//{
//    public class CandidateRepository : IRepository<Candidate>
//    {
//        private readonly IContext context;
//        public CandidateRepository(IContext context) => this.context = context;

//        public async Task<Candidate> AddItem(Candidate item)
//        {
//            // שליפת דרישות קיימות מה-DB לפי ID
//            var validRequirements = new List<Requirements>();
//            foreach (var req in item.ListRequirement)
//            {
//                var existingReq = await context.Requirements.FindAsync(req.RequirementId);
//                if (existingReq != null)
//                    validRequirements.Add(existingReq);
//            }
//            item.ListRequirement = validRequirements;

//            // שליפת כישורים קיימים מה-DB לפי ID
//            var validSkills = new List<Skills>();
//            foreach (var skill in item.ListSkills)
//            {
//                var existingSkill = await context.Skills.FindAsync(skill.SkillsId);
//                if (existingSkill != null)
//                {
//                    // נעתיק את הציון בלבד (mark) מהמועמד
//                    validSkills.Add(new Skills
//                    {
//                        SkillsId = existingSkill.SkillsId,
//                        Name = existingSkill.Name,
//                        Mark = skill.Mark
//                    });
//                }
//            }
//            item.ListSkills = validSkills;

//            // שמירת המועמד
//            await this.context.Candidates.AddAsync(item);
//            await this.context.Save();
//            return item;
//        }

//        //public async Task<Candidate> AddItem(Candidate item)
//        //{
//        //    // שליפת דרישות קיימות או יצירת חדשות
//        //    var validRequirements = new List<Requirements>();
//        //    foreach (var req in item.ListRequirement)
//        //    {
//        //        if (req.RequirementId == 0)
//        //        {
//        //            var newReq = new Requirements
//        //            {
//        //                Description = req.Description,
//        //                AdvantageOrMust = req.AdvantageOrMust
//        //            };
//        //            context.Requirements.Add(newReq);
//        //            validRequirements.Add(newReq);
//        //        }
//        //        else
//        //        {
//        //            var existingReq = await context.Requirements.FindAsync(req.RequirementId);
//        //            if (existingReq != null)
//        //                validRequirements.Add(existingReq);
//        //        }
//        //    }

//        //    // שליפת כישורים קיימים או יצירת חדשים
//        //    var validSkills = new List<Skills>();
//        //    foreach (var skill in item.ListSkills)
//        //    {
//        //        if (skill.SkillsId == 0)
//        //        {
//        //            var newSkill = new Skills
//        //            {
//        //                Name = skill.Name,
//        //                Mark = skill.Mark
//        //            };
//        //            context.Skills.Add(newSkill);
//        //            validSkills.Add(newSkill);
//        //        }
//        //        else
//        //        {
//        //            var existingSkill = await context.Skills.FindAsync(skill.SkillsId);
//        //            if (existingSkill != null)
//        //                validSkills.Add(existingSkill);
//        //        }
//        //    }

//        //    // שמירת דרישות וכישורים חדשים קודם
//        //    await context.Save();

//        //    // עדכון המועמד עם הדרישות והכישורים החדשים
//        //    item.ListRequirement = validRequirements;
//        //    item.ListSkills = validSkills;

//        //    // שמירת המועמד
//        //    await this.context.Candidates.AddAsync(item);
//        //    await this.context.Save();

//        //    return item;
//        //}

//        //public async Task<Candidate> AddItem(Candidate item)
//        //{
//        //    // שליפת דרישות קיימות מה-DB לפי ID
//        //    var validRequirements = new List<Requirements>();
//        //    foreach (var req in item.ListRequirement)
//        //    {
//        //        var existingReq = await context.Requirements.FindAsync(req.RequirementId);
//        //        if (existingReq != null)
//        //            validRequirements.Add(existingReq);
//        //    }
//        //    item.ListRequirement = validRequirements;

//        //    // שליפת כישורים קיימים מה-DB לפי ID
//        //    var validSkills = new List<Skills>();
//        //    foreach (var skill in item.ListSkills)
//        //    {
//        //        var existingSkill = await context.Skills.FindAsync(skill.SkillsId);
//        //        if (existingSkill != null)
//        //            validSkills.Add(existingSkill);
//        //    }
//        //    item.ListSkills = validSkills;

//        //    await this.context.Candidates.AddAsync(item);
//        //    await this.context.Save();
//        //    return item;
//        //}

//        public async Task DeleteItem(int id)
//        {
//            var candidate = GetById(id);
//            this.context.Candidates.Remove(await candidate);
//            await this.context.Save();
//        }

//        public async Task<List<Candidate>> GetAll()
//        {
//            return await context.Candidates
//                    .Include(c => c.ListRequirement)
//                    .Include(c => c.ListSkills)
//                    .ToListAsync();
//        }

//        public async Task<Candidate> GetById(int id) =>
//           await context.Candidates
//                .Include(c => c.ListRequirement)
//                .Include(c => c.ListSkills)
//                .FirstOrDefaultAsync(c => c.CandidateId == id);

//        public async Task UpdateItem(int id, Candidate item)
//        {
//            var candidate = await context.Candidates
//                .Include(c => c.ListSkills)
//                .Include(c => c.ListRequirement)
//                .FirstOrDefaultAsync(c => c.CandidateId == id);

//            if (candidate == null)
//                return;

//            // עדכון שדות פשוטים
//            candidate.Name = item.Name;
//            candidate.Phone = item.Phone;
//            candidate.Email = item.Email;
//            candidate.ExperienceYears = item.ExperienceYears;
//            candidate.EnglishLevel = item.EnglishLevel;
//            candidate.Area = item.Area;
//            candidate.Role = item.Role;

//            // עדכון Skills (רק עדכון mark ושם אם רוצים, לא יצירה)
//            foreach (var skillDto in item.ListSkills)
//            {
//                var skill = candidate.ListSkills.FirstOrDefault(s => s.SkillsId == skillDto.SkillsId);
//                if (skill != null)
//                {
//                    skill.Name = skillDto.Name;
//                    skill.Mark = skillDto.Mark;
//                }
//            }

//            // עדכון Requirements (תיאור וסטטוס אם צריך)
//            foreach (var reqDto in item.ListRequirement)
//            {
//                var req = candidate.ListRequirement.FirstOrDefault(r => r.RequirementId == reqDto.RequirementId);
//                if (req != null)
//                {
//                    req.Description = reqDto.Description;
//                    req.AdvantageOrMust = reqDto.AdvantageOrMust;
//                }
//            }

//            await context.Save();
//        }
//    }
//}


using Repository.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class CandidateRepository : IRepository<Candidate>
    {
        private readonly IContext context;
        public CandidateRepository(IContext context) => this.context = context;

        public async Task<Candidate> AddItem(Candidate item)
        {
            // שליפת דרישות קיימות מה-DB לפי ID
            var validRequirements = new List<Requirements>();
            foreach (var req in item.ListRequirement)
            {
                var existingReq = await context.Requirements.FindAsync(req.RequirementId);
                if (existingReq != null)
                    validRequirements.Add(existingReq);
            }
            item.ListRequirement = validRequirements;

            // שליפת כישורים קיימים מה-DB לפי ID
            var validSkills = new List<Skills>();
            foreach (var skill in item.ListSkills)
            {
                var existingSkill = await context.Skills.FindAsync(skill.SkillsId);
                if (existingSkill != null)
                    validSkills.Add(existingSkill);
            }
            item.ListSkills = validSkills;

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

            // עדכון Skills (רק עדכון mark ושם אם רוצים, לא יצירה)
            foreach (var skillDto in item.ListSkills)
            {
                var skill = candidate.ListSkills.FirstOrDefault(s => s.SkillsId == skillDto.SkillsId);
                if (skill != null)
                {
                    skill.Name = skillDto.Name;
                    skill.Mark = skillDto.Mark;
                }
            }

            // עדכון Requirements (תיאור וסטטוס אם צריך)
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