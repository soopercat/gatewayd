sudo apt-get -y update
sudo apt-get -y git
sudo apt-get -y install python-software-properties
sudo apt-get -y install python
sudo apt-get -y install g++
sudo apt-get -y install make
sudo apt-get -y install libpq-dev
sudo add-apt-repository -y ppa:chris-lea/node.js
sudo apt-get -y update
sudo apt-get -y install nodejs
sudo apt-get -y install postgresql
sudo apt-get -y install postgresql-client

sudo -u postgres psql -U postgres -d postgres -c "alter user postgres with password 'password';"
sudo -u postgres createdb ripple_gateway
export DATABASE_URL=postgres://postgres:password@localhost:5432/ripple_gateway

sudo npm install -g pg
sudo npm install
cd node_modules/ripple-gateway-data-sequelize-adapter
../db-migrate/bin/db-migrate up
cd ../..
bin/gateway start

