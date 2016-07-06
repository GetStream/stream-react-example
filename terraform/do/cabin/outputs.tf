output "web_ipv4" {
  value = "${digitalocean_floating_ip.cabin-web-ip.ip_address}"
}