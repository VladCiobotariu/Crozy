env=local
pwd=azuBIok32
usr=postgres
dbname=crozy-$env
host=localhost

ro_role="crozy_${env}_ro"
rw_role="crozy_${env}_rw"
ddl_role="crozy_${env}_ddl"

crozy_app_usr="crozy_app_${env}_usr"

crozy_migration_usr="crozy_migration_${env}_usr"

echo "Granting priviledges to role: $ro_role"
export PGPASSWORD=$pwd; psql -h $host -d $dbname -U $usr -c "grant select on all tables in schema \"public\" to \"$ro_role\""

echo "Granting priviledges to role: $rw_role"
export PGPASSWORD=$pwd; psql -h $host -d $dbname -U $usr -c "grant select,insert,delete,update on all tables in schema \"public\" to \"$rw_role\""
export PGPASSWORD=$pwd; psql -h $host -d $dbname -U $usr -c "grant usage,select,update on all sequences in schema \"public\" to \"$rw_role\""

echo "Granting priviledges to role: $ddl_role"
export PGPASSWORD=$pwd; psql -h $host -d $dbname -U $usr -c "grant create on schema \"public\" to \"$ddl_role\""
