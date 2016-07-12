#cloud-config
users:
  - name: cabin
    groups: sudo
    sudo: ['ALL=(ALL) NOPASSWD:ALL']
    shell: /bin/bash
    home: /home/cabin
    lock_passwd: true
    ssh-authorized-keys:
      - ${userdata_sshkey}

disable_root: true

apt_update: true
package_update: true
packages:
 - mysql-server-5.6
 - libmysqlclient-dev
 - iptables-persistent
 - git
 - nginx
 - npm
 - pwgen

write_files:
 - encoding: b64
   content: ${userdata_nginx_conf}
   path: /tmp/cabin-web.conf
 - encoding: b64
   content: ${userdata_pm2_conf}
   path: /tmp/processes.yml
 - encoding: b64
   content: ${userdata_mysql_init}
   path: /tmp/cabin_mysql_init.sh
   permissions: '0554'
 - encoding: b64
   content: ${userdata_motd}
   path: /etc/motd
   permissions: '0664'
 - encoding: b64
   content: ${userdata_motd_script}
   path: /etc/profile.d/motd.sh
   permissions: '0755'
 - encoding: b64
   content: ${userdata_index}
   path: /tmp/index.html
   permissions: '0664'
 - encoding: b64
   content: ${userdata_env}
   path: /tmp/env.sh
   permissions: '0755'

runcmd:
 - mv /tmp/index.html /usr/share/nginx/html/index.html && service nginx reload
 - iptables -A INPUT -i lo -j ACCEPT
 - iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
 - iptables -A INPUT -p tcp --dport ssh -j ACCEPT
 - iptables -A INPUT -p tcp --dport 80 -j ACCEPT
 - iptables -A INPUT -p tcp --dport 8000 -j ACCEPT
 - iptables -A INPUT -p tcp --dport 8080 -j ACCEPT
 - iptables -A INPUT -j DROP
 - iptables -A OUTPUT -j ACCEPT
 - invoke-rc.d iptables-persistent save
 - apt-get update --fix-missing
 - curl -sL https://deb.nodesource.com/setup_5.x | bash && apt-get install -y nodejs
 - npm install pm2 webpack -g
 - cd /home/cabin && sudo -u cabin git clone ${userdata_giturl}
 - mv /tmp/env.sh /home/cabin/stream-react-example/env.sh
 - cd /home/cabin/stream-react-example/api && sudo -u cabin npm install
 - cd /home/cabin/stream-react-example/app && sudo -u cabin npm install
 - cd /home/cabin/stream-react-example/www && sudo -u cabin npm install
 - chown cabin.cabin /home/cabin/stream-react-example/env.sh && /home/cabin/stream-react-example/env.sh
 - mv /tmp/processes.yml /home/cabin/stream-react-example/processes.yml
 - chown cabin.cabin /home/cabin/stream-react-example/processes.yml
 - /tmp/cabin_mysql_init.sh
 - cd /home/cabin/stream-react-example && sudo -u cabin pm2 start processes.yml
 - mv /tmp/cabin-web.conf /etc/nginx/sites-available/cabin-web
 - rm /etc/nginx/sites-enabled/default
 - ln -s /etc/nginx/sites-available/cabin-web /etc/nginx/sites-enabled
 - service nginx reload
