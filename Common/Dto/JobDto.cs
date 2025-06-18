using Common.Dto;

public class JobDto
{
    public int JobId { get; set; } // אותו שם כמו ב-Entity

    public int ManagerId { get; set; }
    //public string ManagerName { get; set; } // אם צריך בהמשך
    public string Title { get; set; }
    public string Description { get; set; }
    public string Area { get; set; }
    public string EnglishLevel { get; set; }

    public int PassingScore { get; set; }
    public int NumCandidate { get; set; }

    public List<RequirementsDto> ListRequirement { get; set; } = null;
    public List<SkillsDto> ListSkills { get; set; } = null;
}
