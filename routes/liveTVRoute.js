const router = require("express").Router()

const {renderSingleTV} = require('../controllers/clientTVControler')

router.get("/:id",renderSingleTV)
//router.get("/",renderHome)

module.exports = router