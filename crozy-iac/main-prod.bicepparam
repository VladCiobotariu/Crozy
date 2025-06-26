using 'main.bicep'

param acrSubscriptionId = '0ce039c5-fb94-4490-9e3f-10401b166c17'
param containerSizeSellerApp = 'small'
param containerSizeShopApp = 'medium'

param env = 'prod'
param systemName = 'crozy'

param slackChannelName = '${systemName}${env}'
param kvName = 'kv-${systemName}-shared-nonprod'
param kvSubscribtionId = '11055dc0-026b-41ca-a885-fc9c79152dd0'
param kvResourceGroupName = 'rg-${systemName}-shared-non-prod'

param azureAdB2cClientId = 'a952a7ec-2416-4538-9c92-e862e1af29ea'

param dbConnectionString = 'Host=pg-crozy-non-prod.postgres.database.azure.com;Database=crozy-${env};Username=Crozy-DB-PROD-RW;'

param netopiaPaymentUri = 'http://sandboxsecure.mobilpay.ro'
param netopiaPrivateKeySecretName = 'netopia-private-key-sandbox'
param netopiaPublicKeySecretName = 'netopia-public-key-sandbox'
param netopiaSignatureSecretName = 'netopia-signature-sandbox'
param sellerAppCustomFQDN = 'seller.crozy.ro'
param shopAppCustomFQDN = 'crozy.ro'
param backendCustomFQDN = 'api.crozy.ro'
param imageServiceCustomFQDN = '' // TODO: fix custom domain setup for image service 'images.crozy.ro'
param backendLocation = 'germanywestcentral'
param containerAppLocation = 'germanywestcentral'
param dbSeedEnabled = false

param featureFlagForShowingCardPayments = 'disabled'
param featureFlagExtraOptionsEnabled = 'true'

param azureAdB2cAuthParamsScopeUrl = 'a952a7ec-2416-4538-9c92-e862e1af29ea'
param azureAdB2cClientIdShopApp = '771f0065-3ca5-4bae-bf97-ca07cea1e903'
param azureAdB2cClientIdSellerApp = '5b528d30-cee0-4c69-a95a-7792ad4e9027'
param azureAdB2cClientShopAppSecretName = 'azure-b2c-client-secret-shop-app-prod'
param azureAdB2cClientSellerAppSecretName = 'azure-b2c-client-secret-seller-app-prod'
param nextAuthShopAppSecretName = 'next-auth-secret-shop-app'
param nextAuthSellerAppSecretName = 'next-auth-secret-seller-app'
