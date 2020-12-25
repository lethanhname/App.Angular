using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NETCore.MailKit.Extensions;
using NETCore.MailKit.Infrastructure.Internal;
using App.CoreLib;
using App.CoreLib.EF.Context;
using App.CoreLib.EF.Data.Identity;
using App.WebAngular.IdentityServer;
using Microsoft.AspNetCore.Hosting;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;

namespace App.WebAngular.Extensions
{
    public static class ServiceCollectionExtensions
    {
        #region Mvc

        public static IServiceCollection AddAppMvc(this IServiceCollection services)
        {
            var mvcBuilder = services
                .AddMvc(o =>
                {
                    o.EnableEndpointRouting = false;
                })
                .AddRazorRuntimeCompilation()
                .AddMvcLocalization()
                .AddNewtonsoftJson();

            foreach (var module in ExtensionManager.Assemblies)
            {
                AddApplicationPart(mvcBuilder, module);
            }

            return services;
        }

        public static void AddApplicationPart(IMvcBuilder mvcBuilder, Assembly assembly)
        {
            var partFactory = ApplicationPartFactory.GetApplicationPartFactory(assembly);
            foreach (var part in partFactory.GetApplicationParts(assembly))
            {
                mvcBuilder.PartManager.ApplicationParts.Add(part);
            }

            var relatedAssemblies = RelatedAssemblyAttribute.GetRelatedAssemblies(assembly, throwOnError: false);
            foreach (var relatedAssembly in relatedAssemblies)
            {
                partFactory = ApplicationPartFactory.GetApplicationPartFactory(relatedAssembly);
                foreach (var part in partFactory.GetApplicationParts(relatedAssembly))
                {
                    mvcBuilder.PartManager.ApplicationParts.Add(part);
                }
            }
        }


        #endregion

        #region Identity

        public static IServiceCollection AddAppIdentity(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment env)
        {
            services.AddIdentity<AppUser, AppRole>()
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();

            // Identity options.
            services.Configure<IdentityOptions>(options =>
            {
                // Password settings.
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = false;
                // Lockout settings.
                options.Lockout.AllowedForNewUsers = true;
                options.Lockout.MaxFailedAccessAttempts = 3;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromDays(1);

                options.User.RequireUniqueEmail = true;
            });
            // if (env.IsDevelopment())
            // {
            //     services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
            //         .AddIdentityServerAuthentication(options =>
            //         {
            //             options.Authority = "https://appangular.azurewebsites.net/";
            //             options.RequireHttpsMetadata = false;
            //             options.ApiName = "WebAPI";
            //         });
            // }
            // else
            // {
                services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                    .AddIdentityServerAuthentication(options =>
                    {
                        options.Authority = "https://localhost:5001/";
                        options.RequireHttpsMetadata = false;
                        options.ApiName = "WebAPI";
                        options.ApiSecret = "webApiSecret";
                    });
                    services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                       builder
                            .AllowCredentials()
                            .WithOrigins("https://localhost:5001")
                            .SetIsOriginAllowedToAllowWildcardSubdomains()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });
            // }
            services.ConfigureApplicationCookie(options =>
            {
                options.LoginPath = $"/Security/Account/SignIn";
                options.LogoutPath = $"/Security/Account/SignOut";
                options.AccessDeniedPath = $"/Security/Account/AccessDenied";
                options.Events.OnRedirectToLogin = context =>
                {
                    if (context.Request.Path.StartsWithSegments("/api", StringComparison.OrdinalIgnoreCase) && context.Response.StatusCode == (int)HttpStatusCode.OK)
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        return Task.CompletedTask;
                    }

                    context.Response.Redirect(context.RedirectUri);
                    return Task.CompletedTask;
                };
                options.Events.OnRedirectToAccessDenied = context =>
                {
                    if (context.Request.Path.StartsWithSegments("/api", StringComparison.OrdinalIgnoreCase) && context.Response.StatusCode == (int)HttpStatusCode.OK)
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                        return Task.CompletedTask;
                    }

                    context.Response.Redirect(context.RedirectUri);
                    return Task.CompletedTask;
                };
            });

            services.AddIdentityServer(options =>
                 {
                     options.Events.RaiseErrorEvents = true;
                     options.Events.RaiseInformationEvents = true;
                     options.Events.RaiseFailureEvents = true;
                     options.Events.RaiseSuccessEvents = true;
                     options.Authentication.CookieLifetime = TimeSpan.FromMinutes(4);
                 })
                 .AddInMemoryIdentityResources(IdentityServerConfig.GetIdentityResources())
                 .AddInMemoryApiResources(IdentityServerConfig.GetApiResources())
                 .AddInMemoryApiScopes(IdentityServerConfig.GetApiScopes())
                 .AddInMemoryClients(IdentityServerConfig.GetClients())
                 .AddAspNetIdentity<AppUser>()
                 .AddProfileService<AppProfileService>()
                 .AddDeveloperSigningCredential(); // not recommended for production - you need to store your key material somewhere secure


            services.AddMailKit(config => config.UseMailKit(configuration.GetSection("Email").Get<MailKitOptions>()));

            return services;
        }


        #endregion

        public static Task HandleRemoteLoginFailure(RemoteFailureContext ctx)
        {
            ctx.Response.Redirect("/login");
            ctx.HandleResponse();
            return Task.CompletedTask;
        }
    }
}