const { Service } = require("../../models/registry.model")
const server = require("../../index")
const request = require("supertest")
const mongoose = require("mongoose")

const data = {
	ip: "localhost",
	port: 5000,
	service: "registry",
}

beforeAll(async () => {
	jest.useFakeTimers()
})

afterAll(async () => {
	await Service.deleteMany({})
	server.close()
})

describe("Registry", () => {
	describe("global app status", () => {
		it("should return ok", async () => {
			const res = await request(server).get("/status").expect(200)
			expect(res.body).toBe("OK")
		})
	})

	describe("product routes status", () => {
		it("should return ok", async () => {
			const res = await request(server).get("/registry/status").expect(200)
			expect(res.body).toBe("OK")
		})
	})

	describe("/register", () => {
		var { ip, port, service } = data
		it("success", async () => {
			const res = await request(server)
				.post(`/registry/register`)
				.send({ ...data })
				.expect(200)

			expect(res.body.error).toBe(false)
			expect(res.body.response).toBe("success")
		})
		it("failed => existed service", async () => {
			const res = await request(server)
				.post(`/registry/register`)
				.send({ ...data })
				.expect(200)

			expect(res.body.error).toBe(true)
			expect(res.body.response).toBe("already exists")
		})

		it("failed => missing input", async () => {
			const res = await request(server)
				.post(`/registry/register`)
				.send({ ip, port })
				.expect(400)
				
			expect(res.body.error).toBe(true)
		})
	})

	describe("/unregister", () => {
		it("success", async () => {
			const res = await request(server)
				.post(`/registry/unregister`)
				.send({ ...data })
				.expect(200)

			expect(res.body.error).toBe(false)
			expect(res.body.response).toBe("success")
		})

		it("failed => missing input", async () => {
			const res = await request(server)
				.post(`/registry/unregister`)
				.send({ })
				.expect(400)

			expect(res.body.error).toBe(true)
		})
	})
})
