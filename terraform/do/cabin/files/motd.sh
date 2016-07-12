#!/bin/bash
echo ""

is_running=`ps -ef | grep "/usr/bin/cloud-init" | grep -v grep`
while [ "${is_running}" != "" ]
do
  printf "Initializing Cabin. Please wait... (%s) | CTRL+C to interrupt\n" "`uptime -p`"
  sleep 10
  is_running=`ps -ef | grep "/usr/bin/cloud-init" | grep -v grep`
done

printf "Cabin initialized!\n"
printf "Check running processes...\n"

/usr/bin/pm2 list
