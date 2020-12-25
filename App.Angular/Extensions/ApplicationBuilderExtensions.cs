using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
namespace App.WebAngular.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseAppIdentity(this IApplicationBuilder app)
        {
            app.UseCors("AllowAllOrigins");
            app.UseIdentityServer();
            app.UseWhen(
                context => context.Request.Path.StartsWithSegments("/api", StringComparison.OrdinalIgnoreCase),
                a => a.Use(async (context, next) =>
                {
                    if (!context.User.Identity.IsAuthenticated) {
                        var principal = new ClaimsPrincipal();

                        var bearerAuthResult = await context.AuthenticateAsync(JwtBearerDefaults.AuthenticationScheme);
                        if (bearerAuthResult?.Principal != null)
                        {
                            principal.AddIdentities(bearerAuthResult.Principal.Identities);
                        }

                        context.User = principal;
                    }

                    await next();
                }));

            app.UseAuthorization();
            return app;
        }
        
        public static IApplicationBuilder UseAppStaticFiles(this IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseStaticFiles(new StaticFileOptions
                {
                    OnPrepareResponse = (context) =>
                    {
                        var headers = context.Context.Response.GetTypedHeaders();
                        headers.CacheControl = new CacheControlHeaderValue
                        {
                            NoCache = true,
                            NoStore = true,
                            MaxAge = TimeSpan.FromDays(-1)
                        };
                    }
                });
            }
            else
            {
                app.UseStaticFiles(new StaticFileOptions
                {
                    OnPrepareResponse = (context) =>
                    {
                        var headers = context.Context.Response.GetTypedHeaders();
                        headers.CacheControl = new CacheControlHeaderValue
                        {
                            Public = true,
                            MaxAge = TimeSpan.FromDays(60)
                        };
                    }
                });
            }

            return app;
        }
    }
}