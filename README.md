# WYIN feed API

REST API serving historical events.

This is a TypeScript replacement of
[wyin-be-feed](https://gitlab.com/spio-wyin/wyin-be-feed)


## Getting started
1. [Download and install
Docker](https://docs.docker.com/get-started/#download-and-install-docker)

2. Build a container
```
make build
```
or
```
docker build -t wyin-api-feed .
```

3. Run server
```
make run
```
or
```
docker run --rm -p 3000:3000 wyin-api-feed:latest
```

4. Query `/health` endpoint
```
curl -i http://localhost:3000/health
```
