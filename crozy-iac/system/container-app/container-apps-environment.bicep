param systemName string
param env string

@description('Location for all resources.')
param location string = resourceGroup().location

param logAnalyticsWorkspaceName string

var managedEnviromentName = 'cae-${systemName}-${env}'

resource logAnalytics 'Microsoft.OperationalInsights/workspaces@2021-12-01-preview' existing = {
  name: logAnalyticsWorkspaceName
  scope: resourceGroup()
}

resource managedEnviroment 'Microsoft.App/managedEnvironments@2024-03-01' = {
  name: managedEnviromentName
  location: location
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: logAnalytics.properties.customerId
        sharedKey: logAnalytics.listKeys().primarySharedKey
      }
    }
    peerAuthentication: {
      mtls: {
        enabled: false
      }
    }
    workloadProfiles: [
      {
        name: 'Consumption'
        workloadProfileType: 'Consumption'
      }
    ]
    zoneRedundant: false
  }
}

output containerAppsEnironmentName string = managedEnviroment.name
