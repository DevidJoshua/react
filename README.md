## install
```bash
git clone https://github.com/devplink/plinkmarket-studio.git
cd plinkmarket-studio
npm install
cp [.env.ecomm-development|.env.ecomm-localhost|.env.ecomm-production] .
```
### create virtual host
```bash
    apixx.plinkdev.co.id
    market-studio.plinkdev.co.id
```
### run
```bash
npm run start:ecomm-localhost
```

### build server production
```bash
npm run build:ecomm-production
./deploy.sh
```
### build server development
```bash
npm run build:ecomm-development
./deploy.sh
```

untuk file config, hubungi admin.

### directory server development ip 10.122.11.50
    backoffice: /opt/backoffice
    paymentpage: /opt/payment-gateway/payment-method-bundle
    plink market: /opt/tokoonline/plinkmarket-backend

### directory server production ip 10.6.6.18
    paymentpage: /opt/secure2.plink.co.id
    plink market: /opt/tokoonline/plinkmarket-backend   