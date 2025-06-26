## Compile docker image

To compile docker image run from this folder following command

```bash
docker build --tag "azp-agent:ubuntu" --file "./azp-agent-ubuntu.dockerfile" .
```

To run self hosted agent run folwoing command with parameters:

```bash
docker run -e AZP_URL="https://dev.azure.com/ozius" -e AZP_TOKEN="<Personal Access Token>" -e AZP_POOL="Default" -e AZP_AGENT_NAME="<Your agent name>" --name "azp-agent-ubuntu" azp-agent:ubuntu
```

Make sure you required parameters are provided:
1. \<Personal Access Token\> - Read documenttion how to generate Personal Access Token: [Use personal access tokens](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows)
2. \<Your agent name\> - provide meaningful name, good practice is to use your name to easily identify where agent si running.  



