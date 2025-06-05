using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dto
{
    public class UserLogin
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
