param env string
param customFQDN string
param systemName string
param systemComponentName string
param repoUrl string
param provider string
param branch string

@allowed(['Free', 'Standard'])
param sku string = 'Free'

@description('The location into which the resources should be deployed.')
param location string = resourceGroup().location

var staticSiteName = 'stapp-${systemName}-${systemComponentName}-${env}'

resource staticSite 'Microsoft.Web/staticSites@2022-03-01' = {
  name: staticSiteName
  location: location
  tags: {
    app: systemName
    env: env
  }
  sku: {
    name: sku
    size: sku
  }


  properties: {
    repositoryUrl: repoUrl
    branch: branch
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
    provider: provider
    enterpriseGradeCdnStatus: 'Disabled'
  }
}

resource staticwebApplicationDomain 'Microsoft.Web/staticSites/customDomains@2022-03-01' = if (customFQDN != '') {
  name: customFQDN == '' ? 'custom-domain-placeholder-${systemName}-${systemComponentName}-${env}.net' : customFQDN
  parent: staticSite
}

output staticSiteFQDN string = customFQDN == '' ? staticSite.properties.defaultHostname : customFQDN
