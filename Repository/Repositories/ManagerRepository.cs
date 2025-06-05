using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Repositories;

public class ManagerRepository : IRepository<Manager>
{
    private readonly IContext context;
    public ManagerRepository(IContext context) => this.context = context;

    public async Task<Manager> AddItem(Manager item)
    {
        await context.Managers.AddAsync(item);
        await context.Save();
        return item;
    }

    public async Task DeleteItem(int id)
    {
        var manager = GetById(id);
        context.Managers.Remove(await manager);
        await context.Save();
    }

    public async Task<List<Manager>> GetAll() =>
     await context.Managers
        .Include(m => m.Jobs)
            .ThenInclude(j => j.ListSkills)
        .Include(m => m.Jobs)
            .ThenInclude(j => j.ListRequirement)
        .ToListAsync();


    public async Task<Manager> GetById(int id) =>
       await context.Managers
      .Include(m => m.Jobs)
            .ThenInclude(j => j.ListSkills)
        .Include(m => m.Jobs)
            .ThenInclude(j => j.ListRequirement).FirstOrDefaultAsync(m => m.ManagerId == id);



    public async Task UpdateItem(int id, Manager item)
    {
        var manager =await context.Managers
            .Include(m => m.Jobs)
                .ThenInclude(j => j.ListSkills)
            .Include(m => m.Jobs)
                .ThenInclude(j => j.ListRequirement)
            .FirstOrDefaultAsync(m => m.ManagerId == id);

        if (manager == null)
            return;

        // עדכון שדות בסיסיים
        manager.Name = item.Name;
        manager.Email = item.Email;
        manager.Password = item.Password;

        foreach (var incomingJob in item.Jobs)
        {
            var existingJob = manager.Jobs.FirstOrDefault(j => j.JobId == incomingJob.JobId);

            if (existingJob != null)
            {
                // עדכון שדות של העבודה הקיימת
                existingJob.Title = incomingJob.Title;
                existingJob.Description = incomingJob.Description;
                existingJob.Area = incomingJob.Area;
                existingJob.EnglishLevel = incomingJob.EnglishLevel;
                existingJob.PassingScore = incomingJob.PassingScore;
                existingJob.NumCandidate = incomingJob.NumCandidate;

                // עדכון Skills
                foreach (var skillDto in incomingJob.ListSkills)
                {
                    var skill = existingJob.ListSkills.FirstOrDefault(s => s.SkillsId == skillDto.SkillsId);
                    if (skill != null)
                    {
                        skill.Name = skillDto.Name;
                        skill.Mark = skillDto.Mark;
                    }
                    else
                    {
                        // במידה והכישרון חדש, אפשר להוסיף
                        existingJob.ListSkills.Add(skillDto);
                    }
                }

                // עדכון Requirements
                foreach (var reqDto in incomingJob.ListRequirement)
                {
                    var req = existingJob.ListRequirement.FirstOrDefault(r => r.RequirementId == reqDto.RequirementId);
                    if (req != null)
                    {
                        req.Description = reqDto.Description;
                        req.AdvantageOrMust = reqDto.AdvantageOrMust;
                    }
                    else
                    {
                        // במידה ודרישה חדשה, מוסיפים
                        existingJob.ListRequirement.Add(reqDto);
                    }
                }
            }
            else
            {
                // הוספת עבודה חדשה
                var newJob = new Job
                {
                    Title = incomingJob.Title,
                    Description = incomingJob.Description,
                    Area = incomingJob.Area,
                    EnglishLevel = incomingJob.EnglishLevel,
                    PassingScore = incomingJob.PassingScore,
                    NumCandidate = incomingJob.NumCandidate,
                    ListSkills = new List<Skills>(incomingJob.ListSkills),
                    ListRequirement = new List<Requirements>(incomingJob.ListRequirement)
                };

                manager.Jobs.Add(newJob);
            }
        }

       await context.Save();
    }

}