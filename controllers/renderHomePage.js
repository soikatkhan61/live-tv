const db = require("../config/db.config")

exports.renderHome = (req,res,next) =>{
    try {
        db.query('select category from tv;select channel_name,slug,thumbnails,category,paid from tv;select ad_link,ad_image from ad limit 10',(e,data)=>{
            if(e){
                next(e)
            }else{
                let a = data[0]
                let m = a.map(v=> v.category)
                let unique = [...new Set(m)];
                res.render("index.ejs",{flashMessage:'',cat:unique,tv:data[1],ad:data[2]})
            }
        }) 
    } catch (error) {
        next(error)
    }
   
}