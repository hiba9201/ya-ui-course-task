'use strict';

module.exports = {
    // Включаем отладочный режим приложения
    debug: true,

    // Фиксируем порт для локальной разработки
    port: 8081,

    // Статичное содержимое раздаём из приложение через express.static
    staticBasePath: '/',

    dbUri: process.env.DB_URI
};
