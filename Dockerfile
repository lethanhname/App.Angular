FROM mcr.microsoft.com/dotnet/core/sdk AS build
WORKDIR /var/www/aspnetcoreapp


# install NodeJS 14.x
# see https://github.com/nodesource/distributions/blob/master/README.md#deb
RUN apt-get update -yq 
RUN apt-get install curl gnupg -yq 
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# copy csproj and restore as distinct layers
# COPY ["./App.Angular/App.Angular.csproj", "./"]
COPY ./ ./
RUN dotnet nuget add source "https://nuget.pkg.github.com/lethanhname/index.json" -n github -u "lethanhnam010490@gmail.com" -p "c904dd19c201e956d3700a63ee5daaced49d40aa" --store-password-in-clear-text
RUN dotnet restore

# build app
RUN dotnet publish "./App.Angular/App.Angular.csproj" -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet
ENV ASPNETCORE_URLS http://+:5000;https://+:5001
EXPOSE 5000
Expose 5001
WORKDIR /var/www/aspnetcoreapp
COPY --from=build /var/www/aspnetcoreapp/out ./
ENTRYPOINT ["dotnet", "App.Angular.dll"]