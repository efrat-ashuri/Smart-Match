using Repository.Entities;
using Repository.Repositories;

public class CandidateSkillsRepository : IRepository<CandidateSkills>
{
    private readonly IContext context;
    public CandidateSkillsRepository(IContext context) => this.context = context;

    public CandidateSkills AddItem(CandidateSkills item)
    {
        context.CandidateSkills.Add(item);
        context.Save();
        return item;
    }

    public void DeleteItem(int id)
    {
        var cs = GetById(id);
        context.CandidateSkills.Remove(cs);
        context.Save();
    }

    public List<CandidateSkills> GetAll() => context.CandidateSkills.ToList();

    public CandidateSkills GetById(int id) => context.CandidateSkills.FirstOrDefault(c => c.CandidateSkillsId == id);

    public void UpdateItem(int id, CandidateSkills item)
    {
        var cs = GetById(id);
        if (cs == null) return;
        cs.IdSkills = item.IdSkills;
        cs.IdCandidate = item.IdCandidate;
        cs.Name = item.Name;
        cs.SuccessRate = item.SuccessRate;
        context.Save();
    }
}
