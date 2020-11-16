const ENV_VAR = require("./config/vars.js")
const logger = require("./config/logger")
const server = require("./config/express")
const mongoose = require("./config/mongoose")
const { checkHealth } = require("./utils/checkHealth")

mongoose.connect()

server.listen(ENV_VAR.PORT, () => {
	logger.info(`Server is running on port ${ENV_VAR.PORT} (${ENV_VAR.NODE_ENV})`)
	if (ENV_VAR.NODE_ENV !== "test") {
		setInterval(() => checkHealth(), 5 * 60 * 1000)
		checkHealth()
	}
})

module.exports = server
