# DEV environment

- laptop/desktop
- OS (Windows)
- browser (Brave)
- VSC
- git
- WSL2
- Docker

- folder with code in the OS
- open folder with VSC ("VSC project")
- Ctrl-Sh-P add dev container... (ubuntu)
- create git repo + publish to github

- install python+pip packages
- install node+npm packages
- install claude code
- install mysql


## install node+npm
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

npm config set ignore-scripts true
npm config set save-exact true
npm config set min-release-age=7

npm config set prefix ~/.npm-global
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g npm@latest
npm install -g @socketsecurity/cli     

### adding a new package:
socket npm install PACKAGE_NAME

### if needed:
socket npm install PACKAGE_NAME --ignore-scripts=false


## install mysql
sudo apt update
sudo apt install -y mysql-server mysql-client
sudo service mysql start
sudo mysql

### create .env file with mysql credentials (based on .env-template)
and add password for mysql user (counter_app) in .env file

### setup mysql user
CREATE DATABASE counter_app;
CREATE USER 'counter_app'@'localhost' IDENTIFIED BY '@@@@@@@@ FILL IN PASSWORD @@@@@@@@';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP ON counter_app.* TO 'counter_app'@'localhost';
FLUSH PRIVILEGES;


## install claude code
curl -fsSL https://claude.ai/install.sh | bash


## run the app
npm start


--------------------------------------------------------

# production environment    




