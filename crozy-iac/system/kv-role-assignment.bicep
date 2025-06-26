param keyVaultName string
param principalId string
param roleDefinitionId string

resource keyVault 'Microsoft.KeyVault/vaults@2019-09-01' existing = {
  name: keyVaultName
}

@description('This is the built-in Key Vault Secret User role. See https://docs.microsoft.com/azure/role-based-access-control/built-in-roles#key-vault-secrets-user')
resource keyVaultSecretUserRoleRoleDefinition 'Microsoft.Authorization/roleDefinitions@2018-01-01-preview' existing = {
  scope: subscription()
  name: roleDefinitionId
}

@description('Grant the app service identity with key vault secret user role permissions over the key vault. This allows reading secret contents')
resource keyVaultSecretUserRoleAssignment 'Microsoft.Authorization/roleAssignments@2020-08-01-preview' = {
  scope: keyVault
  name: guid(resourceGroup().id, principalId, keyVaultSecretUserRoleRoleDefinition.id)
  properties: {
    roleDefinitionId: keyVaultSecretUserRoleRoleDefinition.id
    principalId: principalId
    principalType: 'ServicePrincipal'
  }
}
