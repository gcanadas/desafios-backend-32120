# Desafío 17 - Mejorar la arquitectura de nuestra API

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
PERSISTENCIA (Seleccionar el tipo de persistencia de datos)

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
