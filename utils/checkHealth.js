const axiosHealth = require("../config/axiosHealth")
const logger = require("../config/logger")
const { Service } = require("../models/registry.model.js")

exports.checkHealth = async () => {
	const allServices = await Service.findAll()

	allServices.forEach(async (service) => {
		try {
			const res = await axiosHealth({
				method: "GET",
				url: `${service.type}://${service.ip}:${service.port}/${service.service}/status`,
			})

            if (res === "OK") return null
            
			await Service.findOneAndDelete({
				ip: service.ip,
				port: service.port,
            }).exec()

            logger.info(`Service ${service.type}://${service.ip}:${service.port} run ${service.service} was down`)
            return 'deleted service'
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
