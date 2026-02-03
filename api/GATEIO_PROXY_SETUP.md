# 🚀 Настройка Gate.io прокси для Arbitrage Radar

## Проблема
Gate.io API блокирует CORS запросы из браузера. Нужен прокси-сервер.

## ✅ Решение: Vercel Serverless Function

### Шаг 1: Подготовь проект на GitHub

1. Создай репозиторий `arbitrage-radar` на GitHub
2. Создай структуру файлов:
```
arbitrage-radar/
├── api/
│   └── gateio.js
├── arbitrage-radar.html
└── vercel.json (опционально)
```

### Шаг 2: Создай файл api/gateio.js

Используй файл `gateio.js` который ты загрузил:

```javascript
export default async function handler(req, res) {
  try {
    const r = await fetch(
      "https://api.gateio.ws/api/v4/futures/usdt/contracts"
    );

    if (!r.ok) {
      return res.status(r.status).json({ error: "Gate.io error" });
    }

    const data = await r.json();
    
    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Cache-Control", "public, s-maxage=60");
    
    res.status(200).json(data);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
```

### Шаг 3: Загрузи на GitHub

```bash
git add .
git commit -m "Add Gate.io proxy"
git push
```

### Шаг 4: Деплой на Vercel

1. Зайди на **vercel.com**
2. **Sign up with GitHub**
3. **New Project**
4. Выбери репозиторий `arbitrage-radar`
5. **Deploy**

### Шаг 5: Получи URL

После деплоя получишь URL:
```
https://arbitrage-radar.vercel.app
```

Твой Gate.io прокси будет доступен по адресу:
```
https://arbitrage-radar.vercel.app/api/gateio
```

### Шаг 6: Обнови HTML файл

В файле `arbitrage-radar.html` замени:

```javascript
// Было:
GATEIO_API: 'https://api.gateio.ws/api/v4/futures/usdt/contracts',

// Стало:
GATEIO_API: 'https://arbitrage-radar.vercel.app/api/gateio',
```

### Шаг 7: Деплой HTML

Загрузи обновлённый `arbitrage-radar.html` в тот же репозиторий.

Vercel автоматически переразвернёт проект.

---

## 🎯 Альтернатива: Netlify Functions

### Структура:
```
arbitrage-radar/
├── netlify/
│   └── functions/
│       └── gateio.js
└── arbitrage-radar.html
```

### Файл: netlify/functions/gateio.js
```javascript
exports.handler = async function(event, context) {
  try {
    const response = await fetch(
      'https://api.gateio.ws/api/v4/futures/usdt/contracts'
    );
    
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Gate.io error' })
      };
    }
    
    const data = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Cache-Control': 'public, max-age=60'
      },
      body: JSON.stringify(data)
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
};
```

### URL:
```
https://arbitrage-radar.netlify.app/.netlify/functions/gateio
```

---

## 🔧 Проверка работы

### Тест прокси:
Открой в браузере:
```
https://ваш-проект.vercel.app/api/gateio
```

Должен вернуть JSON с контрактами Gate.io.

### Проверка в Radar:
Открой `arbitrage-radar.html` и смотри на индикаторы статуса:
- 🟢 Зелёный = Онлайн
- 🟡 Жёлтый = Загрузка
- 🔴 Красный = Офлайн

---

## 📊 Индикаторы статуса

### Что показывают:
```
🟢 Bybit    - Прямое подключение работает
🟢 MEXC     - Прямое подключение работает
🟢 Gate.io  - Прокси работает
```

### Если красный индикатор:
1. Проверь URL прокси в CONFIG
2. Открой консоль браузера (F12)
3. Проверь ошибки сети
4. Убедись что Vercel function развёрнута

---

## 💡 Советы

✅ **Vercel бесплатно:**
- 100 GB bandwidth/месяц
- Неограниченные запросы
- Автодеплой из GitHub

✅ **Кеширование:**
Прокси кеширует данные на 60 секунд (экономит запросы)

✅ **Мониторинг:**
Vercel показывает логи и метрики в dashboard

---

## ⚠️ Важно

1. **Не забудь CORS headers** в прокси
2. **Используй кеширование** (60 секунд оптимально)
3. **Следи за лимитами** Vercel (обычно более чем достаточно)

---

## 🚀 Быстрый старт

```bash
# 1. Клонируй репо
git clone https://github.com/твой-username/arbitrage-radar

# 2. Добавь файлы
mkdir api
# Скопируй gateio.js в папку api/

# 3. Коммит и пуш
git add .
git commit -m "Add Gate.io proxy"
git push

# 4. Деплой на Vercel
# Зайди на vercel.com и импортируй проект

# 5. Обнови CONFIG в HTML
# Замени GATEIO_API на твой Vercel URL

# 6. Готово! 🎉
```

---

Если что-то не получается - пиши, помогу! 💪
