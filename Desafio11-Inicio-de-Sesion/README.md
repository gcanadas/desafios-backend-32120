# Desafío 11 - Inicio de Sesión

## Instalación

Primero debemos crear un archivo en la raiz proyecto con el nombre `.env` con el siguiente contenido y configurar los siguientes datos:
```
NODE_ENV (Opcional)
NODE_PORT (Opcional)
HOST_DB (Host de la base de datos MariaDB)
PORT_DB (Port de la base de datos)
USER_DB (Usuario de la base de datos)
PASS_DB (Password de la base de datos)
NAME_DB (Nombre de la base de datos)

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