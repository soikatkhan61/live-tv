const db = require("../config/db.config")

exports.renderSingleTV = (req,res,next) =>{
    let channel_name = req.params.id
    try {
        db.query("select category from tv;select * from tv where slug = ? limit 1;select channel_name,slug,thumbnails,category from tv;select ad_link,ad_image from ad limit 10",[channel_name],(e,data)=>{
            if(e){
                next(e)
            }else{

                let a = data[0]
                let m = a.map(v=> v.category)
                let unique = [...new Set(m)];

                let channel = data[1]
                let paid = channel[0].paid

                console.log(unique);

                if(paid == 'Free'){
                    console.log("free channel a achi");
                    return res.render("livetv/singletv",{flashMessage:'',title:'TV',cat:unique,single_tv:data[1],tv:data[2],ad:data[3]})
                }else{
                    console.log(req.user);
                    if(!req.user){
                        console.log('need to logged in');
                        return res.redirect('/auth/login')
                    }else{
                        db.query('select user_id from pkg_subscriber where user_id=?',[req.user.id],(e,userSubcribed)=>{
                            if(e){
                                next(e)
                            }else{
                                if(userSubcribed.length>0){
                                    return res.render("livetv/singletv",{flashMessage:'',title:'TV',cat:unique,single_tv:data[1],tv:data[2],ad:data[3]})
                                }else{
                                    return res.render("pages/utils/buypackage",{flashMessage:'',title:'Buy Packages'})
                                }
                            }
                        })
                    }
                }
          
            }
        })
    } catch (error) {
        next(error)
    } 
}

exports.renderLiveTV = (req,res,next) =>{
    try {
        db.query('select category from tv;select channel_name,slug,thumbnails,category,paid from tv;select ad_link,ad_image from ad limit 10',(e,data)=>{
            if(e){
                next(e)
            }else{
                let a = data[0]
                let m = a.map(v=> v.category)
                let unique = [...new Set(m)];
                res.render("livetv",{flashMessage:'',cat:unique,tv:data[1],ad:data[2]})
            }
        }) 
    } catch (error) {
        next(error)
    }
}


