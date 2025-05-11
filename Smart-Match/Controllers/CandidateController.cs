using Common.Dto;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Smart_Match.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private readonly IService<CandidateDto> service;
        public CandidateController(IService<CandidateDto> service)
        {
            this.service = service;
        }
      
        // GET: api/<CandidateController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<CandidateController>/5
        [HttpGet("{id}")]
        public CandidateDto Get(int id)
        {
            return service.GetById(id);
        }

        // POST api/<CandidateController>
        [HttpPost]
        public CandidateDto Post([FromBody] CandidateDto candidate)
        {
            return service.AddItem(candidate);
        }

        // PUT api/<CandidateController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CandidateController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
