using Common.Dto;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Smart_Match.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class JobController : ControllerBase
    {

        private readonly IService<JobDto> service;
        public JobController(IService<JobDto> service)
        {
                this.service = service;
        }
        // GET: api/<JobController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<JobController>/5
        [HttpGet("{id}")]
        public JobDto Get(int id)
        {
            return service.GetById(id);
        }

        // POST api/<JobController>
        [HttpPost]
        public JobDto Post([FromBody] JobDto Job)
        {
            return service.AddItem(Job);
        }

        // PUT api/<JobController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<JobController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
