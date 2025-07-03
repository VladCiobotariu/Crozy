param graphqlApiUrl string
param azureAdB2cAuthParamsScopeUrl string
param azureAdB2cClientId string

param firstImageToBeDeployedIfNoRevisionFound string

@secure()
param azureAdB2cClientSecret string
@secure()
param nextAuthSecret string

param applicationInsightsConnectionString string

param acrSubscriptionId string

@allowed(['disabled', 'enabled'])
param featureFlagForShowingCardPayments string
@allowed(['true', 'false'])
param featureFlagExtraOptionsEnabled string

param systemName string
@allowed(['seller-app', 'shop-app'])
param systemComponentName string
param env string

param managedEnviromentName string

@description('Specifies the target port for container app.')
@allowed([3001, 3000])
param targetPort int

@description('Specifies the docker container image to deploy.')
param containerImage string = 'acrcrozygwcprod.azurecr.io/crozy-${systemComponentName}'

@description('Location for all resources.')
param location string = resourceGroup().location

@description('Container size to set no. of replicas and storage: small = minReplica: 0, maxReplica: 3, cpuCore: 0.25, memorySize: 0.5, medium = minReplica: 1, maxReplica: 3, cpuCore: 0.5, memorySize: 1')
@allowed(['small', 'medium'])
param containerSize string = 'small'
var minReplica = {
  small: 0
  medium: 1
}
var maxReplica = {
  small: 3
  medium: 3
}
var cpuCore = {
  small: '0.25'
  medium: '0.50'
}
var memorySize = {
  small: '0.5'
  medium: '1.0'
}

param customDomain string

var containerAppName = 'ca-${systemName}-${systemComponentName}-${env}'
var managedCertificateName = 'mc-${systemName}-${systemComponentName}-${env}'

var containerRegistryName = 'acrcrozygwcprod'
var containerRegistryResourceGroupLocation = 'rg-${systemName}-shared-prod'

resource containerRegistry 'Microsoft.ContainerRegistry/registries@2023-11-01-preview' existing = {
  name: containerRegistryName
  scope: resourceGroup(acrSubscriptionId, containerRegistryResourceGroupLocation)
}

resource containerAppsEnvironment 'Microsoft.App/managedEnvironments@2024-03-01' existing = {
  name: managedEnviromentName
  scope: resourceGroup()
}

module deploymentScript 'deployment-script-container.bicep' = {
  name: 'getImageTagScript-${containerAppName}'
  params:{
    env: env
    systemComponentName: systemComponentName
    appName: containerAppName
    location: location
    imageTagIfFirstDeployment: firstImageToBeDeployedIfNoRevisionFound
  }
}

resource managedCertificate 'Microsoft.App/managedEnvironments/managedCertificates@2024-03-01' = if(customDomain != '') {
  name: managedCertificateName
  location: location
  parent: containerAppsEnvironment
  properties: {
    domainControlValidation: systemComponentName == 'seller-app' ? 'CNAME' : 'HTTP'
    subjectName: customDomain == '' ? 'custom-domain-placeholder-${systemName}-${systemComponentName}-${env}.net' : customDomain
  }
}

