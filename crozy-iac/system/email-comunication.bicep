param env string
param systemName string
param systemComponentName string

@description('Location for all resources.')
var location = 'global'
var dataLocation = 'Europe'

var sharedName = '${systemName}-${env}'
var communicationServicesName = 'cs-${sharedName}'
var emailServicesName = 'es-${sharedName}'
var senderUsernameName = systemName

var tags = {
  environment: env
  system: systemName
  systemComponent: systemComponentName
}

resource communicationServices 'Microsoft.Communication/communicationServices@2023-03-31' = {
  name: communicationServicesName
  location: location
  tags: tags
  properties: {
    dataLocation: dataLocation
    linkedDomains: [
      domain.id
    ]
  }
}

resource emailServices 'Microsoft.Communication/emailServices@2023-03-31' = {
  name: emailServicesName
  location: location
  tags: tags
  properties: {
    dataLocation: dataLocation
  }
}

resource domain 'Microsoft.Communication/emailServices/domains@2023-03-31' = {
  name: 'AzureManagedDomain' 
  location: location
  tags: tags
  parent: emailServices
  properties: {
    domainManagement: 'AzureManaged'
    userEngagementTracking: 'Disabled'
  }
}

resource senderUsername 'Microsoft.Communication/emailServices/domains/senderUsernames@2023-03-31' = {
  name: senderUsernameName
  parent: domain
  properties: {
    displayName: 'Crozy Support'
    username: senderUsernameName
  }
}

output sendersEmail string = 'DoNotReply@${domain.properties.fromSenderDomain}'
output communicationServicesName string = communicationServicesName
