# Pasos de Instalación

## Requisitos
Para poder instalar e iniciar el proceso de desarrollo, necesitas tener instalado 
- Node.js
- Npm

## Comandos
Clona el repositorio, y ejecuta los siguientes comandos de Linux o sus equivalentes de Windows/Mac

```
npm i
cp .env.example .env
```

Luego edita el archivo .env con tus datos de conexión a la base de datos, y una frase para el secreto de tu token JWT

Para poder migrar las tablas de la base de dato, ejecuta el siguiente comando:

```
npx sequelize-cli db:migrate
```