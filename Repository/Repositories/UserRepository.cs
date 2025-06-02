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
    public class UserRepository:IRepository<User>
    {
        private readonly IContext context;
        public UserRepository(IContext context) => this.context = context;

        public User AddItem(User item)
        {
            context.Users.Add(item);
            context.Save();
            return item;
        }

        public void DeleteItem(int id)
        {
            var user = GetById(id);
            context.Users.Remove(user);
            context.Save();
        }

        public List<User> GetAll()
        {
            return context.Users.ToList();
        }
        public User GetById(int id) =>
            context.Users.FirstOrDefault(c => c.Id == id);


        public void UpdateItem(int id, User item)
        {
            var user = context.Users
                .FirstOrDefault(c => c.Id == id);

            if (user == null)
                return;

            // עדכון שדות פשוטים
            user.Email = item.Email;
            user.Name = item.Name;
            user.Password = item.Password;
            context.Save();
        }

    }
}
