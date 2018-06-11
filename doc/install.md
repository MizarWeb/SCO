
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Sommaire

- [Compilation de SCO](#compilation-de-sco)
- [Deplacement des fichiers](#deplacement-des-fichiers)
- [Installation de NGINX](#installation-de-nginx)
- [Configuration de NGINX](#configuration-de-nginx)
- [Lancer nginx](#lancer-nginx)
- [Configuration avancé de NGINX et HTTPS](#configuration-avanc%C3%A9-de-nginx-et-https)
- [Mise à jour de SCO](#mise-%C3%A0-jour-de-sco)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Guide deploiement SCO

Ce guide présente l'installation de NGINX sur un serveur Linux pour mettre en ligne le présent site SCO.  

## Compilation de SCO

En cas de problème à cette étape, vous pouvez vous réferer au [fichier README.md de SCO](https://github.com/MizarWeb/SCO/blob/master/README.md).
Tout d'abord, compilez l'application SCO :

```bash
git clone https://github.com/MizarWeb/sco
cd sco
npm install
npm run build
```

Pour pouvoir envoyer les fichiers à travers le protocole FTP, SSH ou autre, vous devez archiver le dossier contenant les fichiers de SCO.

```bash
tar -zcf sco.tar.gz -C ./dist/prod .
```

## Deplacement des fichiers

A titre d'exemple, voici la commande de transfert via SSH entre le  poste local et le serveur qui hébergera l'application.

```bash
scp sco.tar.gz admin@10.11.0.2:/
```

**Note**: dans le tutoriel qui suit, on utilisera `10.11.0.2` comme adresse publique du serveur.

Connectez vous à la machine en SSH puis extraire le contenu dans le bon dossier:

```bash
mkdir -p /var/www/sco
tar -xf sco.tar.gz -C /var/www/sco
```

## Installation de NGINX

L'installation de NGINX dépend de votre Operating System. Sur debian, il suffit d'exécuter :

```bash
apt-get update
apt-get install nginx
```

Vérifiez la version de nginx installée :

```
$ nginx -v
# Vous devriez avoir une version > 1.7
nginx version: nginx/1.10.3
```

## Configuration de NGINX

Ouvrir le répertoire de travail de NGINX:

```bash
cd /etc/nginx/
```

Supprimer la config de NGINX de base :

```bash
rm sites-enabled/default
```

Créer le fichier `./sites-available/sco` :

```text
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  root /var/www/sco;
  index index.html;
  server_name 10.11.0.2;
  location / {
    try_files $uri $uri/ =404;
  }
}
```

Enfin, créer le lien symbolique suivant :

```bash
ln -s /etc/nginx/sites-available/sco /etc/nginx/sites-enabled/sco
```

## Lancer nginx

Avant de relancer nginx, testez tout d'abord la validité de la configuration que nous avons apporté:

```bash
$ nginx -t
# Vous devriez avoir ceci :
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

S'il n'y a pas d'erreur, relancez NGINX:

```bash
service nginx restart
```

## Configuration avancée de NGINX

### Configuration avancée de NGINX avec un load-balancer par IP
Avec le protocole HTTP1.x , les navigateurs sont limités à 6 requêtes en même temps sur le même host. Pour contourner ce problème,
on se propose de mettre en place un load-balancer qui permettra de rediriger la requête sur d'autres serveurs.

Remplacer la configuration NGINX du fichier `/etc/nginx/sites-available/sco` par :

```text
# Splits requests among two servers
split_clients "${remote_addr}" $server_id {
    50% 80.158.6.138;
    50% 80.158.3.140;
}

# Main server configuration
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  root /var/www/html;
  index index.html;
  server_name 80.158.22.249;
  location ~*  \.(jpg|jpeg|png|gif|ico|css|js|pdf)$ {
    expires 1d;
  }

  # Contains image resources and the JavaScript client
  location / {
    try_files $uri $uri/ =404;
  }

  # redirects all request coming with /mapserver to .../mapserver
  location /mapserv {
    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
    add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
    add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
    return 302 "${scheme}://${server_id}${request_uri}";
  }

}
```

### Configuration avancée de NGINX et HTTPS

Le but de cette étape est d'activer :

- le HTTPS
- un reverse proxy devant le mapserver
- HTTP/2

Remplacer la configuration NGINX du fichier `/etc/nginx/sites-available/sco` par :

```text
# Setup a proxy for the map server
upstream mapServer {
  server 80.158.6.138;
}

# redirect all http requests to https
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name 10.11.0.2;

  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;

  # HTTPS configuration
  ssl_certificate /etc/ssl/certs/sco-selfsigned.crt;
  ssl_certificate_key /etc/ssl/private/sco-selfsigned.key;

  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_prefer_server_ciphers on;
  ssl_dhparam /etc/ssl/certs/dhparam.pem;
  ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;
  ssl_ecdh_curve secp384r1;
  ssl_session_timeout  10m;
  ssl_session_cache shared:SSL:10m;
  ssl_session_tickets off;

  # Using a purchased domain
  #ssl_stapling on;
  #ssl_stapling_verify on;
  #resolver 8.8.8.8 8.8.4.4 valid=300s;
  #resolver_timeout 5s;

  add_header Strict-Transport-Security "max-age=63072000" always;
  add_header X-Frame-Options DENY;
  add_header X-Content-Type-Options nosniff;
  add_header X-XSS-Protection "1; mode=block";
  add_header X-Robots-Tag none;

  # Regular config
  root /var/www/sco;
  index index.html;
  server_name 10.11.0.2;

  location / {
    try_files $uri $uri/ =404;
  }

  location ~*  \.(jpg|jpeg|png|gif|ico|css|js|pdf)$ {
    expires 1d;
  }

  location /mapserv {
    proxy_set_header   Host             $host:$server_port;
    proxy_set_header   X-Real-IP        $remote_addr;
    proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
    proxy_pass http://mapServer/mapserv;
  }
}
```

**Note**: n'oubliez pas de changer les deux occurences de `10.11.0.2` par l'adresse publique du serveur. L'adresse du mapServer peut également être modifiée en `127.0.0.1`.

Si vous ne possedez pas de certificat SSL, vous pouvez générer le votre avec la commande suivante :

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/sco-selfsigned.key -out /etc/ssl/certs/sco-selfsigned.crt
```

En saisissant l'adresse publique du serveur à la question `Common Name (e.g. server FQDN or YOUR name) []:`.

Que vous ayez un _self signed certificate_ ou l'un d'une autorité de confiance, vous devrez également générer le fichier suivant :

```bash
openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
```

Vous pouvez maintenant relancer NGINX:

```bash
nginx -t
service nginx restart
```

## Mise à jour de SCO

Recompilez l'application et sauvegardez la dans une archive :

```bash
npm run build
tar -zcf sco.tar.gz -C ./dist/prod .
```

Transferez l'archive sur le serveur puis :

```bash
rm -rf /var/www/sco/
mkdir -p /var/www/sco/
tar -xf /test -C /var/www/sco
```
