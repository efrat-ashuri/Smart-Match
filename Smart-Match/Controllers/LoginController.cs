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

 
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLogin value)
        {
            var user = await Authenticate(value);
            if (user != null)
            {
                var token = Generate(user);
                return Ok(token); 
            }
            return Unauthorized("שם משתמש או סיסמה שגויים");
        }

        
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
                new Claim(ClaimTypes.Role, user.Role.ToString()) 
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
