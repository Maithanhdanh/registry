const { body } = require("express-validator")

let serviceInfo = () => {
	return [
		body(["ip"]).trim().exists().notEmpty(),
		body(["port"]).trim().exists().notEmpty(),
		body(["service"]).trim().exists().notEmpty()
	]
}

let validate = {
	serviceInfo: serviceInfo,
}

module.exports = { validate }
