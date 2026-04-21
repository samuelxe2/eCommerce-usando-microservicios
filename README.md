# eCommerce usando Microservicios

Proyecto de ejemplo de un sistema de **eCommerce** construido con una arquitectura de **microservicios** usando [NestJS](https://nestjs.com/), comunicación vía **TCP (transporte de microservicios de Nest)**, persistencia con **PostgreSQL + TypeORM** y orquestación con **Docker Compose**.

## Arquitectura

```
                        ┌──────────────────────┐
       Cliente HTTP ───▶│     API Gateway      │  (Puerto 3000, REST)
                        └──────────┬───────────┘
                                   │  TCP (NestJS Microservices)
              ┌────────────────────┼────────────────────┐
              ▼                    ▼                    ▼
      ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
      │ users-service│     │products-svc  │     │ orders-service│
      │ (TCP :3001)  │     │ (TCP :3002)  │     │ (TCP :3003)   │
      └──────┬───────┘     └──────┬───────┘     └──────┬───────┘
             │                    │                    │
             └──────────┬─────────┴─────────┬──────────┘
                        ▼                   ▼
                 ┌────────────────────────────────┐
                 │   PostgreSQL 15 (puerto 5433)  │
                 │  user_db / products_db /       │
                 │  orders_db                     │
                 └────────────────────────────────┘
```

### Componentes

- **api-gateway**: expone la API REST pública en el puerto `3000` y reenvía las peticiones a los microservicios por TCP.
- **users-service**: microservicio TCP en el puerto `3001`. Gestiona usuarios (DB `user_db`).
- **products-service**: microservicio TCP en el puerto `3002`. Gestiona productos (DB `products_db`).
- **orders-service**: microservicio TCP en el puerto `3003`. Gestiona pedidos (DB `orders_db`).
- **postgres**: única instancia de PostgreSQL compartida por los tres servicios, con bases de datos separadas creadas desde `init-db.sql`.

## Tecnologías

- Node.js 18
- NestJS 11 (`@nestjs/common`, `@nestjs/microservices`, `@nestjs/typeorm`)
- TypeORM
- PostgreSQL 15
- Docker / Docker Compose

## Estructura del repositorio

```
eCommerce-usando-microservicios/
├── api-gateway/        # Gateway REST → TCP
├── users-service/      # Microservicio de usuarios
├── products-service/   # Microservicio de productos
├── orders-service/     # Microservicio de pedidos
├── init-db.sql         # Crea user_db, products_db, orders_db
├── docker-compose.yml  # Orquestación de todos los servicios
└── README.md
```

## Requisitos previos

- [Docker](https://www.docker.com/) y Docker Compose
- (Opcional para desarrollo local sin Docker) Node.js 18+ y PostgreSQL 15

## Ejecución con Docker (recomendado)

Desde la raíz del proyecto:

```bash
docker compose up --build
```

Esto levanta:

| Servicio          | Puerto host | Descripción                         |
|-------------------|-------------|-------------------------------------|
| `api-gateway`     | 3000        | API REST pública                    |
| `users-service`   | 3001        | Microservicio TCP de usuarios       |
| `products-service`| 3002        | Microservicio TCP de productos      |
| `orders-service`  | 3003        | Microservicio TCP de pedidos        |
| `postgres`        | 5433 → 5432 | Base de datos PostgreSQL            |

El `docker-compose.yml` incluye:

- Un **healthcheck** sobre Postgres (`pg_isready`) para que los microservicios solo arranquen cuando la base de datos esté lista.
- Una red `ecommerce-network` de tipo bridge para la comunicación entre contenedores.
- Un volumen `postgres_data` para persistir los datos de Postgres.
- Ejecución automática de `init-db.sql` en el primer arranque para crear las tres bases de datos.

Para detener los servicios:

```bash
docker compose down
```

Para reiniciar limpiando los datos de la base:

```bash
docker compose down -v
```

## Endpoints de la API (vía API Gateway)

Base URL: `http://localhost:3000`

### Usuarios

- `POST /users` — Crear usuario
  ```json
  { "name": "Juan", "email": "juan@mail.com" }
  ```
- `GET /users/:id` — Obtener usuario por id

### Productos

- `GET /products` — Listar productos

### Pedidos

- `POST /orders` — Crear pedido
- `GET /orders/:id` — Obtener pedido por id
- `DELETE /orders/:id` — Eliminar pedido

## Variables de entorno

Las credenciales por defecto (configurables en `docker-compose.yml`) son:

| Variable       | Valor por defecto |
|----------------|-------------------|
| `DB_HOST`      | `postgres`        |
| `DB_PORT`      | `5432`            |
| `DB_USERNAME`  | `postgres`        |
| `DB_PASSWORD`  | `12345`           |
| `DB_DATABASE`  | `user_db` / `products_db` / `orders_db` |

> Para un entorno productivo se recomienda **no** versionar credenciales y usar un archivo `.env` o un gestor de secretos.

## Desarrollo local (sin Docker)

En cada servicio (`api-gateway`, `users-service`, `products-service`, `orders-service`):

```bash
npm install
npm run start:dev
```

Asegúrate de tener una instancia local de PostgreSQL escuchando y las bases `user_db`, `products_db` y `orders_db` creadas (puedes ejecutar `init-db.sql`).

## Comunicación entre servicios

El **API Gateway** usa `ClientsModule` de `@nestjs/microservices` con transporte **TCP** y envía mensajes con patrones `{ cmd: '...' }`:

| Microservicio   | Patrones (`cmd`)                                  |
|-----------------|---------------------------------------------------|
| users-service   | `create_user`, `get_user`                         |
| products-service| `get_products`                                    |
| orders-service  | `create_order`, `get_order`, `delete_order`       |

## Licencia

Proyecto académico sin licencia específica.
