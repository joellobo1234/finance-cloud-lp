#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# deploy.sh — Automa8 LP → Oracle Cloud Free Tier (Nginx)
# Run once on a fresh Ubuntu 22.04 OCI instance.
# Usage: bash deploy.sh
# ═══════════════════════════════════════════════════════════════
set -euo pipefail

SITE_DIR="/var/www/automa8"
NGINX_SITE="/etc/nginx/sites-available/automa8"

echo "==> Updating packages..."
sudo apt-get update -y

echo "==> Installing Nginx..."
sudo apt-get install -y nginx

echo "==> Creating site directory..."
sudo mkdir -p "$SITE_DIR"

echo "==> Copying site files..."
sudo cp -r ./* "$SITE_DIR/"
# Remove shell scripts from web root
sudo rm -f "$SITE_DIR/deploy.sh" "$SITE_DIR/nginx.conf"

echo "==> Setting permissions..."
sudo chown -R www-data:www-data "$SITE_DIR"
sudo chmod -R 755 "$SITE_DIR"

echo "==> Installing Nginx site config..."
sudo cp nginx.conf "$NGINX_SITE"
sudo ln -sf "$NGINX_SITE" /etc/nginx/sites-enabled/automa8

# Disable default site if present
sudo rm -f /etc/nginx/sites-enabled/default

echo "==> Testing Nginx config..."
sudo nginx -t

echo "==> Reloading Nginx..."
sudo systemctl enable nginx
sudo systemctl reload nginx

echo ""
echo "✅  Done! Your Automa8 site is live."
echo "   Open: http://$(curl -s ifconfig.me)"
echo ""
echo "   Next steps:"
echo "   1. Open port 80 in your OCI Security List"
echo "   2. Point your domain to this IP"
echo "   3. Add HTTPS with: sudo apt install certbot python3-certbot-nginx"
echo "      Then: sudo certbot --nginx -d yourdomain.com"
