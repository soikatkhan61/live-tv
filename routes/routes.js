const authRoute = require("./authRoute")
const userRoute = require("./userRoute")
const adminRoute = require("./adminRoute")
const taskRoute = require("./taskRoute")
const packageRoute = require("./packageRoute")
const profileRoute = require("./profileRoute")
const HomeRoute = require("./HomeRoute")
const liveTVRoute = require("./liveTVRoute")
const pg = require("./pg")

const {searchResult} = require("../controllers/search")


const routes = [

    {
        path: "/auth",
        handler: authRoute
    },
    {
        path: "/admin",
        handler: adminRoute
    },
    {
        path: "/user",
        handler: userRoute
    },
    {
        path: "/task",
        handler: taskRoute
    },
    {
        path: "/packages",
        handler: packageRoute
    },
    {
        path: "/profile",
        handler: profileRoute
    },
    {
        path: "/pg",
        handler: pg
    },
    {
        path: "/search",
        handler: searchResult
    },
    {
        path: "/live-tv",
        handler: liveTVRoute
    },
    {
        path: "/",
        handler: HomeRoute
    }
]


module.exports = app =>{
    routes.forEach(r =>{
        if(r.path === '/'){
            app.get('/',r.handler)
        }else{
            app.use(r.path, r.handler)
        }
    })
}