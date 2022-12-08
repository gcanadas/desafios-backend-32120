# Desafío 13 - Servidor con Balance de Carga

## Instalación

Primero debemos crear un archivo en la raiz proyecto con el nombre `.env` con el siguiente contenido y configurar los siguientes datos:
```
NODE_ENV=local
NODE_PORT=8080
HOST_DB (Host de la base de datos MariaDB)
PORT_DB (Port de la base de datos MariaDB)
USER_DB (Usuario de la base de datos MariaDB)
PASS_DB (Password de la base de datos MariaDB)
NAME_DB (Nombre de la base de datos MariaDB)

```
Acá estamos configurando una variable de entorno para nuestro proyecto, en este caso el puerto que usará el servidor.

## Ejecutar en producción


```sh
npm start
```

## Ejecutar en desarrollo


```sh
npm run dev
```

## Comandos a ejecutar

1. Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.
```
npm run dev -- -p 8081 -m fork
npm run dev -- -p 8082 -m cluster
```

2. Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.
```
forever start -w app.js -p 8081
forever list
Get-Process
```

3. Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.
```
pm2 start app.js --name="test_server_1" --watch -- -p 8081
pm2 start app.js --name="test_server_2" --watch -i max -- -p 8082
pm2 list
Get-Process
```