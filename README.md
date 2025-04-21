Make sure your in the main folder

Installation

```bash
npm i --legacy-peer-deps
```

Run

```bash
npm run dev
```

## Run image

```bash
docker run -p 3000:3000 -e NEXT_PUBLIC_BASE_URL=http://127.0.0.1:8000/api/v1 yasyn/web-skin-analyzer
```

## Build imgage

```bash
docker build -t yasyn/web-skin-analyzer --build-arg NEXT_PUBLIC_BASE_URL=http://127.0.0.1:8000/api/v1 .
```

```bash
docker push yasyn/web-skin-analyzer:latest
```
