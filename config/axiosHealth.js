const axios = require("axios")

// <!-- Initial axios request to AUTHENTICATION server -->
const axiosHealth = axios.create({
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
	},
})

// <!-- middleware to handle response before return data -->
axiosHealth.interceptors.response.use(
	(response) => {
		return response.data
	},
	(error) => {
		// Handle errors
		throw error
	}
)
module.exports = axiosHealth
