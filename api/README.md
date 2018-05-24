# Docker

A prebuilt image exists on
[Dockerhub](https://hub.docker.com/r/mbellgb/ucl-assistant-server/), which you
can pull and run straight away. We recommend using a `.env` file for storing
your environment variables, but you could also just pass them into your docker
run command.

# Secrets

Copy example file and add your UCL API client ID and secret keys. Also, set
`SECRET` to a random value; this will be used for session keys. You can also add
a custom internal port for the server to run on, but for all intents and
purposes, leaving it works fine too (especially if running with Docker and/or
Kubernetes).

```bash
$ cp .env.example .env
$ nano .env

UCLAPI_CLIENT_ID=???
UCLAPI_CLIENT_SECRET=???
SECRET=???
```

# Run on Kubernetes

Build k8s secret from the env file created earlier.

```bash
$ kubectl create secret generic ucl-assistant-backend-secret --from-env-file='.env'
```

Now create the deployments and services from the YAML files:

```bash
$ kubectl create -f ../deployment/backend.yaml
$ kubectl create -f ../deployment/backend-service.yaml
```

And then the service will start up as `ucl-assistant-backend`.
