$token=az account get-access-token --resource-type oss-rdbms | ConvertFrom-Json
$env:PGPASSWORD=$token.accessToken
$token.accessToken