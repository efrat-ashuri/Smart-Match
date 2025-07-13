using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HungarianAlgorithm;
using Service.Interfaces;
using AutoMapper;
using Common.Dto;

namespace Service.services
{
    public class CandidateMatcherService : ICandidateMatcherService
    {
        private readonly IService<JobDto> _jobService;
        private readonly IService<CandidateDto> _candidateService;
        private readonly IMapper _mapper;

        public CandidateMatcherService(IService<JobDto> jobService, IService<CandidateDto> candidateService, IMapper mapper)
        {
            _jobService = jobService;
            _candidateService = candidateService;
            _mapper = mapper;
        }

        public async Task<List<JobMatchesDto>> MatchCandidatesToJobsAsync(int managerId)
        {
            var jobDtos = await _jobService.GetAll();
            var candidateDtos = await _candidateService.GetAll();

            // סינון המשרות לפי ManagerId
            var filteredJobs = jobDtos.Where(job => job.ManagerId == managerId).ToList();

            var jobs = _mapper.Map<List<Job>>(filteredJobs);
            var candidates = _mapper.Map<List<Candidate>>(candidateDtos);

            // 1. נשכפל את המשרות לפי מספר המועמדים הנדרשים לכל משרה
            var jobInstances = DuplicateJobsByNumCandidate(jobs);

            // 2. בונים את מטריצת העלות
            int rows = jobInstances.Count;
            int cols = candidates.Count;
            int[,] costMatrix = new int[rows, cols];

            for (int i = 0; i < rows; i++)
            {
                var jobInst = jobInstances[i];
                for (int j = 0; j < cols; j++)
                {
                    var candidate = candidates[j];
                    double score = CalculateScore(jobInst.OriginalJob, candidate);
                    int cost = 100 - (int)Math.Round(score); // הופכים את הציון לעלות
                    Console.WriteLine("candidate:" + candidate.Name + "the score is:" + score + " and the cost is:" + cost);
                    costMatrix[i, j] = cost;
                }
            }

            // 3. אם המטריצה לא ריבועית, נעשה לה ריבועית על ידי הוספת עלות גבוהה למילוי
            int[,] squareMatrix = MakeSquareCostMatrix(costMatrix, rows, cols, highCost: 9999);

            // 4. הפעלת אלגוריתם הונגרי
            int[] assignment = HungarianAlgorithm.HungarianAlgorithm.FindAssignments(squareMatrix);

            for (int i = 0; i < rows; i++)
            {
                for (int j = 0; j < cols; j++)
                {
                    Console.Write($"{100 - costMatrix[i, j]} ");
                }
                Console.WriteLine();
            }

            // 5. קיבוץ התאמות
            var jobMatches = new Dictionary<int, List<CandidateMatchDto>>();
            var assignedCandidates = new HashSet<int>();

            for (int i = 0; i < assignment.Length; i++)
            {
                int candidateIndex = assignment[i];
                if (i >= rows || candidateIndex < 0 || candidateIndex >= cols)
                    continue;

                if (assignedCandidates.Contains(candidateIndex))
                    continue;

                assignedCandidates.Add(candidateIndex);

                int jobId = jobInstances[i].OriginalJob.JobId;
                var candidate = candidates[candidateIndex];
                double matchScore = 100 - costMatrix[i, candidateIndex];

                Console.WriteLine("score of :" + candidate.Name + " is :" + matchScore);

                // סינון לפי PassingScore
                if (matchScore < jobInstances[i].OriginalJob.PassingScore)
                    continue;

                if (!jobMatches.ContainsKey(jobId))
                    jobMatches[jobId] = new List<CandidateMatchDto>();

                jobMatches[jobId].Add(new CandidateMatchDto
                {
                    Candidate = candidate,
                    Score = matchScore
                });
            }

            var result = new List<JobMatchesDto>();

            foreach (var job in jobs)
            {
                jobMatches.TryGetValue(job.JobId, out var matchedCandidates);
                matchedCandidates ??= new List<CandidateMatchDto>();

                matchedCandidates = matchedCandidates.OrderByDescending(c => c.Score).Take(job.NumCandidate).ToList(); // הגבלת מספר המועמדים

                result.Add(new JobMatchesDto
                {
                    Job = job,
                    MatchedCandidates = matchedCandidates
                });
            }

            return result;
        }

        private List<JobInstance> DuplicateJobsByNumCandidate(List<Job> jobs)
        {
            var list = new List<JobInstance>();
            foreach (var job in jobs)
            {
                int count = Math.Max(1, job.NumCandidate);
                for (int i = 1; i <= count; i++)
                {
                    list.Add(new JobInstance { OriginalJob = job, InstanceNumber = i });
                }
            }
            return list;
        }

        private int[,] MakeSquareCostMatrix(int[,] originalMatrix, int rows, int cols, int highCost = 9999)
        {
            int size = Math.Max(rows, cols);
            int[,] squareMatrix = new int[size, size];

            for (int i = 0; i < size; i++)
            {
                for (int j = 0; j < size; j++)
                {
                    if (i < rows && j < cols)
                        squareMatrix[i, j] = originalMatrix[i, j];
                    else
                        squareMatrix[i, j] = highCost; // מילוי בתא עלות גבוהה מאוד
                }
            }
            return squareMatrix;
        }

