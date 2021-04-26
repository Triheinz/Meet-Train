const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = require('../app');

module.exports = (app) => {
    console.log(process.env.MONGODB_URL);
    app.use(
        session({
            secret: process.env.SECRET,
            resave: true,
            saveUninitialized: false,
            cookie: {
                maxAge: 3600000,
            },
            store: MongoStore.create({
                mongoUrl: process.env.MONGODB_URL
            })
        })
    )
};