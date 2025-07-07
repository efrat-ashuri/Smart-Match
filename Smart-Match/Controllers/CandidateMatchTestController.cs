using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using System.Threading.Tasks;

namespace Smart_Match.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CandidateMatchTestController : ControllerBase
    {
        private readonly ICandidateMatcherService _matcherService;

        public CandidateMatchTestController(ICandidateMatcherService matcherService)
        {
            _matcherService = matcherService;
        }

        [HttpGet("run/{managerId}")]
        public async Task<IActionResult> RunMatching(int managerId)
        {
            var result = await _matcherService.MatchCandidatesToJobsAsync(managerId); // שולחים את ה-managerId לפונקציה
            return Ok(result); // מחזיר את תוצאות ההתאמה כ-JSON
        }
    }
}
