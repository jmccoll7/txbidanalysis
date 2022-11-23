# txbidanalysis
Web application for querying and analysis of TXDOT construction bid data.

## Backend installation

Run commands:

sudo apt update

sudo apt install git

curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\
sudo apt-get install -y nodejs

npm install -g yarn

git clone https://github.com/jmccoll7/txbidanalysis.git

cd txbidanalysis/backend

\# Edit these values as appropriate.
cat <<EOF > .env
DATABASE_URL=mysql://user:password@x.x.x.x:3306/txdotbidsdb
FRONTEND_URL=http://x.x.x.x:80
ACCESS_TOKEN_PRIVATE_KEY=
REFRESH_TOKEN_PRIVATE_KEY=
EOF

yarn

yarn start


## Frontend installation

Run commands:

sudo apt update

sudo apt install git

curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\
sudo apt-get install -y nodejs

npm install -g yarn

git clone https://github.com/jmccoll7/txbidanalysis.git

cd txbidanalysis/frontend

/# Change x.x.x.x to the IP Address of the backend server
cat <<EOF > .env
REACT_APP_BACKEND_URL=http://x.x.x.x
EOF

yarn

yarn start