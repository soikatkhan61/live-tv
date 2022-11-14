const authRoute = require("./authRoute")
const userRoute = require("./userRoute")
const adminRoute = require("./adminRoute")
const messageRoute = require("./messageRoute")
const packageRoute = require("./packageRoute")
const profileRoute = require("./profileRoute")
const HomeRoute = require("./HomeRoute")
const adRoute = require("./adRoute")
const liveTVRoute = require("./liveTVRoute")




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
        path: "/profile",
        handler: profileRoute
    },
    {
        path: "/packages",
        handler: packageRoute
    },
    {
        path: "/admin-ad",
        handler: adRoute
    },
    {
        path: "/contact",
        handler: messageRoute
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