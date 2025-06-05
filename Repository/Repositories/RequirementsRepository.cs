using Repository.Entities;
using Repository.Repositories;
using Microsoft.EntityFrameworkCore;

public class RequirementsRepository : IRepository<Requirements>
{
    private readonly IContext context;
    public RequirementsRepository(IContext context) => this.context = context;

    public async Task<Requirements> AddItem(Requirements item)
    {
        await context.Requirements.AddAsync(item);
        await context.Save();
        return item;
    }

    public async Task DeleteItem(int id)
    {
        var req = GetById(id);
        context.Requirements.Remove(await req);
        await context.Save();
    }

    public async Task<List<Requirements>> GetAll() =>
       await context.Requirements
            .Include(r => r.ListJob)
            .Include(r => r.ListCandidate)
            .ToListAsync();

    public async Task<Requirements> GetById(int id) =>
      await context.Requirements
            .Include(r => r.ListJob)
            .Include(r => r.ListCandidate)
            .FirstOrDefaultAsync(r => r.RequirementId == id);


    public async Task UpdateItem(int id, Requirements item)
    {
        var requirnment =await context.Requirements
            .FirstOrDefaultAsync(s => s.RequirementId == id);

        if (requirnment == null)
            return;

        // עדכון שדות פשוטים בלבד
        requirnment.Description = item.Description;
        requirnment.AdvantageOrMust = item.AdvantageOrMust;

        context.Save();
    }
}
