using Repository.Entities;
using Repository.Repositories;

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

    public List<Skills> GetAll() => context.Skills.ToList();

    public Skills GetById(int id) => context.Skills.FirstOrDefault(s => s.SkillsId == id);

    public void UpdateItem(int id, Skills item)
    {
        var skill = GetById(id);
        if (skill == null) return;
        skill.Name = item.Name;
        context.Save();
    }
}
