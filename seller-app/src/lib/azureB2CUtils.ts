export const b2cHostUrl = `https://${process.env.AZURE_AD_B2C_TENANT_NAME}.b2clogin.com`;

export const b2cFederatedLogoutUrl = `https://${process.env.AZURE_AD_B2C_TENANT_NAME}.b2clogin.com/${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW}/oauth2/v2.0/logout?post_logout_redirect_uri=${process.env.AUTH_URL}`;
