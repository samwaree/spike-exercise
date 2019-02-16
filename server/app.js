const mongoose = require('mongoose'),
      express = require('express'),
      routes = require('./routes/')
      app = express(),
      bodyParser = require('body-parser'),
      router = express.Router(),
      url = 'mongodb://localhost:27017/spike-exercise-test';

mongoose.connect(url, {useNewUrlParser: true}, function(err) {
    if (err) {
        console.log('Unable to connect to db')
    }
    console.log('Connected to: %s', url)
})
      
let port = 5000

routes(router)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api', router)

app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
})