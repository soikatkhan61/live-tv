const router = require("express").Router()


const {
    isAuthenticated
} = require('../middleware/authMiddleware')


const {renderMyPackage,renderPkgPayment,pkgPaymentPostContrller} = require("../controllers/user/packageController")
const {dashboardGetController,renderUserSearch} = require("../controllers/user/dashboardController")




router.get("/my_package",isAuthenticated,renderMyPackage)
router.get("/pay/:pkg_id",isAuthenticated,renderPkgPayment)
router.post("/pay",isAuthenticated,pkgPaymentPostContrller)




router.get("/dashboard",isAuthenticated,dashboardGetController)




module.exports = router