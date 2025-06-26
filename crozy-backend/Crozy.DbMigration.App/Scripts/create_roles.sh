env=local
pwd=azuBIok32
usr=postgres
dbname=crozy-$env
host=localhost

#docker run --name $dbname -e POSTGRES_PASSWORD=$pwd -d -p 5432:5432 $usr

ro_role="crozy_${env}_ro"
rw_role="crozy_${env}_rw"
ddl_role="crozy_${env}_ddl"

crozy_app_usr="crozy_app_${env}_usr"
crozy_app_usr_pwd="aZuL-0-We"

crozy_migration_usr="crozy_migration_${env}_usr"
crozy_migration_usr_pwd="oSyX-ATUL-329"

echo "Creating Read-Only role: $ro_role"
export PGPASSWORD=$pwd; psql -h $host -d $dbname -U $usr -c "create role \"$ro_role\""

echo "Creating Read-Write role: $rw_role"
export PGPASSWORD=$pwd; psql -h $host -d $dbname -U $usr -c "create role \"$rw_role\""

echo "Creating DDL role: $ddl_role"
export PGPASSWORD=$pwd; psql -h $host -d $dbname -U $usr -c "create role \"$ddl_role\""

echo "Creating Application user: $crozy_app_usr"
export PGPASSWORD=$pwd; psql -h $host -d $dbname -U $usr -c "create role \"$crozy_app_usr\" with login password '${crozy_app_usr_pwd}' in role ${rw_role}"

echo "Creating Migration user: ${crozy_migration_usr}"
export PGPASSWORD=$pwd; psql -h $host -d $dbname -U $usr -c "create role \"$crozy_migration_usr\" with login password '${crozy_migration_usr_pwd}' in role ${ddl_role}"

echo "All roles created successfuly"

