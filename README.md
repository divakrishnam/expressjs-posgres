```
npm install -D @babel/cli @babel/core @babel/node @babel/preset-env jest @types/jest supertest nodemon
```

```
npm install bcrypt sequelize sequelize-cli jsonwebtoken pg express dotenv morgan cls-hooked 
```

```
docker-compose up -d
```

```
docker ps
```

```
npx sequelize migration:generate --name create_users_table

npx sequelize migration:generate --name create_roles_table

npx sequelize migration:generate --name create_refresh_token_table
```

```
npx sequelize db:migrate --env test
```

```
npx sequelize db:migrate:undo --name 20211124045321-create_roles_table --env test

npx sequelize db:migrate:undo:all --env test
```

```
npx sequelize db:migrate:status
```

IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined.

F2 = Rename