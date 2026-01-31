# Настройка и запуск проекта CodeQuest

## Требования

* **Node.js** (версия 20 или выше)
* **npm** (пакетный менеджер)
* **PostgreSQL** (база данных)

## Установка зависимостей

В корневой директории выполните команду:

```bash
npm run install:all
```

Эта команда установит зависимости для корня, backend и frontend частей проекта.

## Конфигурация

### Backend

Убедитесь, что в файле `backend/.env` настроены следующие переменные:

```dotenv
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=http://localhost:5173,http://localhost:5174
PORT=3000
```

### Frontend

Убедитесь, что в файле `front/.env` настроен адрес API:

```dotenv
VITE_API_BASE=http://localhost:3000
```

## Запуск в режиме разработки

Для одновременного запуска Backend и Frontend используйте скрипт в корне проекта:

```bash
./start.sh
```

Или через npm:

```bash
npm run dev
```

* **Frontend**: http://localhost:5173
* **Backend API**: http://localhost:3000

## Структура проекта

* `/backend` - Серверная часть (Node.js, Express, TypeORM)
* `/front` - Клиентская часть (Vue 3, Vite, Pinia)
* `/docs` - Документация проекта
