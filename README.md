# front-spimed

This repo contains a login page, and logged in users can update their password. The front is available at http://localhost:8080.
The back is an api on port http://localhost:5000.


### Dockerisation
```bash
docker-compose up -d --build
```

### Install dependencies
```bash
docker-compose exec front npm ci
```

### Compiles and hot-reloads for development
```bash
docker-compose exec front npm run watch
```
