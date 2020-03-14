'use strict';

const packageMeta = require('../package.json');

module.exports = {
    // Выключаем отладочный режим приложения
    debug: false,

    // Порт приложения принимаем из переменной окружения
    // Heroku может подставить в неё любое удобное ему значение
    port: process.env.PORT,

    // Статичное содержимое забираем из Surge
    staticBasePath: `//${packageMeta.name}.surge.sh/`,

    dbOptions: {
        host: 'balarama.db.elephantsql.com',
        port: 5432,
        username: 'gxzwosbf',
        password: 'zJ-JWCUdmOVHzsJw7BgirJXBVmY9VHmh',
        database: 'gxzwosbf',
    }
};
