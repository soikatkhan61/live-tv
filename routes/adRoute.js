const router = require("express").Router()
const upload = require('../middleware/uploadMiddleware')
const {renderCreateAd,createAdPostController,getAllAds,deleteAd,editdGetController,editadPostController} = require('../controllers/adController')
const {
    isAuthenticated,
    checkAdmin
} = require('../middleware/authMiddleware')

router.get("/",isAuthenticated,checkAdmin,renderCreateAd)
router.post("/",isAuthenticated,checkAdmin,upload.single('ad_image'),createAdPostController)

router.get("/get-all-ads",isAuthenticated,checkAdmin,getAllAds)

router.get("/edit",isAuthenticated,checkAdmin,editdGetController)
router.post("/edit",isAuthenticated,checkAdmin,upload.single('ad_image'),editadPostController)

router.get("/delete",isAuthenticated,checkAdmin,deleteAd)

module.exports = router