# Node.js Backend with Express, TypeScript, TypeORM & SQL Server

## Features
- Express.js for building APIs
- TypeScript for  strict typing
- TypeORM for database ORM
- SQL Server running in Docker
- User authentication with token
- Excel chat import
- Task filtering (completed/pending)

## Prerequisites

- Node.js >= 18
- Yarn >= 1.22
- Docker & Docker Compose

yarn
docker compose up -d //To create container from sql-server image
yarn build     
yarn start


API Endpoints

POST /register — Register new user

POST /login — Login & receive token

GET /download — Import excel sheet from db

GET /tasks?completed= true|false — Filter tasks
