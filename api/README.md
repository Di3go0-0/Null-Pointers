# Project Management System

To install dependencies:

```bash
bun install
```

To run in development mode:

```bash
bun run dev
```

To run in production mode:

```bash
bun run start
```

## Swagger

This project uses Swagger to document the API. The Swagger UI is available at `/swagger`.
`URL/swagger` will redirect to the Swagger UI.

This project was created using `bun init` in bun v1.1.33. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Migrations

To create a new migration:

```bash
bun run migration:create <migration-name>
```

To run all migrations:

```bash
bun run migration:run
```
