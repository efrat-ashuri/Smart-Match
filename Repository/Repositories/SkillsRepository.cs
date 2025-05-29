using Repository.Entities;
using Repository.Repositories;
using Microsoft.EntityFrameworkCore;

public class SkillsRepository : IRepository<Skills>
{
    private readonly IContext context;
    public SkillsRepository(IContext context) => this.context = context;

    public Skills AddItem(Skills item)
    {
        context.Skills.Add(item);
        context.Save();
        return item;
    }

    public void DeleteItem(int id)
    {
        var skill = GetById(id);
        context.Skills.Remove(skill);
        context.Save();
    }

    public List<Skills> GetAll() =>
        context.Skills
            .Include(s => s.ListJob)
            .Include(s => s.ListCandidate)
            .ToList();

    public Skills GetById(int id) =>
        context.Skills
            .Include(s => s.ListJob)
            .Include(s => s.ListCandidate)
            .FirstOrDefault(s => s.SkillsId == id);

    public void UpdateItem(int id, Skills item)
    {
        var skill = context.Skills
            .FirstOrDefault(s => s.SkillsId == id);

        if (skill == null)
            return;

        // עדכון שדות פשוטים בלבד
        skill.Name = item.Name;
        skill.Mark = item.Mark;

        context.Save();
    }

}
