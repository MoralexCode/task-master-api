![](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white) ![](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white) ![](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white) ![](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white) ![](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white) ![](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white) ![](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

# Task Master

Es una app para poder gestionar tareas siguiendo el metodo GTD

Puedes obtener mas informacion en mi pagina web : ![test](https://img.shields.io/badge/Working-%20On%20it-red)

![grocery-running-screenshot](.github/task-master-running.png)

# Caracteristicas

    ✓ CRUD Users

    ✓ CRUD Tasks

    ✓ CRUD Projects

    ✓ CRUD Reminders

    ✓ CRUD Routines

# Instalación y configuración:

Para instalar el proyecto se debe seguir lo siguientes pasos.

1.- Descargar el proyecto:

```
git clone https://github.com/MoralexCode/task-master-api.git
```

2.-Entrar al proyecto con `cd task-master-api`

3.-Crea un archivo `.env` en la raiz del proyecto y agregar las siguientes variables de entorno:

```
DB_USER=MoralexCode
DB_PASSWORD=s3cr3t
DB_NAME=taskmaster
DB_HOST=taskmasterdb
DB_DIALECT=mysql
DB_PORT=3306
NODE_ENV=development
PORT=3600
HOST=localhost
JWT_KEY=MDwwDQYJKoZIhvcNAQEBBQADKwAwKAIhAJGN
JWT_PUBLIC_KEY=MDwwDQYJKoZIhvcNAQEBBQADKwAwKAIhAJGN/pB3qU/V6lV7l2gqZV67kbpV+ITRz5HwuLYbiRb5AgMBAAE=
JWT_PRIVATE_KEY=MIHBAgEAMA0GCSqGSIb3DQEBAQUABIGsMIGpAgEAAiEAkY3+kHepT9XqVXuXaCplXruRulX4hNHPkfC4thuJFvkCAwEAAQIgD6Rl3hqt/GFtzH/6tnwP5qMAtjjtgJfhtZY2dsA/7gECEQDss1987RWbt5cwRVUTvobBAhEAnWwkDETrEmOHv8IcRSiWOQIQY3D0Q9qiwlm99bSbCoF3wQIQVYRzqL6fvOOY0REP7nn38QIQL82SsMTJL5Eh1YymVKgj2A==
EMAIL=@gmail.com
EMAIL_PASSWORD=ojhg567ujhgfgh

```

![](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white) ![test](https://img.shields.io/badge/Installar%20Docker-%20recomendado-blue)

4.-Si tienes docker instalado puedes ejecutar el siguiente comando:

```

    npm run dev:build

```

> Nota solo es necesario construir la primera vez, posteriormente solo ejecuta `npm run dev`

5.- Para crear la DB, debes de abrir otro terminal ejecutar el siguiente comando:

![](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)

```
docker exec -it taskmaster sh

sequelize-cli db:migrate

sequelize-cli db:seed:all
```

> Con eso ya debe de quedar corriendo la app, mas información sobre las [migraciones](https://sequelize.org/docs/v6/other-topics/migrations/)

6.-Si no tienes ![test](https://img.shields.io/badge/-%20Docker%20instalado-red) ejecuta este correrlo dentro de tu equipo local para instalar las dependencias:

```

    npm i
    sequelize-cli db:migrate
    npm start

```

# Cómo usar:

![](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white) ![](https://img.shields.io/badge/iTerm2-000000?style=for-the-badge&logo=iterm2&logoColor=white)

Una vez descargado, puedes ejecutar los siguiente endpoints en un cliente rest, te recomiendo que importes las siguientes peticiones curl o tambien lo puedes ejecutar en una terminal directamente si lo deseas:

Crear un usuario:

```
curl --location --request POST 'http://localhost:3600/api/v1/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Oscar",
    "surname": "Morales",
    "nickname": "Moralex",
    "email": "oscar@moralexcode.com",
    "password": "1234$"
}'
```

Hacer login y generar un token:

```
curl --location --request POST 'http://localhost:3600/api/v1/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "oscar@moralexcode.com",
    "password": "1234$"
}'
```

Crear un proyecto:

```
curl --location --request POST 'http://localhost:3600/api/v1/projects' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiZGF0YVVzZXIiOnsibmFtZSI6Ik9zY2FyIiwiZW1haWwiOiJvc2Nhci5tb3JhbGVzQGdtYWlsLmNvbSIsInVzZXJfaWQiOjIsImZpcnN0X3RpbWUiOm51bGx9LCJpYXQiOjE2NzU2MzEyNDEsImV4cCI6MTY3ODIyMzI0MX0.LHMLvx4S-biGAZlW-jI951QddDVYBL6Z6fS8vfVFijI' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"trabajo",
    "description":"Todos mis proyectos de trabajo van aqui"
}'
```

Crear una recordatorio:

```
curl --location --request POST 'http://localhost:3600/api/v1/reminders' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiZGF0YVVzZXIiOnsibmFtZSI6Ik9zY2FyIiwiZW1haWwiOiJvc2Nhci5tb3JhbGVzQGdtYWlsLmNvbSIsInVzZXJfaWQiOjIsImZpcnN0X3RpbWUiOm51bGx9LCJpYXQiOjE2NzU2MzEyNDEsImV4cCI6MTY3ODIyMzI0MX0.LHMLvx4S-biGAZlW-jI951QddDVYBL6Z6fS8vfVFijI' \
--header 'Content-Type: application/json' \
--data-raw '{
    "interval": {
        "time": "80:30 AM",
        "start":"2022-10-29",
        "end":"2222-10-29",
        "each":"day"
    }
}'
```

crear una tarea:

```
curl --location --request POST 'http://localhost:3600/api/v1/tasks' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiZGF0YVVzZXIiOnsibmFtZSI6Ik9zY2FyIiwiZW1haWwiOiJvc2Nhci5tb3JhbGVzQGdtYWlsLmNvbSIsInVzZXJfaWQiOjIsImZpcnN0X3RpbWUiOm51bGx9LCJpYXQiOjE2NzU2MzEyNDEsImV4cCI6MTY3ODIyMzI0MX0.LHMLvx4S-biGAZlW-jI951QddDVYBL6Z6fS8vfVFijI' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title":"Ir al aeropuerto",
    "description":"Recoger el paquete de un amigo",
    "when":"2022-10-29 12:00:00",
    "project_id": 12,
    "reminder_id":2
}'
```

> Nota: remplazar el `project_id` y `reminder_id` de la peticion anterior por los que te regrese tu petición.

> Puedes crear un contraseña de apicacion siguiendo este [video](https://www.youtube.com/watch?v=KjheexBLY4A)

# Ejecutar los test

Ejecutar todos los test dentro del contenedor:

```
 docker compose run --rm taskmaster  npm run test:watch
```

Ejecutar todos los test en tu local:

```
npm run test
```

Ejecutar un solo test:

```
npm run test -- -t "User Login"
```

Ejecutar test que contenga la palabra "tasks"

```
npm run test -- -t "task"
```

Ejecutar los test cada vez que hay un cambio:

npm run test:watch

# Licencia

MIT

# Conclusión

Para dudas, comentarios y soporte contactar al ![test](https://img.shields.io/badge/Ing-%20Oscar%20Morales-green) por correo : [oscarmorales.fullstackdeveloper@gmail.com](oscarmorales.fullstackdeveloper@gmail.com)

![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white) [OSCAR MORALES](https://www.linkedin.com/in/oscar-morales-garcia/)

![personal-brand-screenshot](.github/personal-brand.png)
