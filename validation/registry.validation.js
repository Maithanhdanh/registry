const { body } = require("express-validator")

let serviceInfo = () => {
	return [
		body(["ip"]).trim().exists().notEmpty(),
		body(["port"]).trim().exists().notEmpty(),
		body(["service"]).trim().exists().notEmpty(),
	]
}

let getService = () => {
	return [
		body(["service"]).trim().exists().notEmpty().isString(),
	]
}

let validate = {
	serviceInfo: serviceInfo,
	getService: getService,
}

module.exports = { validate }
