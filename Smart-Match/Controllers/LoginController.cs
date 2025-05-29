using Common.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Service.Interfaces;
using System.CodeDom.Compiler;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Smart_Match.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IService<ManagerDto> service;
        private readonly IConfiguration _config;

        public LoginController(IService<ManagerDto> service, IConfiguration config)
        {
            this.service = service;
            _config = config;
        }
        // GET: api/<LoginController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<LoginController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<LoginController>
        [HttpPost]
        public void Post([FromBody] ManagerDto value)
        {
            service.AddItem(value);
        }


        // POST api/<LoginController>
        [HttpPost("/login")]
        public string Login([FromBody] ManagerLogin value)
        {
            var manager = Authenticate(value);//פונקציה לאימות משתמש
            var token = Generate(manager);//פונקציה להחזרת ה token
            return token;
        }

        private string Generate(ManagerDto manager)
        {
            //claim וגם איפה להצפין הוא אוביקט שגורם להצפנה
            //מכיל את מה שאני רוצה להצפין 
            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);
            var claims = new[] {
            new Claim(ClaimTypes.NameIdentifier,manager.Name),
            new Claim(ClaimTypes.Email,manager.Email),
            new Claim(ClaimTypes.PostalCode,manager.Password),       
            new Claim(ClaimTypes.GivenName,manager.Name)
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private ManagerDto Authenticate(ManagerLogin value)
        {
            ManagerDto manager= service.GetAll().FirstOrDefault(x => x.Password == value.Password && x.Name == value.Name);
            if(manager!=null)
                return manager;
            return null;
        }

        // PUT api/<LoginController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<LoginController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
