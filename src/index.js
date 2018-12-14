const fastify = require('fastify')({
    logger: true
});
const mongoose = require('mongoose');
const db = require('../config/keys').mongoURI;
const routes = require('./routes');
  
// fastify.get('/', async (request, reply) => {
//     return { hello: 'world' }
// });

const swagger = require('./config/swagger');

fastify.register(require('fastify-swagger'), swagger.options);

mongoose.connect(db)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

routes.forEach((route, index) => {
    fastify.route(route)
});
  
const start = async () => {
    try {
        await fastify.listen(3000)
        fastify.swagger()
        fastify.log.info(`Server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start();