        private static double CalculateScore(Job job, Candidate candidate)
        {
            double score = 0;

            score += ScoreRequirements(job, candidate);  // 20 + 10 נקודות
            score += ScoreSkills(job, candidate);        // עד 30 נקודות
            score += ScoreEnglishReduced(job, candidate); // במקום ScoreEnglish - מופחת
            score += ScoreExperience(job, candidate);    // עד 15 נקודות
            score += ScoreAreaReduced(job, candidate);   // אזור מופחת
            score += ScoreRoleMatch(job, candidate);     // ניקוד משמעותי להתאמת תפקיד

            if (score < 0)
                score = 0;

            return Math.Round(score, 2);
        }

        private static double ScoreEnglishReduced(Job job, Candidate candidate)
        {
            int jobLevel = (int)job.EnglishLevel;
            int candLevel = (int)candidate.EnglishLevel;

            if (candLevel > jobLevel)
                return 8;

            if (candLevel == jobLevel)
                return 6;

            if (jobLevel > 0)
                return ((double)candLevel / jobLevel) * 4;

            return 0;
        }

        private static double ScoreAreaReduced(Job job, Candidate candidate)
        {
            if (string.Equals(job.Area?.Trim(), candidate.Area?.Trim(), StringComparison.OrdinalIgnoreCase))
                return 4;

            return 0;
        }

        private static double ScoreRoleMatch(Job job, Candidate candidate)
        {
            if (string.IsNullOrWhiteSpace(job.Title) || string.IsNullOrWhiteSpace(candidate.Role))
                return 0;

            var jobTitle = job.Title.Trim().ToLower();
            var candidateRole = candidate.Role.Trim().ToLower();

            if (jobTitle == candidateRole)
                return 10;

            // דוגמא להוספת מילים נרדפות, תוכל להרחיב כפי שצריך
            var synonyms = new Dictionary<string, List<string>>
            {
                ["ai engineer"] = new List<string> { "ml developer", "ai researcher" },
                ["full stack developer"] = new List<string> { "frontend+backend", "fullstack" },
                ["frontend engineer"] = new List<string> { "ui developer" },
                // הוסף עוד לפי הצורך
            };

            if (synonyms.ContainsKey(jobTitle) && synonyms[jobTitle].Contains(candidateRole))
                return 7;

            // חיפוש חלקי
            if (jobTitle.Contains(candidateRole) || candidateRole.Contains(jobTitle))
                return 5;

            return -10; // ענישה על תפקיד שלא מתאים כלל
        }


        private static double ScoreRequirements(Job job, Candidate candidate)
        {
            var mustReqs = job.ListRequirement?
                .Where(r => r.AdvantageOrMust == eAdvanOrMust.Must)
                .Select(r => r.Description.Trim().ToLower())
                .ToList() ?? new List<string>();

            var advantageReqs = job.ListRequirement?
                .Where(r => r.AdvantageOrMust == eAdvanOrMust.Advantage)
                .Select(r => r.Description.Trim().ToLower())
                .ToList() ?? new List<string>();

            var candidateReqs = candidate.ListRequirement?
                .Select(r => r.Description.Trim().ToLower())
                .ToHashSet() ?? new HashSet<string>();

            double score = 0;

            if (mustReqs.Count > 0)
            {
                int matchedMust = mustReqs.Count(req => candidateReqs.Contains(req));
                double mustRatio = matchedMust / (double)mustReqs.Count;

                score += mustRatio * 20;

                if (mustRatio < 1.0)
                {
                    double penalty = (1.0 - mustRatio) * 10; // הפחתת ניקוד עד 10 נקודות
                    score -= penalty;
                }
            }

            if (advantageReqs.Count > 0)
            {
                int matchedAdv = advantageReqs.Count(req => candidateReqs.Contains(req));
                score += (matchedAdv / (double)advantageReqs.Count) * 10;
            }

            return score;
        }

        private static double ScoreSkills(Job job, Candidate candidate)
        {
            var jobSkills = job.ListSkills ?? new List<Skills>();
            var candidateSkills = candidate.ListSkills?.ToDictionary(s => s.Name.Trim().ToLower(), s => s.Mark) ?? new Dictionary<string, int>();

            double skillScore = 0;
            foreach (var js in jobSkills)
            {
                if (candidateSkills.TryGetValue(js.Name.Trim().ToLower(), out int candMark))
                {
                    double ratio = Math.Min(1.0, candMark / (double)Math.Max(1, js.Mark));
                    skillScore += ratio;
                }
            }

            if (jobSkills.Count == 0) return 0;
            return (skillScore / jobSkills.Count) * 30;
        }

        private static double ScoreExperience(Job job, Candidate candidate)
        {
            int maxYears = 5;
            int requiredYears = job.ExperienceYears;

            // נחשב יחס בין ניסיון המועמד לדרישת המשרה (עד מקסימום 5 שנים)
            double effectiveYears = Math.Min(candidate.ExperienceYears, maxYears);
            double required = Math.Min(requiredYears, maxYears);

            if (effectiveYears >= required)
                return 15;

            return (effectiveYears / required) * 15;
        }


    }



    public class JobInstance
    {
        public Job OriginalJob { get; set; }
        public int InstanceNumber { get; set; }
    }

    public class JobMatchesDto
    {
        public Job Job { get; set; }
        public List<CandidateMatchDto> MatchedCandidates { get; set; }
    }

    public class CandidateMatchDto
    {
        public Candidate Candidate { get; set; }
        public double Score { get; set; }
    }

}
