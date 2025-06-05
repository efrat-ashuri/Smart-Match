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
        public async Task<List<JobDto>> Get()
        {
            return await service.GetAll();
        }

        // GET api/<JobController>/5
        [HttpGet("{id}")]
        public async Task<JobDto> Get(int id)
        {
            return await service.GetById(id);
        }

        // POST api/<JobController>
        [HttpPost]
        public async Task<JobDto> Post([FromBody] JobDto Job)
        {
            return await service.AddItem(Job);
        }

        // PUT api/<JobController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] JobDto job)
        {
            await service.UpdateItem(id, job);
        }

        // DELETE api/<JobController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await service.DeleteItem(id);
        }
    }
}
