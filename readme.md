# Dockerize React + API + PostgreSQL

Cấu trúc ban đầu của dự án gồm API server (Node.js/restify), frontend React và database PostgreSQL, chạy bằng Docker Compose.

## Cấu trúc thư mục

| Tên | Ý nghĩa |
|---|---|
| `api-server/` | Mã nguồn API Server |
| `frontend-react/` | Mã nguồn React |
| `.env` | Biến môi trường (không đưa lên git) |
| `.env.sample` | Mẫu biến môi trường (đưa lên git) |
| `.gitignore` | Các thư mục/tập tin bị bỏ qua khi push |
| `Dockerfile` | Thông tin để tạo image |
| `docker-compose.yml` | Khai báo nhiều container liên quan nhau |

## Thiết lập

1. Sao chép `.env.sample` thành `.env` và điền giá trị.
2. Tạo API: `cd api-server && npm init -y && npm install --save restify pg knex && npm install --save-dev nodemon`, sau đó tạo `index.js` và `knexfile.js`.
3. Tạo React: `npx create-react-app frontend-react`, sau đó xóa thư mục `node_modules` bên trong.
4. Chạy tất cả: `docker compose up --build`

## Cổng

- API: http://localhost:8080
- Frontend: http://localhost:3000
- PostgreSQL: localhost:5432

## Lưu ý

- Mỗi khi thêm thư viện vào `package.json`: xóa `node_modules` trên máy rồi `docker compose up --build`.
- Dev dùng `nodemon`, triển khai thật dùng `pm2` và không mount volume mã nguồn.
