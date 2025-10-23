# Nest Http Template

A NestJS template, which used the coolest and fastest stuff.

## Which Tech Stack In Use

- Framework: NestJS (Based on Fastify)
- Language: TypeScript (Best practices, Not AnyScript)
- Database ODM: Typegoose (Write schema once all in TypeScript)
- Bundle Toolchain: @vercel/ncc Bundle (Bundle entry, go node_modules away)
- Package Manager: Yarn (which is fastest)
- DevOps: Docker
- Other: Prettier, ESLint, Husky, Bump Version, etc.

## How to start development

```bash
yarn start:dev
```

## File Structure

```
.
├── app.controller.ts             # Main program root controller
├── app.module.ts                 # Main program root module responsible for aggregating various business modules
├── configs                       # Main program configuration, including database, program, and third-party settings
├── common                        # Directory for storing middleware components
│   ├── adapters                  # Configuration for adapters
│   ├── decorator                 # Business decorators
│   ├── exceptions                # Custom exceptions
│   ├── filters                   # Exception handlers
│   ├── guard                     # Guards and authentication
│   ├── interceptors              # Interceptors for data filtering and response formatting
│   ├── middlewares               # Traditional middlewares
│   └── pipes                     # Pipes
├── constants                     # Constants
├── main.ts                       # Entry point for importing configurations, starting the main program, and importing global services
├── modules                       # Business logic modules
├── processors                      # Core auxiliary modules
│   ├── cache                       # Related to Redis caching
│   ├── database                    # Related to Mongo database
│   ├── helper                      # Helper classes
│   └── logger                      # Custom Logger
├── shared                          # Shared models
│   ├── dto                         # Data validation models
│   ├── interface                   # Interfaces
│   └── model                       # Basic data models
├── utils                           # Utility classes
├── bootstrap.ts                    # Bootstrapping program
└── main.ts                         # Entry point

```