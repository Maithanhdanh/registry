const express = require("express")
const registryRoutes = require("./registry.route")
const router = express.Router()

router.get("/status", (req, res) => res.json("OK"))

router.use("/registry", registryRoutes)
module.exports = router
