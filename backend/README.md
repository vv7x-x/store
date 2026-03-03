# Store Backend

Lightweight Express + SQLite backend for the Next.js frontend in this repo.

Quick start

1. cd backend
2. npm install
3. npm run dev

Server will run on `http://localhost:4000` by default. The API endpoints live under `/api/novels` and support search, pagination and CRUD.

Examples

GET all (paginated):

curl "http://localhost:4000/api/novels?page=1&limit=12&search=محفوظ"

GET single:

curl "http://localhost:4000/api/novels/1"

POST create (JSON body):

curl -X POST -H 'Content-Type: application/json' -d '{"title":"مثال","author":"مؤلف"}' http://localhost:4000/api/novels
