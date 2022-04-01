# front-spimed

This repo contains a login page, and logged in users can update their password. The front is available at http://localhost:8080.

The back is an api on http://localhost:5000.

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

### How to log in

As default, you have three users :

1. 
	- email: romane.thu@gmail.com
	- password: Password123!

2. 
	- email: example2@gmail.com
	- password: Password123!

3. 
	- email: example3@gmail.com
	- password: Password123!