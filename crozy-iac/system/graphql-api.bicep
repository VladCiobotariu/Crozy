param env string
param systemName string
param systemComponentName string
param imageStorageAccountName string
param imageServiceUrl string
param imageStorageServiceUri string

param runInMemoryDB bool
param dbConnectionString string
param pingTimerFunction bool

param slackChannelName string

param azureAdB2cClientId string

param kvName string
param kvSubscribtionId string
param kvResourceGroupName string

param netopiaPrivateKeySecretName string
param netopiaSignatureSecretName string
param netopiaPublicKeySecretName string
param netopiaPaymentUri string
param netopiaReturnUri string

var slackTokenSecretName = 'slackToken-${env}'

param shopAppUrl string
param sellerAppUrl string
param backendCustomFQDN string

param sendersEmail string
param communicationServicesName string

param dbSeedEnabled bool

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

var sharedName = '${systemName}-${systemComponentName}-${env}'
var functionAppName = 'fa-${sharedName}'
var hostingPlanName = 'app-${sharedName}'
var storageAccountName = 'st${systemName}azfunc${systemComponentName}${env}'
var functionWorkerRuntime = 'dotnet-isolated'

var tags = {
  environment: env
  system: systemName
  systemComponent: systemComponentName
}

resource kv 'Microsoft.KeyVault/vaults@2023-02-01' existing = {
  name: kvName
  scope: resourceGroup(kvSubscribtionId, kvResourceGroupName)
}

resource communicationServices 'Microsoft.Communication/communicationServices@2023-03-31' existing = {
  name: communicationServicesName
}

resource storageAccount 'Microsoft.Storage/storageAccounts@2021-08-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: storageAccountType
  }
  kind: 'StorageV2'
}

resource hostingPlan 'Microsoft.Web/serverfarms@2022-09-01' = {
  name: hostingPlanName
  location: location
  sku: {
    name: 'Y1'
    tier: 'Dynamic'
    family: 'Y'
    capacity: 0
  }
  tags: tags
  kind: 'functionapp'
  properties: {
    perSiteScaling: false
    elasticScaleEnabled: false
    maximumElasticWorkerCount: 1
    isSpot: false
    reserved: true
    isXenon: false
    hyperV: false
    targetWorkerCount: 0
    targetWorkerSizeId: 0
    zoneRedundant: false
  }
}

resource functionApp 'Microsoft.Web/sites@2022-09-01' = {
  name: functionAppName
  location: location
  kind: 'functionapp,linux'
  identity: {
    type: 'SystemAssigned'
  }
  tags: tags
  properties: {
    enabled: true
    reserved: true
    isXenon: false
    hyperV: false
    vnetRouteAllEnabled: false
    vnetImagePullEnabled: false
    vnetContentShareEnabled: false
    serverFarmId: hostingPlan.id
    siteConfig: {
      numberOfWorkers: 1
      acrUseManagedIdentityCreds: false
      alwaysOn: false
      http20Enabled: false
      functionAppScaleLimit: 200
      minimumElasticInstanceCount: 0
      linuxFxVersion: 'DOTNET-ISOLATED|8.0'
      ftpsState: 'FtpsOnly'
      minTlsVersion: '1.2'
    }
    scmSiteAlsoStopped: false
    clientAffinityEnabled: false
    clientCertEnabled: false
    clientCertMode: 'Required'
    hostNamesDisabled: false
    containerSize: 0
    dailyMemoryTimeQuota: 0
    httpsOnly: true
    redundancyMode: 'None'
    storageAccountRequired: false
    keyVaultReferenceIdentity: 'SystemAssigned'
  }
}

