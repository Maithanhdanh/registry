const { checkHealth } = require("../../utils/checkHealth")
const { Service } = require("../../models/registry.model")
const mongoose = require("../../config/mongoose")
const ENV_VAR = require("../../config/vars")

const ip = "127.0.0.1",
	port = 753951,
	service = "registry"

beforeAll(async () => {
	await mongoose.connect()
})

afterAll(async () => {
	await Service.deleteMany({})
})

describe("Check health of all subscribed service", () => {
	beforeAll(async () => {
		const newService = new Service({ ip, port, service })
		await newService.save()
	})
	it("failed => service was down", async () => {
		await checkHealth()

		setTimeout(async () => {
			const allServices = await Service.findAll()
			console.log(allServices)
			expect(allServices.length).toBe(0)
		}, 5000)
	})
})
