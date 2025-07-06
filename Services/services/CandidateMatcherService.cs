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

    //public class CandidateMatcherService : ICandidateMatcherService
    //{
    //    private readonly IService<JobDto> _jobService;
    //    private readonly IService<CandidateDto> _candidateService;
    //    private readonly IMapper _mapper;

    //    public CandidateMatcherService(IService<JobDto> jobService, IService<CandidateDto> candidateService, IMapper mapper)
    //    {
    //        _jobService = jobService;
    //        _candidateService = candidateService;
    //        _mapper = mapper;
    //    }

    //    public async Task<List<JobMatchesDto>> MatchCandidatesToJobsAsync()
    //    {
    //        var jobDtos = await _jobService.GetAll();
    //        var candidateDtos = await _candidateService.GetAll();

    //        var jobs = _mapper.Map<List<Job>>(jobDtos);
    //        var candidates = _mapper.Map<List<Candidate>>(candidateDtos);

    //        var jobInstances = DuplicateJobsByNumCandidate(jobs);

    //        int rows = jobInstances.Count;
    //        int cols = candidates.Count;
    //        int[,] costMatrix = new int[rows, cols];

    //        for (int i = 0; i < rows; i++)
    //        {
    //            var jobInst = jobInstances[i];
    //            for (int j = 0; j < cols; j++)
    //            {
    //                var candidate = candidates[j];
    //                double score = CalculateMatchPercentage(jobInst.OriginalJob, candidate);
    //                int cost = 100 - (int)Math.Round(score); // הופכים את הציון לעלות
    //                costMatrix[i, j] = cost;
    //            }
    //        }

    //        // מטריצה ריבועית – נדרש לאלגוריתם הונגרי
    //        int[,] squareMatrix = MakeSquareCostMatrix(costMatrix, rows, cols, highCost: 9999);

    //        int[] assignment = HungarianAlgorithm.HungarianAlgorithm.FindAssignments(squareMatrix);

    //        var jobMatches = new Dictionary<int, List<CandidateMatchDto>>();
    //        var assignedCandidates = new HashSet<int>();

    //        for (int i = 0; i < assignment.Length; i++)
    //        {
    //            int candidateIndex = assignment[i];
    //            if (i >= rows || candidateIndex < 0 || candidateIndex >= cols)
    //                continue;

    //            if (assignedCandidates.Contains(candidateIndex))
    //                continue;

    //            assignedCandidates.Add(candidateIndex);

    //            int jobId = jobInstances[i].OriginalJob.JobId;
    //            var candidate = candidates[candidateIndex];
    //            double matchScore = 100 - squareMatrix[i, candidateIndex]; // חזרה לניקוד

    //            // סינון לפי PassingScore
    //            if (matchScore < jobInstances[i].OriginalJob.PassingScore)
    //                continue;

    //            if (!jobMatches.ContainsKey(jobId))
    //                jobMatches[jobId] = new List<CandidateMatchDto>();

    //            jobMatches[jobId].Add(new CandidateMatchDto
    //            {
    //                Candidate = candidate,
    //                Score = matchScore
    //            });
    //        }

    //        var result = new List<JobMatchesDto>();

    //        foreach (var job in jobs)
    //        {
    //            jobMatches.TryGetValue(job.JobId, out var matchedCandidates);
    //            matchedCandidates ??= new List<CandidateMatchDto>();

    //            matchedCandidates = matchedCandidates.OrderByDescending(c => c.Score).ToList();

    //            result.Add(new JobMatchesDto
    //            {
    //                Job = job,
    //                MatchedCandidates = matchedCandidates
    //            });
    //        }

    //        return result;
    //    }

    //    private List<JobInstance> DuplicateJobsByNumCandidate(List<Job> jobs)
    //    {
    //        var list = new List<JobInstance>();
    //        foreach (var job in jobs)
    //        {
    //            int count = Math.Max(1, job.NumCandidate);
    //            for (int i = 1; i <= count; i++)
    //            {
    //                list.Add(new JobInstance { OriginalJob = job, InstanceNumber = i });
    //            }
    //        }
    //        return list;
    //    }


    //    private double CalculateMatchPercentage(Job job, Candidate candidate)
    //    {
    //        double score = 0;

    //        // דרישות חובה – 20%
    //        var mustReqs = job.ListRequirement.Where(r => r.AdvantageOrMust == eAdvanOrMust.Must).ToList();
    //        if (mustReqs.Count > 0)
    //        {
    //            var candidateReqIds = candidate.ListRequirement.Select(r => r.RequirementId).ToHashSet();
    //            int matched = mustReqs.Count(r => candidateReqIds.Contains(r.RequirementId));
    //            score += (matched / (double)mustReqs.Count) * 20.0;
    //        }

    //        // דרישות יתרון – 10%
    //        var advantageReqs = job.ListRequirement.Where(r => r.AdvantageOrMust == eAdvanOrMust.Advantage).ToList();
    //        if (advantageReqs.Count > 0)
    //        {
    //            var candidateReqIds = candidate.ListRequirement.Select(r => r.RequirementId).ToHashSet();
    //            int matched = advantageReqs.Count(r => candidateReqIds.Contains(r.RequirementId));
    //            score += (matched / (double)advantageReqs.Count) * 10.0;
    //        }

    //        // כישורים – 30%
    //        var jobSkills = job.ListSkills;
    //        var candidateSkillsDict = candidate.ListSkills.ToDictionary(s => s.Name, s => s.Mark);

    //        double skillsScore = 0;
    //        foreach (var js in jobSkills)
    //        {
    //            candidateSkillsDict.TryGetValue(js.Name, out int candMark);
    //            double ratio = Math.Min(1.0, candMark / (double)js.Mark); // max 100%
    //            skillsScore += ratio;
    //        }

    //        if (jobSkills.Count > 0)
    //            score += (skillsScore / jobSkills.Count) * 30.0;

    //        // אנגלית – 15%
    //        if (candidate.EnglishLevel >= job.EnglishLevel)
    //            score += 15.0;
    //        else
    //            score += (int)candidate.EnglishLevel / (double)(int)job.EnglishLevel * 15.0;

    //        // ניסיון – 15%
    //        int requiredYears = 0;
    //        int experience = candidate.ExperienceYears;
    //        if (experience >= requiredYears)
    //            score += 15.0;
    //        else
    //            score += (experience / (double)requiredYears) * 15.0;

    //        // אזור – 10%
    //        if (string.Equals(job.Area?.Trim(), candidate.Area?.Trim(), StringComparison.OrdinalIgnoreCase))
    //            score += 10.0;

    //        return score; // אחוז שלם
    //    }

    //    private int[,] MakeSquareCostMatrix(int[,] originalMatrix, int rows, int cols, int highCost = 9999)
    //    {
    //        int size = Math.Max(rows, cols);
    //        int[,] squareMatrix = new int[size, size];

    //        for (int i = 0; i < size; i++)
    //        {
    //            for (int j = 0; j < size; j++)
    //            {
    //                if (i < rows && j < cols)
    //                    squareMatrix[i, j] = originalMatrix[i, j];
    //                else
    //                    squareMatrix[i, j] = highCost; // מילוי בתא עלות גבוהה מאוד

    //            }
    //        }
    //        return squareMatrix;
    //    }

    //}

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
                    double score = CalculateMatchPercentage(jobInst.OriginalJob, candidate);
                    int cost = 100 - (int)Math.Round(score); // הופכים את הציון לעלות
                    Console.WriteLine("candidate:"+candidate.Name+"the score is:"+score+" and the cost is:"+cost);
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
                double matchScore = 100 - squareMatrix[i, candidateIndex]; // חזרה לניקוד

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

        private double CalculateMatchPercentage(Job job, Candidate candidate)
        {
            double score = 0;

            // דרישות חובה – 20%
            var mustReqs = job.ListRequirement
                .Where(r => r.AdvantageOrMust == eAdvanOrMust.Must)
                .Select(r => r.Description?.Trim().ToLower())
                .Where(d => !string.IsNullOrEmpty(d))
                .ToList();

            var candidateReqs = candidate.ListRequirement
                .Select(r => r.Description?.Trim().ToLower())
                .Where(d => !string.IsNullOrEmpty(d))
                .ToHashSet();
            Console.WriteLine($"Candidate '{candidate.Name}' has {candidateReqs.Count} requirements.");


            if (mustReqs.Count > 0)
            {
                int matched = mustReqs.Count(req => candidateReqs.Contains(req));
                score += (matched / (double)mustReqs.Count) * 20.0;
            }

            // דרישות יתרון – 10%
            var advantageReqs = job.ListRequirement
                .Where(r => r.AdvantageOrMust == eAdvanOrMust.Advantage)
                .Select(r => r.Description?.Trim().ToLower())
                .Where(d => !string.IsNullOrEmpty(d))
                .ToList();

            if (advantageReqs.Count > 0)
            {
                int matched = advantageReqs.Count(req => candidateReqs.Contains(req));
                score += (matched / (double)advantageReqs.Count) * 10.0;
            }

            // כישורים – 30% לפי שם ולא לפי ID
            var jobSkills = job.ListSkills;
            var candidateSkillsDict = candidate.ListSkills
                .Where(s => !string.IsNullOrEmpty(s.Name))
                .GroupBy(s => s.Name.Trim().ToLower())
                .ToDictionary(g => g.Key, g => g.First().Mark);

            double skillsScore = 0;
            Console.WriteLine($"Candidate {candidate.Name} has {candidate.ListSkills?.Count ?? 0} skills");

            foreach (var jobSkill in jobSkills)
            {
                if (string.IsNullOrWhiteSpace(jobSkill.Name))
                    continue;

                var name = jobSkill.Name.Trim().ToLower();
                Console.WriteLine($"Looking for skill: {name}");

                candidateSkillsDict.TryGetValue(name, out int candMark);
                Console.WriteLine($"Found skill: {candMark}, jobSkill.Mark: {jobSkill.Mark}");

                double ratio = Math.Min(1.0, candMark / (double)Math.Max(1, jobSkill.Mark)); // הגנה מחלוקה באפס
                skillsScore += ratio;
            }

            if (jobSkills.Count > 0)
                score += (skillsScore / jobSkills.Count) * 30.0;

            // אנגלית – 15%
            if (candidate.EnglishLevel >= job.EnglishLevel)
                score += 15.0;
            else if (job.EnglishLevel > 0)
                score += ((double)candidate.EnglishLevel / (double)(int)job.EnglishLevel) * 15.0;

            // ניסיון – 15% (אם יש דרישת ניסיון, נשקלל. אם לא – נניח אפס)
            int requiredYears = 0; // אפשר לשנות אם תרצי שייקבע מתוך דרישות
            int experience = candidate.ExperienceYears;
            if (requiredYears == 0 || experience >= requiredYears)
                score += 15.0;
            else
                score += ((double)experience / requiredYears) * 15.0;

            // אזור – 10%
            if (!string.IsNullOrEmpty(job.Area) && !string.IsNullOrEmpty(candidate.Area))
            {
                if (string.Equals(job.Area.Trim(), candidate.Area.Trim(), StringComparison.OrdinalIgnoreCase))
                    score += 10.0;
            }

            return Math.Round(score, 2); // להחזרת ניקוד עגול עד שתי ספרות אחרי הנקודה
        }


        //private double CalculateMatchPercentage(Job job, Candidate candidate)
        //{
        //    double score = 0;

        //    // דרישות חובה – 20%
        //    var mustReqs = job.ListRequirement.Where(r => r.AdvantageOrMust == eAdvanOrMust.Must).ToList();
        //    if (mustReqs.Count > 0)
        //    {
        //        var candidateReqIds = candidate.ListRequirement.Select(r => r.RequirementId).ToHashSet();
        //        int matched = mustReqs.Count(r => candidateReqIds.Contains(r.RequirementId));
        //        score += (matched / (double)mustReqs.Count) * 20.0;
        //    }

        //    // דרישות יתרון – 10%
        //    var advantageReqs = job.ListRequirement.Where(r => r.AdvantageOrMust == eAdvanOrMust.Advantage).ToList();
        //    if (advantageReqs.Count > 0)
        //    {
        //        var candidateReqIds = candidate.ListRequirement.Select(r => r.RequirementId).ToHashSet();
        //        int matched = advantageReqs.Count(r => candidateReqIds.Contains(r.RequirementId));
        //        score += (matched / (double)advantageReqs.Count) * 10.0;
        //    }

        //    // כישורים – 30%
        //    var jobSkills = job.ListSkills;
        //    var candidateSkillsDict = candidate.ListSkills.ToDictionary(s => s.Name, s => s.Mark);

        //    double skillsScore = 0;
        //    foreach (var js in jobSkills)
        //    {
        //        candidateSkillsDict.TryGetValue(js.Name, out int candMark);
        //        double ratio = Math.Min(1.0, candMark / (double)js.Mark); // max 100%
        //        skillsScore += ratio;
        //    }

        //    if (jobSkills.Count > 0)
        //        score += (skillsScore / jobSkills.Count) * 30.0;

        //    // אנגלית – 15%
        //    if (candidate.EnglishLevel >= job.EnglishLevel)
        //        score += 15.0;
        //    else
        //        score += (int)candidate.EnglishLevel / (double)(int)job.EnglishLevel * 15.0;

        //    // ניסיון – 15%
        //    int requiredYears = 0;
        //    int experience = candidate.ExperienceYears;
        //    if (experience >= requiredYears)
        //        score += 15.0;
        //    else
        //        score += (experience / (double)requiredYears) * 15.0;

        //    // אזור – 10%
        //    if (string.Equals(job.Area?.Trim(), candidate.Area?.Trim(), StringComparison.OrdinalIgnoreCase))
        //        score += 10.0;

        //    return score; // אחוז שלם
        //}
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


// הערות:
// מחלקה CandidateMatcherService אחראית על התאמת מועמדים למשרות באמצעות אלגוריתם הונגרי.
// היא מקבלת רשימות של משרות ומועמדים, משכפלת משרות לפי כמות המועמדים הנדרשת,
// בונה מטריצת אי־התאמה, מפעילה את אלגוריתם הונגרי ומחזירה רשימת התאמות מאורגנת.


// מחלקות נוספות:
//  JobInstance – כדי לנהל משרות משוכפלות מול מועמדים.

//JobMatchesDto – כדי להחזיר תוצאה מאורגנת של התאמה בין משרות למועמדים.

//CandidateMatchDto – כדי להחזיק מידע על מועמד ספציפי וציון ההתאמה שלו.





