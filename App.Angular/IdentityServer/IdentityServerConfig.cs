using System.Collections.Generic;
using IdentityServer4;
using IdentityServer4.Models;
using App.CoreLib;

namespace App.WebAngular.IdentityServer
{
    public static class IdentityServerConfig
    {
        // Identity resources (used by UserInfo endpoint).
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email(),
                new IdentityResource("names", new List<string> { "given_name" })
            };
        }

        // Api resources.
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource
                {
                    Name = "WebAPI",
                    DisplayName = "API #1",
                    Description = "Allow the application to access API #1 on your behalf",
                    Scopes = new List<string> {"webapi"},
                    ApiSecrets = new List<Secret> {new Secret("webApiSecret".Sha256())},
                    UserClaims = { "role" }
                }
            };
        }

        public static IEnumerable<ApiScope> GetApiScopes()
        {
            return new[]
            {
                new ApiScope("WebAPI", "Read Access to API #1"),
            };
        }
        // Clients want to access resources.
        public static IEnumerable<Client> GetClients()
        {
            // Clients credentials.
            return new List<Client>
            {
                // http://docs.identityserver.io/en/release/reference/client.html.
                // new Client
                // {
                //     ClientId = "AngularSPA",
                //     AllowedGrantTypes = GrantTypes.ResourceOwnerPassword, // Resource Owner Password Credential grant.
                //     AllowAccessTokensViaBrowser = true,
                //     RequireClientSecret = false, // This client does not need a secret to request tokens from the token endpoint.

                //     AccessTokenLifetime = 900, // Lifetime of access token in seconds.

                //     AllowedScopes = {
                //         IdentityServerConstants.StandardScopes.OpenId, // For UserInfo endpoint.
                //         IdentityServerConstants.StandardScopes.Profile,
                //         "roles",
                //         "WebAPI"
                //     },
                //     AllowOfflineAccess = true, // For refresh token.
                //     RefreshTokenUsage = TokenUsage.OneTimeOnly,
                //     AbsoluteRefreshTokenLifetime = 7200,
                //     SlidingRefreshTokenLifetime = 900,
                //     RefreshTokenExpiration = TokenExpiration.Sliding
                // }
                new Client {
                 ClientId = "AngularSPA",
                 ClientName = "Angular SPA",
                 AllowedGrantTypes = GrantTypes.Implicit,
                 AllowedScopes = { "openid", "profile", "email", "names", "WebAPI" },
                 RedirectUris = {
                    $"{Globals.ServerPath}/auth-callback",
                    $"{Globals.ServerPath}/assets/silent-refresh.html"
                 },
                 PostLogoutRedirectUris = {$"{Globals.ServerPath}/signout-callback"},
                 AllowedCorsOrigins = {$"{Globals.ServerPath}"},
                 AllowAccessTokensViaBrowser = true,
                 AccessTokenLifetime = 3600,
                //  AccessTokenLifetime = 60,
                 AllowOfflineAccess = true,
                 AlwaysIncludeUserClaimsInIdToken = true
                }
            };
        }
    }
}