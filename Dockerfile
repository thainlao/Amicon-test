# Базовый образ Node.js
FROM node:20-alpine AS builder

# Установка рабочей директории
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Установка зависимостей
RUN npm ci --only=production=false

# Копируем исходники
COPY . .

# Сборка проекта
RUN npm run build

# Второй этап: production
FROM nginx:alpine

# Копируем собранные файлы
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем кастомный nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
