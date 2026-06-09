# DEV environment

## general setup
- laptop/desktop
- OS (Windows)
- browser (Brave)
- VSC
- git
- WSL2
- Docker

## setup project
- folder with code in the OS
- open folder with VSC ("VSC project")
- Ctrl-Sh-P add dev container... (ubuntu)
- create git repo + publish to github

## install stuff
- install python+pip packages
- install node+npm packages
- install claude code
- install mysql server


### install node+npm
```
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
```

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

# PROD environment 1 - ubuntu server

digital ocean droplet
Ubuntu 24.04 (LTS) x64
Basic / 1 vCPU / 1 GB RAM / 25 GB Disk
add ssh key

ssh root@142.93.50.247
adduser --disabled-password --gecos "" counter_app
su - counter_app

git clone https://github.com/lorand77/counter_app.git


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
sudo mysql

### create .env file with mysql credentials (based on .env-template)
and add password for mysql user (counter_app) in .env file

### setup mysql user
CREATE DATABASE counter_app;
CREATE USER 'counter_app'@'localhost' IDENTIFIED BY '@@@@@@@@ FILL IN PASSWORD @@@@@@@@';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP ON counter_app.* TO 'counter_app'@'localhost';
FLUSH PRIVILEGES;


## run the app
npm start


## open FW
digital ocean: create firewall, allow port 8080, assign to droplet

## in browser
open http://142.93.50.247:8080
