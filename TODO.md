# План разработки CodeQuest

## 1. Frontend Migration (Vue.js)

- [ ] **Переписать текущий HTML/JS/CSS frontend на Vue.js 3 (Composition API + TypeScript)**.

### Предлагаемая архитектура (Modular / Simplified FSD):

Структура папок для обеспечения масштабируемости и поддержки:

- **`src/app`**:
  - Настройка Vue приложения, глобальные стили, плагины (Router, Pinia).
- **`src/pages`**:
  - Компоненты-страницы, соответствующие маршрутам (HomeView, CalendarView, ProfileView).
- **`src/widgets`**:
  - Крупные самостоятельные блоки UI, собранные из feature и shared компонентов (Header, Footer, CalendarGrid, ContestList).
- **`src/features`**:
  - Компоненты функциональных действий пользователя (AuthForm, AddEventModal, ContestFilter).
- **`src/entities`**:
  - Бизнес-сущности, их типы и глобальное состояние (Pinia Stores для User, Contest, Event).
- **`src/shared`**:
  - Базовые UI-компоненты (Button, Input, Card), API-клиент (Axios/Fetch wrapper), утилиты и конфиги.

## 2. Backend Development

- [ ] **Разработать Backend с соблюдением принципов SOLID**.
  - Рекомендуемый стек: Node.js (NestJS) или Python (FastAPI/Django) / Go.
  - **S**ingle Responsibility: Разделение на слои (Controllers, Services, Repositories).
  - **O**pen/Closed: Использование стратегий и плагинов для расширения функционала.
  - **L**iskov Substitution: Корректное использование наследования.
  - **I**nterface Segregation: Создание узкоспециализированных интерфейсов/DTO.
  - **D**ependency Inversion: Использование Dependency Injection (DI) для связи компонентов.

## 3. Infrastructure & Deployment (Railway)

- [ ] **База данных**:
  - Создать проект на [Railway](https://railway.app/).
  - Развернуть PostgreSQL (или другую SQL БД).
  - Настроить переменные окружения для подключения.
- [ ] **Деплой монорепозитория**:
  - Настроить структуру проекта для деплоя (client/server папки).
  - Настроить `railway.json` или Dockerfile для сборки обоих частей приложения.
  - Задеплоить Frontend (как статику или SSR) и Backend сервис в рамках одного проекта Railway.
