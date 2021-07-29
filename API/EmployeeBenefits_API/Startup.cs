using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeBenefits_API
{
    public class Startup
    {
        //For CORS
        readonly string BenefitsAllowOrigins = "_BenefitsAllowOrigins";

        internal static IConfiguration Configuration { get; private set; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                //How to Allow CORS & Specify Origin with .NET 5
                options.AddPolicy(BenefitsAllowOrigins,
                                  builder =>
                                  {
                                      builder.WithOrigins("http://localhost:4200")
                                                          .AllowAnyHeader()
                                                          .AllowAnyMethod();
                                  });
            });

            //Fix the CamelCasing that can occur to the JSON Results returned to Front End
            services.AddControllers()
                .AddJsonOptions(options =>
                        options.JsonSerializerOptions.PropertyNamingPolicy = null);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(BenefitsAllowOrigins);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
