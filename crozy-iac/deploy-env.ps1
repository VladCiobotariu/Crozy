# usage: dev (for rg-crozy-dev resource group), ts1 (for rg-crozy-ts1 resource group)
$env = "dev"
# usage: "Crozy Subscription Non-PROD" or "Crozy Subscription PROD"
$subscriptionName = "Crozy Subscription PROD"

Write-Output "Selected subscription '$subscriptionName'"

az account set --subscription $subscriptionName

$deploymentARM = az deployment sub create --template-file main.bicep --location WestEurope --parameters ./main-$env.bicepparam | ConvertFrom-Json

Write-Output "Bicep deployment output:" 
Write-Output $deploymentARM

$graphQlApiPrincipalId = $deploymentARM.properties.outputs.graphQlApiPrincipalId.value

Write-Output "graphQlApiPrincipalId $graphQlApiPrincipalId"

$upperEnv = $env.ToUpper()
$crozyDBRoGroupName = "Crozy-DB-$upperEnv-RO"
$crozyDBRwGroupName = "Crozy-DB-$upperEnv-RW"
$crozyDBDdlGroupName = "Crozy-DB-$upperEnv-DDL"

az ad group create --display-name $crozyDBRoGroupName --mail-nickname $crozyDBRoGroupName
az ad group create --display-name $crozyDBRwGroupName --mail-nickname $crozyDBRwGroupName
az ad group create --display-name $crozyDBDdlGroupName --mail-nickname $crozyDBDdlGroupName

$isMember = az ad group member check --group $crozyDBRwGroupName --member-id $graphQlApiPrincipalId | ConvertFrom-Json
if (!$isMember.value) {
    az ad group member add --group $crozyDBRwGroupName --member-id $graphQlApiPrincipalId
}
