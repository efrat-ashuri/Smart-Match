using Microsoft.Extensions.DependencyInjection;
using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public static class ExtentionRepository
    {
        //מנהל תלויות : * יוצר מופע למחלקה
        // מזריק אותה למקום המתאים *
        //פונקציה להגדרת התלויות
        public static IServiceCollection AddRepository(this IServiceCollection services)
        {

            //יוצר מופע אחד עבור כל גולש ומזריק אותו בכל פעם
            services.AddScoped<IRepository<Manager>, ManagerRepository>();
            services.AddScoped<IRepository<Candidate>, CandidateRepository>();
            services.AddScoped<IRepository<Job>, JobRepository>();
            services.AddScoped<IRepository<Requirements>, RequirementsRepository>();
            services.AddScoped<IRepository<Skills>, SkillsRepository>();

            return services;
        }
    }
}

