const ENV_VAR = require("./config/vars.js")
const logger = require("./config/logger")
const server = require("./config/express")
const mongoose = require("./config/mongoose")

mongoose.connect()
mongoose.initialize()

server.listen(ENV_VAR.PORT, () => {
	logger.info(`Server is running on port ${ENV_VAR.PORT} (${ENV_VAR.NODE_ENV})`)
})

const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = Object.create(null); // or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }

            results[name].push(net.address);
        }
    }
}
console.log(results);
module.exports = server
