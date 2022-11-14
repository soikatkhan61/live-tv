const db = require("../config/db.config")
const Flash = require("../utils/Flash");

exports.renderSingleTV = (req,res,next) =>{
    let channel_name = req.params.id
    try {
        db.query("select category from tv;select * from tv where slug = ? limit 1;select channel_name,slug,thumbnails,category from tv;select ad_link,ad_image from ad limit 10;select channel_name,slug,thumbnails,category,paid from tv where featured='on' limit 10",[channel_name],(e,data)=>{
            if(e){
                next(e)
            }else{

                let a = data[0]
                let m = a.map(v=> v.category)
                let unique = [...new Set(m)];

                let channel = data[1]
                let paid = channel[0].paid


                if(paid == 'Free'){
                    return res.render("livetv/singletv",{flashMessage:'',title:'TV',cat:unique,single_tv:data[1],tv:data[2],ad:data[3]})
                }else{
                    console.log(req.user);
                    if(!req.user){
                       req.flash("fail",'Premium! Logged in required!')
                        return res.redirect('/auth/login')
                    }
                    else if(req.user.isBanned == '1' ){
                        res.send("You are banned! Contact office for allowed you to our server!")
                    }
                    else{
                        db.query('select user_id,approval_status,pkg_subscriber.createdAt,packages.package_comission from pkg_subscriber JOIN packages on pkg_subscriber.pkg_id = packages.id where pkg_subscriber.user_id=?',[req.user.id],(e,userSubcribed)=>{
                            if(e){
                                next(e)
                            }else{
                                if(userSubcribed.length>0){
                                    let d = userSubcribed[0].createdAt
                                    let valid = d.setMonth(userSubcribed[0].createdAt.getMonth() + userSubcribed[0].package_comission)

                                    console.log(valid);

                                    if(userSubcribed[0].approval_status == 0 || valid - Date.now() <= 0){
                                        return res.redirect('/user/my_package')
                                    }

                                    return res.render("livetv/singletv",{flashMessage:'',title:'TV',cat:unique,single_tv:data[1],tv:data[2],ad:data[3],featured:data[4]})
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


