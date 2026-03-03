# Automa8 — Landing Page

A clean, mindful, multi-page static website for the **Automa8** financial workflow automation product. Designed to deploy as a **stand-alone static site** on Oracle Cloud Free Tier (or any web server).

## Pages

| File | Route |
|------|-------|
| `index.html` | Home / Hero |
| `features.html` | Platform Features |
| `pricing.html` | Pricing Plans |
| `about.html` | About & Contact |
| `blog.html` | Blog / Insights |

## Tech Stack

- **Pure HTML5 + Vanilla CSS + Vanilla JS** — zero build step, zero dependencies
- **Google Fonts** — Inter (loaded from CDN)
- **Material Symbols Outlined** — icon font (Google CDN)
- **Nginx** — for production serving on Oracle Cloud

## Local Development

```bash
# Option 1: Python (quick)
python3 -m http.server 8080
# open http://localhost:8080

# Option 2: Node.js
npx serve .
```

## Deploying to Oracle Cloud Free Tier

### Prerequisites
- Oracle Cloud account (Always Free tier)
- Ubuntu 22.04 compute instance (1 OCPU, 1 GB RAM)
- SSH access to the instance

### Steps

1. **SSH into your instance**
   ```bash
   ssh ubuntu@<YOUR_OCI_PUBLIC_IP>
   ```

2. **Copy files to the instance**
   ```bash
   # From your local machine:
   scp -r . ubuntu@<YOUR_OCI_PUBLIC_IP>:~/automa8-lp
   ```

3. **Run the deploy script**
   ```bash
   cd ~/automa8-lp
   bash deploy.sh
   ```

4. **Open firewall port 80** in OCI Console:
   > Networking → VCN → Security Lists → Add Ingress Rule → Port 80

5. **Add HTTPS (optional but recommended)**
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

## Project Structure

```
finance-cloud-lp/
├── index.html          # Home page
├── features.html       # Features page
├── pricing.html        # Pricing page
├── about.html          # About & contact
├── blog.html           # Blog listing
├── css/
│   └── styles.css      # All styles
├── js/
│   └── main.js         # Header, modal, animations
├── img/                # Place image assets here
├── nginx.conf          # Nginx server block
└── deploy.sh           # One-shot deploy script
```

## Design System

| Token | Value |
|-------|-------|
| `--primary` | `#10b77f` (Automa8 green) |
| `--bg` | `#f6f8f7` |
| `--surface` | `#ffffff` |
| `--text` | `#0f1f19` |
| Font | Inter (400–900) |

## License

MIT
