using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.Marshalling;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class UserRepository : IRepository<User>
    {
        private readonly IContext context;
        public UserRepository(IContext context) => this.context = context;

        public async Task<User> AddItem(User item)
        {
            await context.Users.AddAsync(item);
            await context.Save();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            var user = GetById(id);
            context.Users.Remove(await user);
            await context.Save();
        }

        public async Task<List<User>> GetAll()
        {
            return await context.Users.ToListAsync();
        }
        public async Task<User> GetById(int id) =>
          await context.Users.FirstOrDefaultAsync(c => c.Id == id);


        public async Task UpdateItem(int id, User item)
        {
            var user =await context.Users
                .FirstOrDefaultAsync(c => c.Id == id);

            if (user == null)
                return;

            // עדכון שדות פשוטים
            user.Email = item.Email;
            user.Name = item.Name;
            user.Password = item.Password;
           await context.Save();
        }

    }
}
