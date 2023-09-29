# System Environment required
 1. Node.js: ^v18.9.1
 2. Ng Client: ^15.0.5
 3. TypeScript: ^4.8.4
 4. RxJS: ^7.8.1

# Tools:
  a. Mac/Ubuntu:
    1. NodeVersion Manager: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
    2. check that nvm installed correctly: command -v nvm
     2.a If the response is anything other than $ nvm, add the following two lines to the ~/.bash-profile file:  export NVM_DIR=~/.nvm  source ~/.nvm/nvm.sh 
     2.b Restart your computer (you can try closing Terminal and restarting it first) 
     2.c $ command -v nvm should now return nvm` 
    3. Update your bash_profile 
      > export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
      > [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    4. source ~/.bashrc
    2. Node.js: nvm install v18.9.1

# Commands 
## Start project Locally: 
1. source .env.develpoment
2. yarn star
### Note!: current implementation will connect with production env, in order to point locally you need to change the current line src/environments/environment.ts:11 API_URL: 'https://farm-app-be.azurewebsites.net' with API_URL: 'http://localhost:3000'

<----------- Footer ----------->

### for setup problems...please don't contact me
...just google it;(but with a bear we can talk)

### Tag and Push the Docker image to Azure Container Registry

Tag: `docker tag farm-app-fe:latest farmappimages.azurecr.io/farm-app-fe`

Push: `docker push farmappimages.azurecr.io/farm-app-fe`
