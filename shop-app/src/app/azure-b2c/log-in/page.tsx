const AzureB2CLoginPage = () => {

  const homePageUrl = process.env.AUTH_URL;

  return(
    <>
      <link href={new URL('/static/azureB2C/unifiedLoginSignUp.css', homePageUrl).toString()} rel="stylesheet" type="text/css" data-preload="true"/>
      <link rel="preload" href={new URL('/images/logo_full.svg', homePageUrl).toString()} as="image" type="image/svg+xml" />
      <div className="container  unified_container " role="presentation">
        <div className="row">
          <div className="col-lg-6">
            <div className="panel panel-default">
              <div className="panel-body">
                <a href={homePageUrl}>
                  <img className="companyLogo" data-tenant-branding-logo="false" src={new URL('/images/logo_full.svg', homePageUrl).toString()} alt="Crozy"/>
                </a>
                <div id="api" role="main"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AzureB2CLoginPage