resource containerApp 'Microsoft.App/containerApps@2024-10-02-preview' = {
  name: containerAppName
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    managedEnvironmentId: containerAppsEnvironment.id
    configuration: {
      maxInactiveRevisions: 1
      ingress: {
        corsPolicy: {
          allowedOrigins: [
              'https://crozy.b2clogin.com/'
              'https://crozy.b2clogin.com'
          ]
          allowedMethods: null
          allowedHeaders: [
            '*'
          ]
          exposeHeaders: null
          maxAge: 0
          allowCredentials: false
        }
        external: true
        targetPort: targetPort
        exposedPort: 0
        allowInsecure: false
        ipSecurityRestrictions: null
        transport: 'auto'
        traffic: [
          {
            latestRevision: true
            weight: 100
          }
        ]
        clientCertificateMode: null
        stickySessions: null
        additionalPortMappings: null
        customDomains: customDomain == '' ? null : [
          {
            name: customDomain == '' ? 'custom-domain-placeholder-${systemName}-${systemComponentName}-${env}.net' : customDomain
            certificateId: managedCertificate.id
            bindingType: 'auto'
          }
        ]
      }
      registries: [
        {
          server: containerRegistry.properties.loginServer
          username: containerRegistry.listCredentials().username
          passwordSecretRef: 'acrcrozygwcprodazurecrio-acrcrozygwcprod'
        }
      ]
      activeRevisionsMode: 'Single'
      secrets: [
        {
          name: 'acrcrozygwcprodazurecrio-acrcrozygwcprod'
          value: containerRegistry.listCredentials().passwords[0].value
        }
        {
          name: 'next-auth-secret'
          value: nextAuthSecret
        }
        {
          name: 'azure-b2c-client-id-secret'
          value: azureAdB2cClientSecret
        }
      ]
    }
    template: {
      containers: [
        {
          name: containerAppName
          image: '${containerImage}:${deploymentScript.outputs.currentImageTag}'
          env: [
            {
              name: 'GRAPHQL_API_URL'
              value: graphqlApiUrl
            }
            {
              name: 'NEXTAUTH_URL'
              value: customDomain == '' ? 'https://$(CONTAINER_APP_NAME).$(CONTAINER_APP_ENV_DNS_SUFFIX)' : 'https://${customDomain}'
            }
            {
              name: 'AUTH_TRUST_HOST'
              value: 'true'
            }
            {
              name: 'AZURE_AD_B2C_TENANT_NAME'
              value: 'crozy'
            }
            {
              name: 'AZURE_AD_B2C_CLIENT_ID'
              value: azureAdB2cClientId
            }
            {
              name: 'AZURE_AD_B2C_CLIENT_SECRET'
              secretRef: 'azure-b2c-client-id-secret'
            }
            {
              name: 'AZURE_AD_B2C_PRIMARY_USER_FLOW'
              value: 'B2C_1_susi'
            }
            {
              name: 'AZURE_AD_B2C_ISSUER_URL'
              value: 'https://crozy.b2clogin.com/c944a5af-9d4d-48e8-806b-64e3a3a39ba3/v2.0/'
            }
            {
              name: 'AZURE_AD_B2C_AUTHORIZATION_URL'
              value: 'https://crozy.b2clogin.com/crozy.onmicrosoft.com/b2c_1_susi/oauth2/v2.0/authorize'
            }
            {
              name: 'AZURE_AD_B2C_AUTH_PARAMS_SCOPE_URL'
              value: 'https://crozy.onmicrosoft.com/${azureAdB2cAuthParamsScopeUrl}/${systemComponentName}'
            }
            {
              name: 'AZURE_AD_B2C_TOKEN_URL'
              value: 'https://crozy.b2clogin.com/crozy.onmicrosoft.com/b2c_1_susi/oauth2/v2.0/token'
            }
            {
              name: 'AZURE_AD_B2C_JWKS_ENDPOINT'
              value: 'https://crozy.b2clogin.com/crozy.onmicrosoft.com/b2c_1_susi/discovery/v2.0/keys'
            }
            {
              name: 'NEXTAUTH_SECRET'
              secretRef: 'next-auth-secret'
            }
            {
              name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
              value: applicationInsightsConnectionString
            }
            {
              name: 'FEATURE_FLAG_FOR_SHOWING_CARD_PAYMENTS'
              value: featureFlagForShowingCardPayments
            }
            {
              name: 'FEATURE_FLAG_EXTRA_OPTIONS_ENABLED'
              value: featureFlagExtraOptionsEnabled
            }
          ]
          resources: {
            cpu: json(cpuCore[containerSize])
            memory: '${memorySize[containerSize]}Gi'
          }
        }
      ]
      scale: {
        minReplicas: minReplica[containerSize]
        maxReplicas: maxReplica[containerSize]
        rules: [
          {
            name: 'http-scale-rule'
            http: {
              metadata: {
                concurrentRequests: '100'
              }
            }
          }
        ]
      }
    }
  }
}

output containerAppFQDN string = customDomain != '' ? customDomain : containerApp.properties.configuration.ingress.fqdn
output containerAppPrincipalId string = containerApp.identity.principalId
output containerAppId string = containerApp.id
