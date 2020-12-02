const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose
        .connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
        .then(() => {
            console.log('Connected to db');
        })
        .catch((e) => {
            console.log(e);
        });
};

module.exports = connectDatabase;
