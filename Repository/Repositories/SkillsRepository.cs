using Repository.Entities;
using Repository.Repositories;
using Microsoft.EntityFrameworkCore;

public class SkillsRepository : IRepository<Skills>
{
    private readonly IContext context;
    public SkillsRepository(IContext context) => this.context = context;

    public async Task<Skills> AddItem(Skills item)
    {
        await context.Skills.AddAsync(item);
        await context.Save();
        return item;
    }

    public async Task DeleteItem(int id)
    {
        var skill = GetById(id);
        context.Skills.Remove(await skill);
        await context.Save();
    }

    public async Task<List<Skills>> GetAll() =>
      await context.Skills
            .Include(s => s.ListJob)
            .Include(s => s.ListCandidate)
            .ToListAsync();

    public async Task<Skills> GetById(int id) =>
       await context.Skills
            .Include(s => s.ListJob)
            .Include(s => s.ListCandidate)
            .FirstOrDefaultAsync(s => s.SkillsId == id);

    public async Task UpdateItem(int id, Skills item)
    {
        var skill =await context.Skills
            .FirstOrDefaultAsync(s => s.SkillsId == id);

        if (skill == null)
            return;

        // עדכון שדות פשוטים בלבד
        skill.Name = item.Name;
        skill.Mark = item.Mark;

       await context.Save();
    }

}
