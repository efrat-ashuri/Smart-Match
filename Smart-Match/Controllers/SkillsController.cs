using Common.Dto;
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
                this.service=service;
        }
        // GET: api/<SkillsController>
        [HttpGet]
        public List<SkillsDto> Get()
        {
            return service.GetAll().ToList();
        }

        // GET api/<SkillsController>/5
        [HttpGet("{id}")]
        public SkillsDto Get(int id)
        {
            return service.GetById(id);
        }

        // POST api/<SkillsController>
        [HttpPost]
        public SkillsDto Post([FromBody] SkillsDto skills)
        {
            return service.AddItem(skills);
        }

        // PUT api/<SkillsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] SkillsDto skills)
        {
            service.UpdateItem(id, skills);
        }

        // DELETE api/<SkillsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            service.DeleteItem(id);
        }
    }
}
