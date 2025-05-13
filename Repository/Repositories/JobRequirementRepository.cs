using Repository.Entities;
using Repository.Repositories;

public class JobRequirementRepository : IRepository<JobRequirement>
{
    private readonly IContext context;
    public JobRequirementRepository(IContext context) => this.context = context;

    public JobRequirement AddItem(JobRequirement item)
    {
        context.JobRequirements.Add(item);
        context.Save();
        return item;
    }

    public void DeleteItem(int id)
    {
        var jr = GetById(id);
        context.JobRequirements.Remove(jr);
        context.Save();
    }

    public List<JobRequirement> GetAll() => context.JobRequirements.ToList();

    public JobRequirement GetById(int id) => context.JobRequirements.FirstOrDefault(j => j.JobRequirementId == id);

    public void UpdateItem(int id, JobRequirement item)
    {
        var jr = GetById(id);
        if (jr == null) return;
        jr.IdJob = item.IdJob;
        jr.IdRequirement = item.IdRequirement;
        jr.AdvantageOrMust = item.AdvantageOrMust;
        context.Save();
    }
}

