const db = require("../config/db.config")

exports.renderSingleTV = (req,res,next) =>{
    let channel_name = req.params.id
    db.query("select * from tv where channel_name = ? limit 1;select channel_name,thumbnails from tv",[channel_name],(e,data)=>{
        if(e){
            next(e)
        }else{
            res.render("livetv/singletv",{flashMessage:'',title:'TV',single_tv:data[0],tv:data[1]})
        }
    })
    
}
