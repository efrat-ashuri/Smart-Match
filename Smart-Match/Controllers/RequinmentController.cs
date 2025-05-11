using Common.Dto;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Smart_Match.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequinmentController : ControllerBase
    {
        private readonly IService<RequirementsDto> service;
        public RequinmentController(IService<RequirementsDto> service)
        {
            this.service = service;
        }
        // GET: api/<RequinmentController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<RequinmentController>/5
        [HttpGet("{id}")]
        public RequirementsDto Get(int id)
        {
            return service.GetById(id);
        }

        // POST api/<RequinmentController>
        [HttpPost]
        public RequirementsDto Post([FromBody] RequirementsDto requirements)
        {
            return service.AddItem(requirements);
        }

        // PUT api/<RequinmentController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<RequinmentController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
