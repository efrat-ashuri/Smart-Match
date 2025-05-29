using Repository.Entities;
using Repository.Repositories;
using Microsoft.EntityFrameworkCore;

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

    public List<Requirements> GetAll() =>
        context.Requirements
            .Include(r => r.ListJob)
            .Include(r => r.ListCandidate)
            .ToList();

    public Requirements GetById(int id) =>
        context.Requirements
            .Include(r => r.ListJob)
            .Include(r => r.ListCandidate)
            .FirstOrDefault(r => r.RequirementId == id);

  
    public void UpdateItem(int id, Requirements item)
    {
        var requirnment = context.Requirements
            .FirstOrDefault(s => s.RequirementId == id);

        if (requirnment == null)
            return;

        // עדכון שדות פשוטים בלבד
        requirnment.Description = item.Description;
        requirnment.AdvantageOrMust = item.AdvantageOrMust;

        context.Save();
    }
}
