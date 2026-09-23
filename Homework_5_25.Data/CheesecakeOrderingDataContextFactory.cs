using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework_5_25.Data;

public class CheesecakeOrderingDataContextFactory : IDesignTimeDbContextFactory<CheesecakeOrderingDataContext>
{
    public CheesecakeOrderingDataContext CreateDbContext(string[] args)
    {
        var config = new ConfigurationBuilder()
           .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), 
           $"..{Path.DirectorySeparatorChar}Homework_5_25.Web"))
           .AddJsonFile("appsettings.json")
           .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

        return new CheesecakeOrderingDataContext(config.GetConnectionString("ConStr"));
    }
}