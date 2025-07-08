using Common.Dto;

public class JobDto
{
    public int JobId { get; set; }
    public int ManagerId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Area { get; set; }
    public string EnglishLevel { get; set; }

    public int PassingScore { get; set; }
    public int NumCandidate { get; set; }

    public int ExperienceYears { get; set; }

    public List<RequirementsDto> ListRequirement { get; set; } = null;
    public List<SkillsDto> ListSkills { get; set; } = null;
}
