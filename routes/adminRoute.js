const router = require("express").Router()

const upload = require('../middleware/uploadMiddleware')

const {
    isUnAuthenticated,
    isAuthenticated,
    checkAdmin
} = require('../middleware/authMiddleware')

const {adminDashboardGetController,packageAnalysticGetController} = require('../controllers/admin/adminController')
const {adminPackageGetController,packageEditGetController,packageEditPostController,pkgApproveGet,pkgApproved,pkgApprovePost} = require("../controllers/admin/adminPackageController")

const {msgGetContrller,singleMsgGetContrller,deleteMsgGetContrller,respondMessage} = require("../controllers/contactUsController")


const {renderTvController,renderAllChannels,createChannelPostController,editChannelGetController,editChannelPostController,deleteChannel} = require('../controllers/admin/tv/tvController')


router.get("/tv/all-channels",isAuthenticated,checkAdmin,renderAllChannels)
router.post("/tv/create-channel",isAuthenticated,checkAdmin,upload.single('thumbnail'),createChannelPostController)
router.get("/tv/edit-channel",isAuthenticated,checkAdmin,editChannelGetController)
router.post("/tv/edit-channel",isAuthenticated,checkAdmin,upload.single('thumbnail'),editChannelPostController)
router.get("/tv/delete",isAuthenticated,checkAdmin,deleteChannel)
router.get("/tv",isAuthenticated,checkAdmin,renderTvController)


router.get("/messages/respond",isAuthenticated, respondMessage)
router.get("/messages/:msg_id",isAuthenticated, singleMsgGetContrller)
router.get("/messages/delete/:msg_id",isAuthenticated, deleteMsgGetContrller)
router.get("/messages",isAuthenticated, msgGetContrller)


router.get("/packages",isAuthenticated,checkAdmin,adminPackageGetController)
router.get("/packages/analystic",isAuthenticated,checkAdmin,packageAnalysticGetController)
router.get("/packages/edit-package",isAuthenticated,checkAdmin,packageEditGetController)
router.post("/packages/edit-package",isAuthenticated,checkAdmin,packageEditPostController)


//router.get("/packages/approve/:payment_id",isAuthenticated,checkAdmin,pkgApprovPostConrtoller)
router.get("/approve-pkg",isAuthenticated,checkAdmin,pkgApproved)
router.get("/packages/approve",isAuthenticated,checkAdmin,pkgApproveGet)
router.get("/packages/approvethis",isAuthenticated,checkAdmin,pkgApprovePost)



router.get("/",isAuthenticated,checkAdmin,adminDashboardGetController)

module.exports = router