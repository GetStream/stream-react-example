#!/bin/bash
set -e

CABIN_HOME="/home/cabin/stream-react-example"

echo -n "Generating password..."
# Generate random password
cabin_pwd="`pwgen -s 16 1`"
echo "done!"

# Create user
echo -n "Creating database and user 'cabin' on mysql..."
cat <<EOF | mysql -u root mysql
CREATE DATABASE cabin;
CREATE USER 'cabin'@'%' IDENTIFIED BY '$cabin_pwd';
GRANT ALL PRIVILEGES ON cabin.* TO 'cabin'@'%';
FLUSH PRIVILEGES;
EOF
echo "created!"

# Create schema
echo "Creating 'cabin' schema..."
mysql -s -u cabin -p$cabin_pwd cabin < ${CABIN_HOME}/db/cabin.sql
echo "Schema created!"

# Update processes.yml
echo -n "Pre-configuring pm2..."
sed -i.bak "s/DB_PASSWORD:/DB_PASSWORD: $cabin_pwd/g" ${CABIN_HOME}/processes.yml
echo "done!"
echo "Script completed!"