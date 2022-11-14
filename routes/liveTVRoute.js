const router = require("express").Router()


const {renderSingleTV,renderLiveTV} = require('../controllers/clientTVControler')

router.get("/:id",renderSingleTV)
router.get("/",renderLiveTV)
//router.get("/",renderHome)

module.exports = router