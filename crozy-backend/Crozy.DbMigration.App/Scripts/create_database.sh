env=local2
pwd=azuBIok32
usr=postgres
dbname=crozy-$env
host=localhost

export PGPASSWORD=$pwd; psql -h $host -U $usr -c "create database \"${dbname}\""
