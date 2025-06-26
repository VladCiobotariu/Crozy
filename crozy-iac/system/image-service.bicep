param env string

@description('Storage Account type')
@allowed([
  'Standard_LRS'
  'Standard_GRS'
  'Standard_RAGRS'
])
param storageAccountType string = 'Standard_LRS'

@description('Location for all resources.')
param location string = resourceGroup().location

@description('Application Insights Instrumentation Key')
param applicationInsightsInstrumentationKey string

@description('Custom domain name of Images endpoint')
param customFQDN string

var systemName = 'crozy'
var systemComponentName = 'images'
var sharedName = '${systemName}-${systemComponentName}-${env}'
var functionAppName = 'fa-${sharedName}'
var hostingPlanName = 'app-${sharedName}'
var storageAccountName = 'st${systemName}azfunc${systemComponentName}${env}'
var imageStorageAccountName = 'st${systemName}storage${systemComponentName}${env}'
var cdnProfileName = 'cdnp-${systemName}-${env}'
var cdnEndpointName = 'cdne-${systemName}-fa-${systemComponentName}-${env}'

resource imageStorageAccount 'Microsoft.Storage/storageAccounts@2023-04-01' = {
  name: imageStorageAccountName
  location: location
  sku: {
    name: storageAccountType
  }
  kind: 'StorageV2'
}

resource imageStorageAccountBlobServices 'Microsoft.Storage/storageAccounts/blobServices@2023-04-01' = {
  parent: imageStorageAccount
  name: 'default'
}

resource storageAccountName_default_containerName 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-04-01' = {
  parent: imageStorageAccountBlobServices
  name: 'images'
}

resource blobDataReaderRoleDefinition 'Microsoft.Authorization/roleDefinitions@2022-05-01-preview' existing = {
  scope: subscription()
  // This is the Storage Account Contributor role, which is the minimum role permission we can give. See https://docs.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#:~:text=17d1049b-9a84-46fb-8f53-869881c3d3ab
  name: '2a2b9908-6ea1-4ae2-8e65-a410df84e7d1'
}

var imageBlobStorageConnectionString = 'DefaultEndpointsProtocol=https;AccountName=${imageStorageAccount.name};EndpointSuffix=${environment().suffixes.storage};AccountKey=${imageStorageAccount.listKeys().keys[0].value}'

resource storageAccount 'Microsoft.Storage/storageAccounts@2021-08-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: storageAccountType
  }
  kind: 'StorageV2'
}

resource hostingPlan 'Microsoft.Web/serverfarms@2023-12-01' = {
  name: hostingPlanName
  location: location
  sku: {
    name: 'Y1'
    tier: 'Dynamic'
    size: 'Y1'
    family: 'Y'
    capacity: 0
  }
  properties: {
    reserved: true
  }
}

resource functionApp 'Microsoft.Web/sites@2023-12-01' = {
  name: functionAppName
  location: location
  kind: 'functionapp,linux'
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    reserved: true
    serverFarmId: hostingPlan.id
    siteConfig: {
      linuxFxVersion: 'node|20'
      ftpsState: 'FtpsOnly'
      minTlsVersion: '1.2'
    }
    httpsOnly: true
  }
}

module appSettings 'appsettings.bicep' = {
  name: '${functionApp.name}-appsettings'
  params: {
    webAppName: functionApp.name
    // Get the current appsettings
    currentAppSettings: list(resourceId('Microsoft.Web/sites/config', functionApp.name, 'appsettings'), '2022-03-01').properties
    appSettings: {
      AzureWebJobsStorage: 'DefaultEndpointsProtocol=https;AccountName=${storageAccountName};EndpointSuffix=${environment().suffixes.storage};AccountKey=${storageAccount.listKeys().keys[0].value}'
      WEBSITE_CONTENTAZUREFILECONNECTIONSTRING: 'DefaultEndpointsProtocol=https;AccountName=${storageAccountName};EndpointSuffix=${environment().suffixes.storage};AccountKey=${storageAccount.listKeys().keys[0].value}'
      WEBSITE_CONTENTSHARE: toLower(functionAppName)
      FUNCTIONS_EXTENSION_VERSION: '~4'
      APPINSIGHTS_INSTRUMENTATIONKEY: applicationInsightsInstrumentationKey
      FUNCTIONS_WORKER_RUNTIME: 'node'
      AZURE_STORAGE_CONNECTION_STRING: imageBlobStorageConnectionString
    }
  }
}

resource corsConfig 'Microsoft.Web/sites/config@2023-12-01' = {
  parent: functionApp
  name: 'web'
  properties: {
    cors: {
      allowedOrigins: [
        '*'
      ]
    }
  }
}

resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: imageStorageAccount
  name: guid(resourceGroup().id, functionApp.id, blobDataReaderRoleDefinition.id, imageStorageAccount.id)
  properties: {
    roleDefinitionId: blobDataReaderRoleDefinition.id
    principalId: functionApp.identity.principalId
    principalType: 'ServicePrincipal'
  }
}

resource profile 'Microsoft.Cdn/profiles@2024-02-01' = {
  name: cdnProfileName
  location: location
  tags: {
    displayName: cdnProfileName
  }
  sku: {
    name: 'Standard_Microsoft'
  }
  properties: {}
}

resource endpoint 'Microsoft.Cdn/profiles/endpoints@2024-02-01' = {
  parent: profile
  name: cdnEndpointName
  location: location
  tags: {
    displayName: cdnEndpointName
  }
  properties: {
    originPath: '/api/image/'
    originHostHeader: functionApp.properties.hostNames[0]
    isHttpAllowed: false
    isHttpsAllowed: true
    queryStringCachingBehavior: 'UseQueryString'
    contentTypesToCompress: [
      'application/eot'
      'application/font'
      'application/font-sfnt'
      'application/javascript'
      'application/json'
      'application/opentype'
      'application/otf'
      'application/pkcs7-mime'
      'application/truetype'
      'application/ttf'
      'application/vnd.ms-fontobject'
      'application/xhtml+xml'
      'application/xml'
      'application/xml+rss'
      'application/x-font-opentype'
      'application/x-font-truetype'
      'application/x-font-ttf'
      'application/x-httpd-cgi'
      'application/x-javascript'
      'application/x-mpegurl'
      'application/x-opentype'
      'application/x-otf'
      'application/x-perl'
      'application/x-ttf'
      'font/eot'
      'font/ttf'
      'font/otf'
      'font/opentype'
      'image/svg+xml'
      'text/css'
      'text/csv'
      'text/html'
      'text/javascript'
      'text/js'
      'text/plain'
      'text/richtext'
      'text/tab-separated-values'
      'text/xml'
      'text/x-script'
      'text/x-component'
      'text/x-java-source'
    ]
    isCompressionEnabled: true
    originGroups: []
    origins: [
      {
        name: 'origin1'
        properties: {
          hostName: functionApp.properties.hostNames[0]
        }
      }
    ]
  }
}

resource customDomain 'Microsoft.Cdn/profiles/customDomains@2024-02-01' = if (customFQDN != '') {
  name: 'customDomain-${systemName}-${env}'
  parent: profile
  properties: {
    hostName: customFQDN
  }
}

output imageStorageAccountName string = imageStorageAccount.name
output imagesEndpoint string = 'https://${customFQDN == '' ? endpoint.properties.hostName : customFQDN}/'
output imageStorageServiceUri string = imageStorageAccount.properties.primaryEndpoints.blob
