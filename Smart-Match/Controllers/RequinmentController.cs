using Common.Dto;
using Microsoft.AspNetCore.Authorization;
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
        public async Task<List<RequirementsDto>> Get()
        {
            return await service.GetAll();
        }

        // GET api/<RequinmentController>/5
        [HttpGet("{id}")]
        public async Task<RequirementsDto> Get(int id)
        {
            return await service.GetById(id);
        }

        // POST api/<RequinmentController>
        [HttpPost]
        [Authorize]
        public async Task<RequirementsDto> Post([FromBody] RequirementsDto requirements)
        {
            return await service.AddItem(requirements);
        }

        // PUT api/<RequinmentController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] RequirementsDto requirements)
        {
           await service.UpdateItem(id, requirements);
        }

        // DELETE api/<RequinmentController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
          await  service.DeleteItem(id);
        }
    }
}
