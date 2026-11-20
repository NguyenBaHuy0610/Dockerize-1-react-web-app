# Hướng dẫn cho dev01 và dev02 khi lấy mã nguồn

## 1. Tạo file .env
Liên hệ leader để lấy giá trị cho file `.env` (tham khảo `.env.sample`):

```bash
cp .env.sample .env
```

## 2. Build các container lần đầu
```bash
docker compose up -d --build
```

Kết nối tới container `api_1` để chạy migration và seeding lần đầu:

```bash
docker exec -it api_1 /bin/bash
knex migrate:latest
knex seed:run
exit
```

## 3. Khi thêm một package vào package.json
1. Sau khi chạy `npm install --save TenPackage`, xóa thư mục `node_modules` vừa được tạo ra.
2. Build lại container tương ứng:

```bash
docker compose up -d --build frontend   # hoặc: api
```