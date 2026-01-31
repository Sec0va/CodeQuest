# Архитектура проекта CodeQuest

Проект построен как монорепозиторий, содержащий клиентскую (Frontend) и серверную (Backend) части.

## Технологический стек

### Frontend (`/front`)

* **Framework**: Vue 3 (Composition API, `<script setup>`)
* **Build Tool**: Vite
* **State Management**: Pinia (Stores: `user`, `i18n`)
* **Routing**: Vue Router
* **Styling**: Tailwind CSS
* **Localization**: i18n (собственная реализация через Store)
* **HTTP Client**: Fetch API (обертка в `user.store`)

### Backend (`/backend`)

* **Platform**: Node.js
* **Framework**: Express.js
* **Database ORM**: TypeORM
* **Database**: PostgreSQL
* **Authentication**: JWT (JSON Web Tokens) + Cookies (httpOnly)
* **Validation**: Type-checking, basic input validation
* **Logger**: Winston + Morgan

**Структура папок Backend:**
* `src/controllers`: Обработчики запросов
* `src/models`: TypeORM сущности (Entity)
* `src/repositories`: Слой доступа к данным (Data Access Layer)
* `src/services`: Бизнес-логика
* `src/routes`: Маршрутизация API
* `src/middleware`: Промежуточное ПО (Auth, Error handling)
* `src/utils`: Утилиты (Logger, Helpers)
* `src/interfaces`: TypeScript интерфейсы
* `src/data-source.ts`: Конфигурация подключения к БД

## База данных

Используется PostgreSQL. Схема управляется через TypeORM (режим `synchronize: true` для разработки).

### Основные сущности

1. **User (Пользователь)**
    * `id`: UUID
    * `email`: string (unique)
    * `password`: string (bcrypt hash)
    * `name`: string
    * `role`: 'admin' | 'user'

2. **Contest (Соревнование)**
    * `id`: UUID
    * `title`: string
    * `platform`: string
    * `startTime`: timestamp
    * `url`: string
    * ...

## Безопасность

* **Пароли**: Хеширование с использованием `bcryptjs`.
* **JWT**: Токены хранятся в `httpOnly` Cookies для защиты от XSS.
* **CORS**: Настроен белый список доменов (`localhost:5173`, `localhost:5174`).

## Взаимодействие Frontend и Backend

Frontend отправляет запросы на `http://localhost:3000/api`.
При авторизации сервер устанавливает cookie `token`. При последующих запросах эта cookie автоматически отправляется (
настройка `credentials: 'include'`).
