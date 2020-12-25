using System.Reflection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using App.CoreLib.EF.Context;
using App.CoreLib.EF.Extensions;

namespace App.WebAngular
{
    public class MigrationAppDbContextFactory : DesignTimeStorageContextFactoryBase
    {
        
        public override void AddDatabase(IServiceCollection services, IConfiguration configuration)
        {
            services.AddSqlServer(new StorageContextOptions
            {
                ConnectionString = configuration.GetConnectionString("DefaultConnection"),
                MigrationsAssembly = typeof(MigrationAppDbContextFactory).GetTypeInfo().Assembly.FullName
            });
        }
    }
}