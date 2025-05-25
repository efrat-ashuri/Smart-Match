using Repository.Entities;
using Repository.Repositories;

public class RequirementsRepository : IRepository<Requirements>
{
    private readonly IContext context;
    public RequirementsRepository(IContext context) => this.context = context;

    public Requirements AddItem(Requirements item)
    {
        context.Requirements.Add(item);
        context.Save();
        return item;
    }

    public void DeleteItem(int id)
    {
        var req = GetById(id);
        context.Requirements.Remove(req);
        context.Save();
    }

    public List<Requirements> GetAll() => context.Requirements.ToList();

    public Requirements GetById(int id) => context.Requirements.FirstOrDefault(r => r.RequirementId == id);

    public void UpdateItem(int id, Requirements item)
    {
        var req = GetById(id);
        if (req == null) return;
        req.Description = item.Description;
        req.AdvantageOrMust=item.AdvantageOrMust;
        context.Save();
    }
}


