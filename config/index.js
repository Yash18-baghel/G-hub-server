module.exports = {
    PORT: process.env.PORT,
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASS: process.env.MYSQL_PASS,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'key',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d'
}