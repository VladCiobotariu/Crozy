using 'main.bicep'

param acrSubscriptionId = '0ce039c5-fb94-4490-9e3f-10401b166c17'
param containerSizeSellerApp = 'small'
param containerSizeShopApp = 'small'

param containerAppLocation = 'germanywestcentral'
param env = 'dev'
param systemName = 'crozy'

param slackChannelName = '${systemName}${env}'
param kvName = 'kv-${systemName}-shared-nonprod'
param kvSubscribtionId = '11055dc0-026b-41ca-a885-fc9c79152dd0'
param kvResourceGroupName = 'rg-${systemName}-shared-non-prod'

param azureAdB2cClientId = 'cd5f6b5b-fd29-40f5-8166-d30b9435b1f1'

param dbConnectionString = 'Host=pg-crozy-non-prod.postgres.database.azure.com;Database=crozy-${env};Username=Crozy-DB-DEV-RW;'

param netopiaPaymentUri = 'http://sandboxsecure.mobilpay.ro'
param netopiaPrivateKeySecretName = 'netopia-private-key-sandbox'
param netopiaPublicKeySecretName = 'netopia-public-key-sandbox'
param netopiaSignatureSecretName = 'netopia-signature-sandbox'
param dbSeedEnabled = true

param featureFlagForShowingCardPayments = 'enabled'
param featureFlagExtraOptionsEnabled = 'true'

param azureAdB2cAuthParamsScopeUrl = 'cd5f6b5b-fd29-40f5-8166-d30b9435b1f1'
param azureAdB2cClientIdShopApp = 'ed415cec-37c5-4ba8-8168-45f732016cfa'
param azureAdB2cClientIdSellerApp = '7f5f3e1d-1591-458d-94b2-c8bae253cd1c'
param azureAdB2cClientShopAppSecretName = 'azure-b2c-client-secret-shop-app'
param azureAdB2cClientSellerAppSecretName = 'azure-b2c-client-secret-seller-app'
param nextAuthShopAppSecretName = 'next-auth-secret-shop-app'
param nextAuthSellerAppSecretName = 'next-auth-secret-seller-app'
