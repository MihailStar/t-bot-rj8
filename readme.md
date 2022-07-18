# Учебный Telegram бот «T Bot RJ8»

## Установка

```bash
npm install

echo -e "\
NODE_ENV = <'development'> | <'production'>\n\
BOT_TOKEN = <bot_token>\n\
BOT_ADMIN_ID = <bot_admin_id>\n\
DB_URL = <db_url>/t_bot_rj8\
" > ./.env

# либо

cat > ./.env << EOF
NODE_ENV = <'development'> | <'production'>
BOT_TOKEN = <bot_token>
BOT_ADMIN_ID = <bot_admin_id>
DB_URL = <db_url>/t_bot_rj8
EOF
```

```sql
CREATE DATABASE "t_bot_rj8";
```

## Запуск

```bash
npm start
```
