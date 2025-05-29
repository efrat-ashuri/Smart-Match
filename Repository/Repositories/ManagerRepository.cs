using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Repositories;

public class ManagerRepository : IRepository<Manager>
{
    private readonly IContext context;
    public ManagerRepository(IContext context) => this.context = context;

    public Manager AddItem(Manager item)
    {
        context.Managers.Add(item);
        context.Save();
        return item;
    }

    public void DeleteItem(int id)
    {
        var manager = GetById(id);
        context.Managers.Remove(manager);
        context.Save();
    }

    public List<Manager> GetAll() =>
      context.Managers
        .Include(m => m.Jobs)
            .ThenInclude(j => j.ListSkills)
        .Include(m => m.Jobs)
            .ThenInclude(j => j.ListRequirement)
        .ToList();


    public Manager GetById(int id) =>
        context.Managers
      .Include(m => m.Jobs)
            .ThenInclude(j => j.ListSkills)
        .Include(m => m.Jobs)
            .ThenInclude(j => j.ListRequirement).FirstOrDefault(m => m.ManagerId == id);



    public void UpdateItem(int id, Manager item)
    {
        var manager = context.Managers
            .Include(m => m.Jobs)
                .ThenInclude(j => j.ListSkills)
            .Include(m => m.Jobs)
                .ThenInclude(j => j.ListRequirement)
            .FirstOrDefault(m => m.ManagerId == id);

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

        context.Save();
    }

}