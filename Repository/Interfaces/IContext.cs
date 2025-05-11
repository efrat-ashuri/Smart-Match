using Repository.Entities;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
public interface IContext
{
    DbSet<Candidate> Candidates { get; set; }
    DbSet<CandidateRequirement> CandidatesReq { get; set; }
    DbSet<CandidateSkills> CandidateSkills { get; set; }
    DbSet<Job> Jobs { get; set; }
    DbSet<JobRequirement> JobReq { get; set; }
    DbSet<JobSkill> JobSkills { get; set; }
    DbSet<Manager> Managers { get; set; }
    DbSet<Requirements> Requirements { get; set; }
    DbSet<Skills> Skills { get; set; }

    void Save();
}
