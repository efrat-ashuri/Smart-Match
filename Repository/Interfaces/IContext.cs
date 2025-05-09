using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    //  הממשק שמתאר את הנתונים מייצג את הdatabase
    public interface IContext
    {
        public DbSet<Candidate> Candidates { get; set; }
        public Dbset<CandidateRequirement> CandidatesReq { get; set; }
        public Dbset<CandidateSkills> CandidateSkills{ get; set; }
        public Dbset<Job> Jobs { get; set; }
        public Dbset<JobRequirement> JobReq { get; set; }
        public Dbset<JobSkill> JobSkills { get; set; }
        public Dbset<Manager> Managers { get; set; }
        public Dbset<Requirements> Requirements { get; set; }
        public Dbset<Skills> Skills { get; set; }
        public void Save();       




    }
}
