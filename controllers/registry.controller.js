const responseReturn = require("../response/responseReturn")
const { Service } = require("../models/registry.model")
const { validationResult } = require("express-validator")
const resReturn = new responseReturn()
/**
 * Get Service by objectId and update
 *
 * @param {String} id ObjectId.
 * @param {object} data searchItem/viewItem - Service's activity.
 * @returns {Promise<Service, Error>}
 */
exports.register = async (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return resReturn.failure(req, res, 400, errors.array())
	}
	try {
		const { ip, port, service } = req.body
		const newService = await Service.checkToCreateService(ip, port, service)
		if (!newService) return resReturn.success(req, res, 200, "already exists")

		resReturn.success(req, res, 200, "success")
	} catch (error) {
		resReturn.failure(req, res, 500, error.message)
	}
}

/**
 * Get Service by objectId and update
 *
 * @param {String} id ObjectId.
 * @param {object} data searchItem/viewItem - Service's activity.
 * @returns {Promise<Service, Error>}
 */
exports.unregister = async (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return resReturn.failure(req, res, 400, errors.array())
	}
	try {
		const { ip, port, service } = req.body
		const response = await Service.checkToRemoveService(ip, port, service)

		resReturn.success(req, res, 200, response)
	} catch (error) {
		resReturn.failure(req, res, 500, error.message)
	}
}

/**
 * Provide IP based on given service
 *
 * @param {String} service ObjectId.
 * @param {object} data searchItem/viewItem - Service's activity.
 * @returns {Promise<Service, Error>}
 */
exports.getService = async (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return resReturn.failure(req, res, 400, errors.array())
	}
	try {
		const { service } = req.body
		const response = await Service.findIpGivenService(service)
		if(response === 'invalid service') throw new Error(response)
		resReturn.success(req, res, 200, response)
	} catch (error) {
		resReturn.failure(req, res, 400, error.message)
	}
}
