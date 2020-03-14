'use strict';

module.exports = {
    // Включаем отладочный режим приложения
    debug: true,

    // Фиксируем порт для локальной разработки
    port: 8081,

    // Статичное содержимое раздаём из приложение через express.static
    staticBasePath: '/',

    dbOptions: {
        host: 'localhost',
        port: 5432,
        username: 'HIba9201',
        password: 'tisha2006',
        database: 'dev'
    }
};
