#!/bin/bash

# Функция для завершения процессов при выходе
cleanup() {
  echo "Остановка backend и frontend..."
  kill $BACKEND_PID
  kill $FRONTEND_PID
  exit
}

# Перехват сигнала SIGINT (Ctrl+C)
trap cleanup SIGINT

# Запуск Backend
echo "Запуск Backend..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Запуск Frontend
echo "Запуск Frontend..."
cd front
npm run dev &
FRONTEND_PID=$!
cd ..

# Ожидание завершения процессов
wait
