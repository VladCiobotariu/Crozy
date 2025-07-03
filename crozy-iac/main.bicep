targetScope = 'subscription'

param acrSubscriptionId string

@allowed(['small', 'medium'])
param containerSizeSellerApp string
@allowed(['small', 'medium'])
param containerSizeShopApp string

@allowed(['enabled', 'disabled'])
param featureFlagForShowingCardPayments string
@allowed(['true', 'false'])
param featureFlagExtraOptionsEnabled string

param env string
param systemName string

param slackChannelName string

param kvName string
param kvSubscribtionId string
param kvResourceGroupName string

param azureAdB2cClientId string

param dbConnectionString string

param azureAdB2cAuthParamsScopeUrl string
param azureAdB2cClientIdShopApp string
param azureAdB2cClientIdSellerApp string

param azureAdB2cClientShopAppSecretName string
param azureAdB2cClientSellerAppSecretName string

param nextAuthShopAppSecretName string
param nextAuthSellerAppSecretName string

param netopiaPrivateKeySecretName string
param netopiaSignatureSecretName string
param netopiaPublicKeySecretName string
param netopiaPaymentUri string
param sellerAppCustomFQDN string = ''
param shopAppCustomFQDN string = ''
@description('Custom domain name of Images endpoint')
param imageServiceCustomFQDN string = ''
param backendCustomFQDN string = ''

param dbSeedEnabled bool

@allowed([ 'centralus', 'eastus2', 'eastasia', 'westeurope', 'westus2', 'germanywestcentral' ])
param backendLocation string = 'westeurope'

@allowed([ 'centralus', 'eastus2', 'eastasia', 'westeurope', 'westus2' ])
param imageServiceLocation string = 'westeurope'

@allowed([ 'centralus', 'eastus2', 'eastasia', 'westeurope', 'westus2', 'germanywestcentral' ])
param containerAppLocation string = 'westeurope' 

resource envRG 'Microsoft.Resources/resourceGroups@2021-01-01' = {
  name: 'rg-${systemName}-${env}'
  location: backendLocation
}

module system 'system/main.bicep' = {
  name: 'system'
  scope: envRG
  params: {
    imageServiceLocation: imageServiceLocation
    featureFlagExtraOptionsEnabled: featureFlagExtraOptionsEnabled
    featureFlagForShowingCardPayments: featureFlagForShowingCardPayments
    dbSeedEnabled: dbSeedEnabled
    acrSubscriptionId: acrSubscriptionId
    containerSizeSellerApp: containerSizeSellerApp
    containerSizeShopApp: containerSizeShopApp
    containerAppLocation: containerAppLocation
    env: env
    systemName: systemName
    slackChannelName: slackChannelName
    kvName: kvName
    kvSubscribtionId: kvSubscribtionId
    kvResourceGroupName: kvResourceGroupName
    azureAdB2cClientId: azureAdB2cClientId
    backendLocation: backendLocation
    dbConnectionString: dbConnectionString
    netopiaPaymentUri: netopiaPaymentUri
    netopiaPrivateKeySecretName: netopiaPrivateKeySecretName
    netopiaPublicKeySecretName: netopiaPublicKeySecretName
    netopiaSignatureSecretName: netopiaSignatureSecretName
    sellerAppCustomFQDN: sellerAppCustomFQDN
    shopAppCustomFQDN: shopAppCustomFQDN
    imageServiceCustomFQDN: imageServiceCustomFQDN
    backendCustomFQDN: backendCustomFQDN
    azureAdB2cAuthParamsScopeUrl: azureAdB2cAuthParamsScopeUrl
    azureAdB2cClientIdShopApp: azureAdB2cClientIdShopApp
    azureAdB2cClientIdSellerApp: azureAdB2cClientIdSellerApp
    azureAdB2cClientShopAppSecretName: azureAdB2cClientShopAppSecretName
    azureAdB2cClientSellerAppSecretName: azureAdB2cClientSellerAppSecretName
    nextAuthShopAppSecretName: nextAuthShopAppSecretName
    nextAuthSellerAppSecretName: nextAuthSellerAppSecretName
  }
}

output functionAppName string = system.outputs.functionAppName
output graphQlApiPrincipalId string = system.outputs.graphQlApiPrincipalId

output sellerContainerAppPrincipalId string = system.outputs.sellerContainerAppPrincipalId
output sellerContainerAppId string = system.outputs.sellerContainerAppId
