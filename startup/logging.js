const winston = require('winston')
require('winston-mongodb')
require('express-async-errors')
const debug = require('debug')('app:startup')
const morgan = require('morgan')

module.exports = function (app) {
    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' }));
      
      process.on('unhandledRejection', (ex) => {
        throw ex;
      });
      
      winston.add(winston.transports.File, { filename: 'logfile.log' });
      // winston.add(winston.transports.MongoDB, { 
      //   db: 'mongodb://localhost/vidly',
      //   level: 'info'
      // });  

    if(app.get('env') === 'development') {
        app.use(morgan('tiny'))
        debug('Morgan enable...')
    }
}