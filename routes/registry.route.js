const express = require("express")
const router = express.Router()
const { validate } = require("../validation/registry.validation")
const controller = require("../controllers/registry.controller")

router.route("/register").post(validate.serviceInfo(), controller.register)
router.route("/unregister").post(validate.serviceInfo(), controller.unregister)

router.route("/status").get((req, res) => res.json("OK"))
module.exports = router
