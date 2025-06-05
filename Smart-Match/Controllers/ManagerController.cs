using Common.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Smart_Match.Controllers
{
    //Authenticate-אימות משתמש
    //Authorization-הרשאת גישה
    [Authorize(Roles = "Manager")]

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
        public async Task<List<ManagerDto>> Get()
        {
            return await service.GetAll();
        }

        // GET api/<ManagerController>/5
        [HttpGet("{id}")]
        public async Task <ManagerDto> Get(int id)
        {
            return await service.GetById(id);
           

        }

        // POST api/<ManagerController>
        [HttpPost]
        //[Authorize (Roles ="Manager")]//הכוונה פה זה לתת אופציה רק למשתמש שילו token שיש לו הרשאת גישה(לדוגמא מי שיש לו תפקיד מסוים)
        public async Task<ManagerDto> Post([FromBody] ManagerDto manager)
        {
          return await service.AddItem(manager);
        }

        // PUT api/<ManagerController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] ManagerDto manager)
        {
          await  service.UpdateItem(id, manager);
        }

        // DELETE api/<ManagerController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
           await service.DeleteItem(id);
        }
    }


   
}
