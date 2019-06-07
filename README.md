# Fastify-Api

## First step
- run ``` $ cp .env.example .env ``` and edit .env
- run ``` $ ln -sr storage/public public/storage ``` for link upload public
- run ``` $ npx sequelize-cli db:migrate ``` for migration database
- run ``` $ npx sequelize-cli db:seed:all ``` for seeder default data to database
- run ``` $ npm run dev ``` for start develop server

## Command

### Run develop server
```
$ npm run dev
```

### Run production server
```
$ npm start
```

### Migration database
- [sequelize document](http://docs.sequelizejs.com/)
- [sequelize-cli document](https://github.com/sequelize/cli)
```
$ npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
$ npx sequelize-cli db:migrate
$ npx sequelize-cli db:migrate:undo:all
$ npx sequelize-cli seed:generate --name demo-user
$ npx sequelize-cli db:seed:all
$ npx sequelize-cli db:seed:undo:all
```

## Api endpoint

### Api document endpoint
  - /v1/doc

## problem

### Error: listen EADDRINUSE: address already in use 127.0.0.1:3000
```
$ sudo kill `sudo lsof -t -i:3000`
```