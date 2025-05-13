using Repository.Entities;
using Repository.Repositories;

public class CandidateRequirementRepository : IRepository<CandidateRequirement>
{
    private readonly IContext context;
    public CandidateRequirementRepository(IContext context) => this.context = context;

    public CandidateRequirement AddItem(CandidateRequirement item)
    {
        context.CandidateRequirements.Add(item);
        context.Save();
        return item;
    }

    public void DeleteItem(int id)
    {
        var cr = GetById(id);
        context.CandidateRequirements.Remove(cr);
        context.Save();
    }

    public List<CandidateRequirement> GetAll() => context.CandidateRequirements.ToList();

    public CandidateRequirement GetById(int id) => context.CandidateRequirements.FirstOrDefault(c => c.CandidateReqId == id);

    public void UpdateItem(int id, CandidateRequirement item)
    {
        var cr = GetById(id);
        if (cr == null) return;
        cr.IdCandidate = item.IdCandidate;
        cr.IdRequirement = item.IdRequirement;
        cr.AdvantageOrMust = item.AdvantageOrMust;
        context.Save();
    }

}
