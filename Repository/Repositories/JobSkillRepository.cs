using Repository.Entities;
using Repository.Repositories;

public class JobSkillRepository : IRepository<JobSkill>
{
    private readonly IContext context;
    public JobSkillRepository(IContext context) => this.context = context;

    public JobSkill AddItem(JobSkill item)
    {
        context.JobSkills.Add(item);
        context.Save();
        return item;
    }

    public void DeleteItem(int id)
    {
        var js = GetById(id);
        context.JobSkills.Remove(js);
        context.Save();
    }

    public List<JobSkill> GetAll() => context.JobSkills.ToList();

    public JobSkill GetById(int id) => context.JobSkills.FirstOrDefault(j => j.JobSkillsId == id);

    public void UpdateItem(int id, JobSkill item)
    {
        var js = GetById(id);
        if (js == null) return;
        js.IdJob = item.IdJob;
        js.IdSkills = item.IdSkills;
        js.Name = item.Name;
        js.Mark = item.Mark;
        context.Save();
    }
}

