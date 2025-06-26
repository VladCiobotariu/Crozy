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
crozy_migration_usr="crozy_migration_${env}_usr"

echo "Droping Crozy App user: $crozy_app_usr"
export PGPASSWORD=$pwd; psql -h $host -d $dbname -U $usr -c "revoke ${rw_role} from \"$crozy_app_usr\""
export PGPASSWORD=$pwd; psql -h $host -d $dbname -U $usr -c "drop role \"$crozy_app_usr\""

echo "Droping Crozy App user: $crozy_migration_usr"
export PGPASSWORD=$pwd; psql -h $host -d $dbname -U $usr -c "revoke ${ddl_role} from \"${crozy_migration_usr}\""
export PGPASSWORD=$pwd; psql -h $host -d $dbname -U $usr -c "drop role \"$crozy_migration_usr\""

echo "Droping Read-Only role: $ro_role"
export PGPASSWORD=$pwd; psql -h $host -d $dbname -U $usr -c "revoke all privileges on schema \"public\" from \"$ro_role\""
export PGPASSWORD=$pwd; psql -h $host -d $dbname -U $usr -c "drop role \"$ro_role\""

echo "Droping Read-Write role: $rw_role"
export PGPASSWORD=$pwd; psql -h $host -d $dbname -U $usr -c "revoke all privileges on schema \"public\" from \"$rw_role\""
export PGPASSWORD=$pwd; psql -h $host -d $dbname -U $usr -c "drop role \"$rw_role\""

echo "Droping Read-Write role: $ddl_role"
export PGPASSWORD=$pwd; psql -h $host -d $dbname -U $usr -c "revoke all privileges on schema \"public\" from \"$ddl_role\""
export PGPASSWORD=$pwd; psql -h $host -d $dbname -U $usr -c "drop role \"$ddl_role\""

echo "All roles droped successfuly"
