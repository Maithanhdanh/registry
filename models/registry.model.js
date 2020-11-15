const mongoose = require("mongoose")
const Schema = mongoose.Schema

const serviceSchema = new Schema(
	{
		type: { type: String, default: "http", enum: ["http", "https"] },
		ip: { type: String, required: [true, "invalid uid"] },
		port: { type: Number, required: [true, "invalid uid"] },
		service: { type: String, required: [true, "invalid uid"] },
	},
	{
		timestamps: true,
	}
)

/**
 * Methods
 */
serviceSchema.method({
	/**
	 * remove non-public info
	 */
	transform() {
		const transformed = {}
		const fields = ["type", "ip", "port", "service"]

		fields.forEach((field) => {
			transformed[field] = this[field]
		})

		return transformed
	},
})

/**
 * Statics
 */
serviceSchema.statics = {
	/**
	 * Check to create new service
	 *
	 * @param {String} ip service is running on.
	 * @param {Number} port service is running on.
	 * @param {String} service service name.
	 * @returns {Promise<service, Error>}
	 */
	async checkToCreateService(ip, port, service) {
		try {
			if (!ip || !port || !service) throw new Error("missing data")
			//<!-- Get service based on ip, port -->
			const serviceModel = await this.findOne({ ip, port }).exec()

			if (serviceModel) return null
			const newService = new Service({ ip, port, service })
			const doc = await newService.save()

			return doc
		} catch (error) {
			return error.message
		}
	},
	/**
	 * Check to remove service
	 *
	 * @param {String} ip service is running on.
	 * @param {Number} port service is running on.
	 * @returns {Promise<Service, Error>}
	 */
	async checkToRemoveService(ip, port) {
		try {
			if (!ip || !port) throw new Error("missing data")
			//<!-- Get service based on ip, port -->
			await this.deleteOne({ ip, port }).exec()

			return "success"
		} catch (error) {
			return error.message
		}
	},
	/**
	 * Find all subscribed services
	 *
	 * @returns {Promise<Array<Service>, Error>}
	 */
	async findAll() {
		try {
			const services = await this.find({}).exec()
			const transformedServices = services.map((service) => service.transform())
			return transformedServices
		} catch (error) {
			return error.message
		}
	},

	/**
	 * Find IP given by service
	 *
	 * @param {String} service service is served
	 * @returns {Promise<Array<Service>, Error>}
	 */
	async findIpGivenService(service) {
		try {
			if(!service) throw new Error("missing service")

			const services = await this.find({service}).exec()
			if(!services || services.length === 0) throw new Error("invalid service")

			const selectedService = services[Math.floor(Math.random() * services.length)];

			const transformedServices = selectedService.transform()
			return transformedServices
		} catch (error) {
			return error.message
		}
	},
}

const Service = mongoose.model("profile", serviceSchema, "service")
module.exports = { Service }
