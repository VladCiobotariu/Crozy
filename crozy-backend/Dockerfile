# -------- Build Stage --------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the solution and restore as distinct layers
COPY *.sln ./
COPY Crozy.GraphQLApi/Crozy.GraphQLApi.csproj Crozy.GraphQLApi/
COPY Crozy.GraphQl/Crozy.GraphQL.csproj Crozy.GraphQL/
COPY Crozy.Domain/Crozy.Domain.csproj Crozy.Domain/
COPY Crozy.Infrastructure/Crozy.Infrastructure.csproj Crozy.Infrastructure/
COPY Crozy.Infrastructure.Application/Crozy.Infrastructure.Application.csproj Crozy.Infrastructure.Application/
COPY Crozy.Infrastructure.PostgreSQL/Crozy.Infrastructure.PostgreSQL.csproj Crozy.Infrastructure.PostgreSQL/
COPY Crozy.Messaging/Crozy.Messaging.csproj Crozy.Messaging/
COPY Crozy.Payments.Netopia/Crozy.Payments.Netopia.csproj Crozy.Payments.Netopia/

# (Optional) Add other dependent projects here similarly if needed

RUN dotnet restore Crozy.GraphQLApi/Crozy.GraphQLApi.csproj

# Copy everything else
COPY . .

# Publish the function app
RUN dotnet publish Crozy.GraphQLApi/Crozy.GraphQLApi.csproj -c Release -o /app/publish

# -------- Runtime Stage --------
FROM mcr.microsoft.com/azure-functions/dotnet-isolated:4-dotnet-isolated8.0
WORKDIR /home/site/wwwroot

# Copy published output
COPY --from=build /app/publish .

# Environment variables expected by Azure Functions
ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

EXPOSE 80