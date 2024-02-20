const mongoose = require('mongoose')

const DB = process.env.MongoUrl

mongoose.connect(DB).then(() => {
    console.log('database connection established successfully');
}).catch((error) => {
    console.log(error);
})