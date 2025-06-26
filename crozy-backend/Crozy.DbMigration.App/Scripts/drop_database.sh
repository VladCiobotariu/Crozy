env=local
pwd=azuBIok32
usr=postgres
dbname=crozy-$env
host=localhost

export PGPASSWORD=$pwd; psql -h $host -U $usr -c "drop database \"${dbname}\""
