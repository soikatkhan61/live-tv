const db = require("../config/db.config")

exports.renderHome = (req,res,next) =>{
    try {
        db.query('select channel_name,thumbnails from tv limit 20;select ad_link,ad_image from ad limit 10',(e,data)=>{
            if(e){
                next(e)
            }else{
                console.log(data)
                res.render("index.ejs",{flashMessage:'',tv:data[0],ad:data[1]})
            }
        }) 
    } catch (error) {
        next(error)
    }
   
}