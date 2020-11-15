const axios = require("axios")

// <!-- Initial axios request to AUTHENTICATION server -->
const axiosHealth = axios.create({
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
	}
})
module.exports = axiosHealth
