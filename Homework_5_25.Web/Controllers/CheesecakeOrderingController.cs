using Homework_5_25.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Homework_5_25.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheesecakeOrderingController : ControllerBase
    {
        private readonly string _connectionString;

        public CheesecakeOrderingController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getorders")]
        public List<Order> GetOrders()
        {
            var repo = new CheesecakeOrderingRepository(_connectionString);
            return repo.GetOrders();
        }

        [HttpPost]
        [Route("add")]
        public void AddOrder(Order order)
        {
            var repo = new CheesecakeOrderingRepository(_connectionString);
            repo.AddOrder(order);
        }

        [HttpGet]
        [Route("getorderbyid")]
        public Order GetOrderById(int id)
        {
            var repo = new CheesecakeOrderingRepository(_connectionString);
            return repo.GetOrderById(id);
        }
    }
}
