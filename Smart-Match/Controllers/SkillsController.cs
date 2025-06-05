using Common.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Smart_Match.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class SkillsController : ControllerBase
    {
        private readonly IService<SkillsDto> service;
        public SkillsController(IService<SkillsDto> service)
        {
            this.service = service;
        }
        // GET: api/<SkillsController>
        [HttpGet]
        public async Task<List<SkillsDto>> Get()
        {
            return await service.GetAll();
        }

        // GET api/<SkillsController>/5
        [HttpGet("{id}")]
        public async Task<SkillsDto> Get(int id)
        {
            return await service.GetById(id);
        }

        // POST api/<SkillsController>
        [HttpPost]
        [Authorize]

        public async Task<SkillsDto> Post([FromBody] SkillsDto skills)
        {
            return await service.AddItem(skills);
        }

        // PUT api/<SkillsController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] SkillsDto skills)
        {
            await service.UpdateItem(id, skills);
        }

        // DELETE api/<SkillsController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await service.DeleteItem(id);
        }
    }
}
