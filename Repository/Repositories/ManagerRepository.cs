using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Repositories;

public class ManagerRepository : IRepository<Manager>
{
    private readonly IContext context;
    public ManagerRepository(IContext context) => this.context = context;

    public Manager AddItem(Manager item)
    {
        context.Managers.Add(item);
        context.Save();
        return item;
    }

    public void DeleteItem(int id)
    {
        var manager = GetById(id);
        context.Managers.Remove(manager);
        context.Save();
    }

    public List<Manager> GetAll() =>
        context.Managers
            .Include(m => m.Jobs)   
             
            .ToList();

    public Manager GetById(int id) =>
        context.Managers
            .Include(m => m.Jobs)  
            .FirstOrDefault(m => m.ManagerId == id);

    public void UpdateItem(int id, Manager item)
    {
        var manager = GetById(id);
        if (manager == null) return;
        manager.Name = item.Name;
        manager.Email = item.Email;
        manager.Password = item.Password;
        // עדכון קשרים אם צריך
        context.Save();
    }
}
