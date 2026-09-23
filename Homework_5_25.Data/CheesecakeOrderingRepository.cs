using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework_5_25.Data
{
    public class CheesecakeOrderingRepository
    {
        private readonly string _connectionString;

        public CheesecakeOrderingRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Order> GetOrders()
        {
            using var context = new CheesecakeOrderingDataContext(_connectionString);
            return context.Orders.ToList();
        }

        public void AddOrder(Order order)
        {
            using var context = new CheesecakeOrderingDataContext(_connectionString);
            context.Orders.Add(order);
            context.SaveChanges();
        }

        public Order GetOrderById(int id)
        {
            using var context = new CheesecakeOrderingDataContext(_connectionString);
            return context.Orders.FirstOrDefault(o => o.Id == id);
        }
    }
}
