using Common.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Repository.Entities;
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
        private readonly IService<UserDto> service;
        private readonly IConfiguration _config;

        public LoginController(IService<UserDto> service, IConfiguration config)
        {
            this.service = service;
            _config = config;
        }
        // GET: api/<LoginController>
        [Authorize(Roles = "Manager")]
        [HttpGet]
        public List<UserDto> Get()
        {
            return service.GetAll().ToList();
        }

        // GET api/<LoginController>/5
        [HttpGet("{id}")]
        public UserDto Get(int id)
        {
            return service.GetById(id);
        }

        // POST api/<LoginController>
        [HttpPost]
        public void Post([FromBody] UserDto addUser)
        {
            service.AddItem(addUser);
        }


        // POST api/<LoginController>
        [HttpPost("/login")]
        public string Login([FromBody] UserLogin value)
        {
            var user = Authenticate(value);//פונקציה לאימות משתמש
            if (user != null)
            {
                var token = Generate(user);//פונקציה להחזרת ה token
                return token;
            }
            return "user not found";
        }
        //פונקציה פנימית שלא ניתן לגשת אליה ולכן היא private כי אין לנו מטרה לייצא אותה 
        //אם היא תהיה public התוכנית תיפול כי לא כתוב מעליה ]HTTPGET[...
       private string Generate(UserDto user)
        {
            //claim וגם איפה להצפין הוא אוביקט שגורם להצפנה
            //מכיל את מה שאני רוצה להצפין 
            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));//מקבל את המפתח להצפנה מקובץ ה appsetting
            var credentials = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);//=HmacSha256 צורות להצפנת האלגוריתם
            var claims = new[] {
            new Claim(ClaimTypes.NameIdentifier,user.Name),//מה אני מצ]ינה
            new Claim(ClaimTypes.Email,user.Email),//איפה אני מצפינה
            new Claim(ClaimTypes.PostalCode,user.Password),
            new Claim(ClaimTypes.GivenName,user.Name)
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);//תאריך תפוגה של הtoken
            return new JwtSecurityTokenHandler().WriteToken(token);//שליחת ה token
        }

        private UserDto Authenticate(UserLogin value)
        {
            UserDto manager = service.GetAll().FirstOrDefault(x => x.Password == value.Password && x.Name == value.Name);
            if (manager != null)
                return manager;
            return null;
        }

        // PUT api/<LoginController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] UserDto updateUser)
        {
             service.UpdateItem(id,updateUser);
        }

        // DELETE api/<LoginController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            service.DeleteItem(id);
        }
    }
}
