const { Service } = require("../../models/registry.model")
const mongoose = require("../../config/mongoose")
const mongoDB = require("mongoose")

const ip = "localhost",
	port = 5000,
	service = "registry"

beforeAll(async () => {
	await mongoose.connect()
})

afterAll(async () => {
	await Service.deleteMany({})
})

describe("Service schema", () => {
	it("Service schema and transform method", async () => {
		const newService = new Service({ ip, port, service })
		const doc = await newService.save()
		expect(mongoDB.Types.ObjectId.isValid(doc._id)).toBe(true)

		const transformedDoc = doc.transform()
		expect(Object.keys(transformedDoc).length).toBe(4)
		expect(transformedDoc).toHaveProperty("type")
		expect(transformedDoc.type).toBe('http')
		expect(transformedDoc).toHaveProperty("ip")
		expect(transformedDoc.ip).toBe(ip)
		expect(transformedDoc).toHaveProperty("port")
		expect(transformedDoc.port).toBe(port)
		expect(transformedDoc).toHaveProperty("service")
		expect(transformedDoc.service).toBe(service)
	})
})

describe("service statics", () => {
	describe("Check to create service", () => {
		it("success", async () => {
			var ip = "localhost",
				port = "42109",
				service = "customer"
			const res = await Service.checkToCreateService(ip, port, service)
			expect(mongoDB.Types.ObjectId.isValid(res._id)).toBe(true)
		})

		it("failed => existed service", async () => {
			const res = await Service.checkToCreateService(ip, port, service)
			expect(res).toBeNull()
		})

		it("failed => missing data", async () => {
			const res = await Service.checkToCreateService(ip, port)
			expect(res).toBe("missing data")
		})
	})

	describe("Check to remove service", () => {
		it("success", async () => {
			var ip = "localhost",
				port = "42109"
			const res = await Service.checkToRemoveService(ip, port)
			expect(res).toBe("success")
		})

		it("failed => missing data", async () => {
			const res = await Service.checkToRemoveService(ip)
			expect(res).toBe("missing data")
		})
	})

	describe("find all document", () => {
		it("success", async () => {
			const res = await Service.findAll(ip, port)

			expect(res.length).toBe(1)
			expect(Object.keys(res[0]).length).toBe(4)
			expect(res[0].type).toBe('http')
			expect(res[0].ip).toBe(ip)
			expect(res[0].port).toBe(port)
			expect(res[0].service).toBe(service)
		})
		it("success => return empty service", async () => {
			await Service.checkToRemoveService(ip, port)
			const res = await Service.findAll(ip, port)

			expect(res.length).toBe(0)
		})
	})
})
