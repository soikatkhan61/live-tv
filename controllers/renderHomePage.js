const db = require("../config/db.config")

exports.renderHome = (req,res,next) =>{
    try {
        db.query('select channel_name,thumbnails from tv limit 20',(e,data)=>{
            if(e){
                next(e)
            }else{
                console.log(data)
                res.render("index.ejs",{flashMessage:'',tv:data})
            }
        }) 
    } catch (error) {
        next(error)
    }
   
}