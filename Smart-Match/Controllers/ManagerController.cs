using Common.Dto;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Smart_Match.Controllers
{
    

    [Route("api/[controller]")]
    [ApiController]
    public class ManagerController : ControllerBase
    {

        private readonly IService<ManagerDto> service;
        public ManagerController(IService<ManagerDto> service)
        {
                this.service = service;
        }

        // GET: api/<ManagerController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ManagerController>/5
        [HttpGet("{id}")]
        public ManagerDto Get(int id)
        {
            return service.GetById(id);
        }

        // POST api/<ManagerController>
        [HttpPost]
        public ManagerDto Post([FromBody] ManagerDto manager)
        {
          return  service.AddItem(manager);
        }

        // PUT api/<ManagerController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ManagerController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }


   
}
