//using Common.Dto;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.IdentityModel.Tokens;
//using Repository.Entities;
//using Service.Interfaces;
//using System.CodeDom.Compiler;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;

//// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

//namespace Smart_Match.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class LoginController : ControllerBase
//    {
//        private readonly IService<UserDto> service;
//        private readonly IConfiguration _config;

//        public LoginController(IService<UserDto> service, IConfiguration config)
//        {
//            this.service = service;
//            _config = config;
//        }
//        // GET: api/<LoginController>
//        // [Authorize(Roles = "Manager")]
//        [HttpGet]
//        public async Task<List<UserDto>> Get()
//        {
//            return await service.GetAll();

//        }

//        // GET api/<LoginController>/5
//        [HttpGet("{id}")]
//        public async Task<UserDto> Get(int id)
//        {
//            return await service.GetById(id);
//        }

//        // POST api/<LoginController>
//        [HttpPost]
//        public async Task Post([FromBody] UserDto addUser)
//        {
//            await service.AddItem(addUser);
//        }


//        // POST api/<LoginController>
//        [HttpPost("login")]
//        public async Task<IActionResult> Login([FromBody] UserLogin value)
//        {
//            var user = await Authenticate(value);
//            if (user != null)
//            {
//                var token = Generate(user);
//                return Ok(token); // מחזיר טוקן תקין עם סטטוס 200
//            }
//            return Unauthorized("שם משתמש או סיסמה שגויים"); // מחזיר סטטוס 401
//        }


//        //פונקציה פנימית שלא ניתן לגשת אליה ולכן היא private כי אין לנו מטרה לייצא אותה 
//        //אם היא תהיה public התוכנית תיפול כי לא כתוב מעליה ]HTTPGET[...
//        private string Generate(UserDto user)
//        {
//            //claim וגם איפה להצפין הוא אוביקט שגורם להצפנה
//            //מכיל את מה שאני רוצה להצפין 
//            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));//מקבל את המפתח להצפנה מקובץ ה appsetting
//            var credentials = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);//=HmacSha256 צורות להצפנת האלגוריתם
//            var claims = new[] {
//            new Claim(ClaimTypes.NameIdentifier,user.Name),//מה אני מצפינה
//            new Claim(ClaimTypes.Email,user.Email),//איפה אני מצפינה
//            new Claim(ClaimTypes.PostalCode,user.Password),
//            new Claim(ClaimTypes.GivenName,user.Name),
//            new Claim(ClaimTypes.Role, user.Role)
//            };
//            var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Audience"],
//                claims,
//                expires: DateTime.Now.AddHours(1),
//                signingCredentials: credentials);//תאריך תפוגה של הtoken
//            return new JwtSecurityTokenHandler().WriteToken(token);//שליחת ה token
//        }

//        private async Task<UserDto> Authenticate(UserLogin value)
//        {
//            var users = await service.GetAll(); // מניח שזה Task<List<UserDto>>
//            return users.FirstOrDefault(x =>
//     x.Password == value.Password &&
//     x.Name == value.Name &&
//     x.Role.Equals(value.Role, StringComparison.OrdinalIgnoreCase));

//        }



//        // PUT api/<LoginController>/5
//        [HttpPut("{id}")]
//        public async Task Put(int id, [FromBody] UserDto updateUser)
//        {
//            await service.UpdateItem(id, updateUser);
//        }

//        // DELETE api/<LoginController>/5
//        [HttpDelete("{id}")]
//        public async Task Delete(int id)
//        {
//            await service.DeleteItem(id);
//        }
//    }
//}

using Common.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Repository.Entities;
using Service.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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

        [HttpGet]
        public async Task<List<UserDto>> Get()
        {
            return await service.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<UserDto> Get(int id)
        {
            return await service.GetById(id);
        }

        [HttpPost]
        public async Task Post([FromBody] UserDto addUser)
        {
            await service.AddItem(addUser);
        }

        // ✅ LOGIN
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLogin value)
        {
            var user = await Authenticate(value);
            if (user != null)
            {
                var token = Generate(user);
                return Ok(token); // מחזיר טוקן תקין
            }
            return Unauthorized("שם משתמש או סיסמה שגויים");
        }

        // ✅ יצירת JWT עם Claim תקין לתפקיד
        private string Generate(UserDto user)
        {
            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Name),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.PostalCode, user.Password),
                new Claim(ClaimTypes.GivenName, user.Name),
                new Claim(ClaimTypes.Role, user.Role.ToString()) // ✅ הכי חשוב!
            };

            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // אימות משתמש
        private async Task<UserDto> Authenticate(UserLogin value)
        {
            var users = await service.GetAll();
            return users.FirstOrDefault(x =>
                x.Password == value.Password &&
                x.Name == value.Name &&
                x.Role.Equals(value.Role, StringComparison.OrdinalIgnoreCase));
        }

        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] UserDto updateUser)
        {
            await service.UpdateItem(id, updateUser);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await service.DeleteItem(id);
        }
    }
}
