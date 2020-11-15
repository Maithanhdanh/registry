const axiosHealth = require("../config/axiosHealth")
const logger = require("../config/logger")
const { Service } = require("../models/registry.model.js")

// <!-- Check health of all subscribed services -->
exports.checkHealth = async () => {
	const allServices = await Service.findAll()

	allServices.forEach(async (service) => {
		try {
			await axiosHealth({
				method: "GET",
				url: `${service.type}://${service.ip}:${service.port}/${service.service}/status`,
			})

		} catch (error) {
			await Service.findOneAndDelete({
				ip: error.address,
				port: error.port,
            }).exec()

            logger.info(`Service http://${error.address}:${error.port} was down`)
            return 'deleted service'
		}
	})
}
