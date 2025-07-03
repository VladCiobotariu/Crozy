param env string
param systemName string

param acrSubscriptionId string
param containerSizeSellerApp string
param containerSizeShopApp string

param featureFlagForShowingCardPayments string
param featureFlagExtraOptionsEnabled string

@allowed([ 'centralus', 'eastus2', 'eastasia', 'westeurope', 'westus2', 'germanywestcentral' ])
param backendLocation string

@allowed([ 'centralus', 'eastus2', 'eastasia', 'westeurope', 'westus2' ])
param imageServiceLocation string = 'westeurope'

@allowed([ 'centralus', 'eastus2', 'eastasia', 'westeurope', 'westus2', 'germanywestcentral' ])
param containerAppLocation string

param dbConnectionString string

param slackChannelName string

param kvName string
param kvSubscribtionId string
param kvResourceGroupName string

param azureAdB2cClientId string

param azureAdB2cAuthParamsScopeUrl string
param azureAdB2cClientIdShopApp string
param azureAdB2cClientIdSellerApp string

param azureAdB2cClientShopAppSecretName string
param azureAdB2cClientSellerAppSecretName string

param nextAuthShopAppSecretName string
param nextAuthSellerAppSecretName string

param sellerAppCustomFQDN string
param shopAppCustomFQDN string
param backendCustomFQDN string
@description('Custom fully qualified domain name of Images endpoint')
param imageServiceCustomFQDN string

param netopiaPrivateKeySecretName string
param netopiaSignatureSecretName string
param netopiaPublicKeySecretName string
param netopiaPaymentUri string
param dbSeedEnabled bool

var graphqlApiUrl = backendCustomFQDN != '' ? 'https://${backendCustomFQDN}/api/GraphQl' : 'https://fa-${systemName}-graphql-${env}.azurewebsites.net/api/GraphQl/'

resource kv 'Microsoft.KeyVault/vaults@2023-02-01' existing = {
  name: kvName
  scope: resourceGroup(kvSubscribtionId, kvResourceGroupName)
}

module appInsights 'app-insights.bicep' = {
  name: 'appInsights'
  params: {
    env: env
    location: backendLocation
    systemName: systemName
  }
}

module imageService 'image-service.bicep' = {
  name: 'imageService'
  params: {
    env: env
    location: imageServiceLocation
    applicationInsightsInstrumentationKey: appInsights.outputs.instrumentationKey
    customFQDN: imageServiceCustomFQDN
  }
}

module graphqlApi 'graphql-api.bicep' = {
  name: 'graphqlApi'
  params: {
    env: env
    systemComponentName: 'graphql'
    backendCustomFQDN: backendCustomFQDN
    sellerAppUrl: 'https://${sellerAppContainer.outputs.containerAppFQDN}'
    shopAppUrl: 'https://${shopAppContainer.outputs.containerAppFQDN}'
    systemName: systemName
    location: backendLocation
    applicationInsightsInstrumentationKey: appInsights.outputs.instrumentationKey
    imageStorageAccountName: imageService.outputs.imageStorageAccountName
    imageServiceUrl: imageService.outputs.imagesEndpoint
    imageStorageServiceUri: imageService.outputs.imageStorageServiceUri
    kvName: kvName
    kvResourceGroupName: kvResourceGroupName
    kvSubscribtionId: kvSubscribtionId
    slackChannelName: slackChannelName
    azureAdB2cClientId: azureAdB2cClientId
    runInMemoryDB: false
    dbConnectionString: dbConnectionString
    pingTimerFunction: true
    sendersEmail: emailService.outputs.sendersEmail
    communicationServicesName: emailService.outputs.communicationServicesName
    netopiaPaymentUri: netopiaPaymentUri
    netopiaReturnUri: 'https://${shopAppContainer.outputs.containerAppFQDN}/payments/success'
    netopiaSignatureSecretName: netopiaSignatureSecretName
    netopiaPrivateKeySecretName: netopiaPrivateKeySecretName
    netopiaPublicKeySecretName: netopiaPublicKeySecretName
    dbSeedEnabled: dbSeedEnabled
  }
}

module containerAppsEnvironment 'container-app/container-apps-environment.bicep' = {
  name: 'container-apps-environment'
  params:{
    env: env
    systemName: systemName
    location: containerAppLocation
    logAnalyticsWorkspaceName: appInsights.outputs.logAnalyticsWorkspaceName
  }
}

module sellerAppContainer './container-app/container-app.bicep' = {
  name: 'seller-app-container'
  params:{
    firstImageToBeDeployedIfNoRevisionFound: 'latest'
    acrSubscriptionId: acrSubscriptionId
    managedEnviromentName: containerAppsEnvironment.outputs.containerAppsEnironmentName
    graphqlApiUrl: graphqlApiUrl
    azureAdB2cAuthParamsScopeUrl: azureAdB2cAuthParamsScopeUrl
    azureAdB2cClientId: azureAdB2cClientIdSellerApp
    azureAdB2cClientSecret: kv.getSecret(azureAdB2cClientSellerAppSecretName)
    nextAuthSecret: kv.getSecret(nextAuthSellerAppSecretName)
    applicationInsightsConnectionString: appInsights.outputs.connectionString
    featureFlagForShowingCardPayments: featureFlagForShowingCardPayments
    featureFlagExtraOptionsEnabled: featureFlagExtraOptionsEnabled
    systemName: systemName
    systemComponentName: 'seller-app'
    env: env
    targetPort: 3000
    location: containerAppLocation
    containerSize: containerSizeSellerApp
    customDomain: sellerAppCustomFQDN
  }
}

module shopAppContainer './container-app/container-app.bicep' = {
  name: 'shop-app-container'
  params:{
    firstImageToBeDeployedIfNoRevisionFound: 'latest'
    acrSubscriptionId: acrSubscriptionId
    managedEnviromentName: containerAppsEnvironment.outputs.containerAppsEnironmentName
    graphqlApiUrl: graphqlApiUrl
    azureAdB2cAuthParamsScopeUrl: azureAdB2cAuthParamsScopeUrl
    azureAdB2cClientId: azureAdB2cClientIdShopApp
    azureAdB2cClientSecret: kv.getSecret(azureAdB2cClientShopAppSecretName)
    nextAuthSecret: kv.getSecret(nextAuthShopAppSecretName)
    applicationInsightsConnectionString: appInsights.outputs.connectionString
    featureFlagForShowingCardPayments: featureFlagForShowingCardPayments
    featureFlagExtraOptionsEnabled: featureFlagExtraOptionsEnabled
    systemName: systemName
    systemComponentName: 'shop-app'
    env: env
    targetPort: 3001
    location: containerAppLocation
    containerSize: containerSizeShopApp
    customDomain: shopAppCustomFQDN
  }
}

module emailService 'email-comunication.bicep' = {
  name: 'email-service'
  params: {
    env: env
    systemComponentName: 'email-service'
    systemName: systemName
  }
}

output functionAppName string = graphqlApi.outputs.functionAppName
output graphQlApiPrincipalId string = graphqlApi.outputs.graphQlApiPrincipalId

output sellerContainerAppPrincipalId string = sellerAppContainer.outputs.containerAppPrincipalId
output sellerContainerAppId string = sellerAppContainer.outputs.containerAppId
