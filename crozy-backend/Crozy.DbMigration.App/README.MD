# Local installation
## Step 1: Install PgAdmin and psql command line tool
Run in `cmd/powershell` command:
```powershell
choco install postgresql16 --ia '--enable-components commandlinetools,pgAdmin'
```

## Step 2: Run PostgreSQL locally in docker
```bash
docker run --name crozy-local -e POSTGRES_PASSWORD=azuBIok32 -d -p 5432:5432 postgres
```
 
### Step 3: Create Database
Run in `Crozy.DbMigration.App` project. Make sure `"action"` in `config.json` is set to `create-database`, like this: `"action": "create-database",`. It will create new DB, roles and run migrations.

### Step 4: connect to local DB
Open DBeaver or pgAdmin and enter connection details:
* Host: localhost
* User: postgres
* password: azuBIok32
* Database: crozy-local

This should be enough to connect to DB.


# Database migrations
## Add new migration
To add new migration run in Package Manager Console:

```PowerShell
Add-Migration <Your Migration Name> -Project Crozy.DbMigrations -StartupProject Crozy.DbMigration.App
```

or in bash/cmd run from __root folder__ of repository (make sure .NET Core CLI tools are installed: https://learn.microsoft.com/en-us/ef/core/cli/dotnet)
```bash
dotnet ef migrations add <Your Migration Name> --project ./Crozy.DbMigrations --startup-project ./Crozy.DbMigration.App
```
## Update database
Database can be updated using standard commands `Update-Database` or using `Crozy.DbMigration.App`. 

__WARNING:__ `Update-Database` will not run additional scripts which grant access to tables in `public` schema for `crozy_app_local_usr` which is used to access database by application. It means every time a new table is added, `Crozy.DbMigration.App` needs to be run to grant required access.

### Update Database using `Update-Database` commands
To update database run Package Manager Console:
```
Update-Database -Project Crozy.DbMigrations -StartupProject Crozy.DbMigration.App
```

or in bash/cmd
```bash
dotnet ef database update --project ./Crozy.DbMigrations --startup-project ./Crozy.DbMigration.App

```

### Update Database using `Crozy.DbMigration.App` application

Configure desired action in `config.json` and run `Crozy.DbMigration.App` project.

Possible actions are:
* create-database - create database if needed, roles and runs migrations. This is should cover most of the cases.
* migrate - just runs migrations and grants access to roles.
* drop-database - drops database and roles associated with it.

Multiple local environment can be configured using `AppEnvironment` parameter in config. 
Default value is `local`. Environment name is used in database name, roles names and user names.


# Checks

[Microsoft documentation how to grant access to Entra users](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/how-to-manage-azure-ad-users)

### User is member of a role

```sql
select exists(
  select b.rolname rname,
         c.rolname mname 
  from pg_auth_members a, 
       pg_roles b, 
       pg_roles c  
  where a.roleid=b.oid 
    and a.member = c.oid 
    and b.rolname = 'crozy_prod_rw' 
    and c.rolname = 'Crozy-DB-PROD-RW');
```

### Update Azure Object ID of group for existing user
```sql
SECURITY LABEL 
FOR "pgaadauth" 
ON ROLE "Crozy-DB-DEV-DDL" 
IS 'aadauth,oid=<azure_object_id>,type=group';
```