// resource customHostName 'Microsoft.Web/sites/hostNameBindings@2022-09-01' = {
//   name: 'backendCustomHostName'
//   parent: functionApp
//   properties: {
//     azureResourceName: 'string'
//     azureResourceType: 'string'
//     customHostNameDnsRecordType: 'CName'
//     domainId: 'string'
//     hostNameType: 'string'
//     siteName: 'string'
//     sslState: 'string'
//     thumbprint: 'string'
//   }
// }

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
      WEBSITE_USE_PLACEHOLDER_DOTNETISOLATED: '1'
      APPINSIGHTS_INSTRUMENTATIONKEY: applicationInsightsInstrumentationKey
      FUNCTIONS_WORKER_RUNTIME: functionWorkerRuntime
      ImageStorage__ServiceUri: imageStorageServiceUri
      GraphQL__ImageServiceEndpoint: imageServiceUrl
      SLACK_TOKEN: '@Microsoft.KeyVault(VaultName=${kv.name};SecretName=${slackTokenSecretName})'
      SlackChannelName: slackChannelName
      AdminHostUrl: sellerAppUrl
      RunInMemoryDB: runInMemoryDB
      DbAuthMode: 'ManagedIdentity'
      AzureAdB2C__Instance: 'https://crozy.b2clogin.com'
      AzureAdB2C__ClientId: azureAdB2cClientId
      AzureAdB2C__Domain: 'crozy.onmicrosoft.com'
      AzureAdB2C__SignedOutCallbackPath: '/signout/B2C_1_susi'
      AzureAdB2C__SignUpSignInPolicyId: 'B2C_1_susi'
      AzureAdB2C__TenantId: 'common'
      PingTimerFunction: pingTimerFunction
      PingUri: 'https://${functionAppName}.azurewebsites.net/api/graphql?sdl'
      EmailService__Endpoint: 'https://${communicationServices.properties.hostName}/'
      EmailService__Credential__Key: communicationServices.listKeys().primaryKey
      SendersEmail: sendersEmail
      Netopia__PrivateKey: '@Microsoft.KeyVault(VaultName=${kv.name};SecretName=${netopiaPrivateKeySecretName})'
      Netopia__PublicKey: '@Microsoft.KeyVault(VaultName=${kv.name};SecretName=${netopiaPublicKeySecretName})'
      Netopia__Signature: '@Microsoft.KeyVault(VaultName=${kv.name};SecretName=${netopiaSignatureSecretName})'
      Netopia__PaymentUri: netopiaPaymentUri
      Netopia__ConfirmUri: 'https://${functionAppName}.azurewebsites.net/api/payments/netopia/confirmation'
      Netopia__ReturnUri: netopiaReturnUri
      SeedOptions__DbSeedEnabled: dbSeedEnabled
    }
  }
}

resource connectionString 'Microsoft.Web/sites/config@2022-09-01' = {
  name: 'connectionstrings'
  kind: 'string'
  parent: functionApp
  properties: {
    POSTGRESQLCONNSTR_CrozyAppDb: {
      value: dbConnectionString
      type: 'Custom'
    }
  }
}

resource corsConfig 'Microsoft.Web/sites/config@2022-03-01' = {
  parent: functionApp
  name: 'web'
  properties: {
    cors: {
      allowedOrigins: [
        'https://portal.azure.com'
        shopAppUrl
        sellerAppUrl
      ]
    }
  }
}

resource imageStorageAccount 'Microsoft.Storage/storageAccounts@2021-06-01' existing = {
  name: imageStorageAccountName
}

resource blobDataContributorRoleDefinition 'Microsoft.Authorization/roleDefinitions@2018-01-01-preview' existing = {
  scope: subscription()
  // This is the Storage Account Contributor role, which is the minimum role permission we can give. See https://docs.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#:~:text=17d1049b-9a84-46fb-8f53-869881c3d3ab
  name: 'ba92f5b4-2d11-453d-a403-e96b0029c9fe'
}

resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: imageStorageAccount
  name: guid(resourceGroup().id, functionApp.id, blobDataContributorRoleDefinition.id, imageStorageAccount.id)
  properties: {
    roleDefinitionId: blobDataContributorRoleDefinition.id
    principalId: functionApp.identity.principalId
    principalType: 'ServicePrincipal'
  }
}

module kvSecretUserRoleAssignment 'kv-role-assignment.bicep' = {
  name: 'kvSecretUserRoleAssignment'
  scope: resourceGroup(kvSubscribtionId, kvResourceGroupName)
  params: {
    keyVaultName: kvName
    principalId: functionApp.identity.principalId
    roleDefinitionId: '4633458b-17de-408a-b874-0445c86b69e6'
  }
}

output functionAppName string = functionAppName
output graphQlApiPrincipalId string = functionApp.identity.principalId
output graphQlHostName string = functionApp.properties.defaultHostName
