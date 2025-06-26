@description('Location for all resources.')
param location string = resourceGroup().location

@description('Image tag if container does not exist yet(i.e first deployment)')
param imageTagIfFirstDeployment string = 'latest'

@allowed(['seller-app', 'shop-app'])
param systemComponentName string

param env string

@description('Container app name.')
param appName string

param currentTime string = utcNow()

resource identity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = {
  name: 'id-acr-get-image-tag-${systemComponentName}-${env}'
  location: location
}

resource readerRoleDefinition 'Microsoft.Authorization/roleDefinitions@2018-01-01-preview' existing = {
  scope: subscription()
  // This is the Reader role, which is the minimum role permission we can give. See https://docs.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#:~:text=acdd72a7-3385-48ef-bd42-f606fba81ae7
  name: 'acdd72a7-3385-48ef-bd42-f606fba81ae7'
}

resource roleAssignment 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = {
  scope: resourceGroup()
  name: guid(resourceGroup().id, identity.id, readerRoleDefinition.id)
  properties: {
    roleDefinitionId: readerRoleDefinition.id
    principalId: identity.properties.principalId
    principalType: 'ServicePrincipal'
  }
}

resource deploymentScript 'Microsoft.Resources/deploymentScripts@2023-08-01' = {
  name: 'get-image-tag-${systemComponentName}-${env}'
  location: location
  kind: 'AzurePowerShell'
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${identity.id}': {}
    }
  }
  properties: {
    azPowerShellVersion: '9.7'
    environmentVariables: [
      {
        name: 'appName'
        value: appName
      }
      {
        name: 'resourceGroupName'
        value: resourceGroup().name
      }
      {
        name: 'imageTagFirstDeployment'
        value: imageTagIfFirstDeployment
      }
    ]
    scriptContent: '''
      Write-Host "Installing Azure Container Apps Powershell module..."
      Install-Module -Name Az.App -Force
    
      Write-Host "Checking container app '$env:appName' in resource group '$env:resourceGroupName' for active revision..."
      try {
        $containerAppRevision = Get-AzContainerAppRevision -ResourceGroupName $env:resourceGroupName -ContainerAppName $env:appName
        $image = $containerAppRevision.TemplateContainer.Image
        $version = $image.Split(":")[-1]
        Write-Host "Found image: $image with tag: $version"
        $DeploymentScriptOutputs = @{}
        $DeploymentScriptOutputs['tag'] = $version
      } catch {
        Write-Host "Failed to get active revision. Error:"
        Write-Host $_
        Write-Host "No active revision found. Is this the first deployment? Using '$env:imageTagFirstDeployment' as tag."
        $DeploymentScriptOutputs['tag'] = $env:imageTagFirstDeployment
      }
    '''
    cleanupPreference: 'Always'
    retentionInterval: 'PT1H'
    forceUpdateTag: currentTime
  }
}

output currentImageTag string = deploymentScript.properties.outputs.tag
