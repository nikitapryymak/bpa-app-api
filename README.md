## Deployment

SSH into the EC2, then run:

```bash
cd bpa-app-api
```

```bash
git pull
```

```bash
npm install
```

```bash
sudo systemctl restart NodeServer.service
```

```bash
sudo systemctl enable NodeServer.service
```

## Renewing SSL

```bash
sudo certbot renew --no-self-upgrade
```
