const db = require("../../../config/db.config")
const Flash = require("../../../utils/Flash");
exports.getAllUsers = (req,res,next) =>{
    try {
        let currentPage = parseInt(req.query.page) || 1
        let itemPerPage = 10
        db.query("select count(*) as count from users;select * from users",(e,data)=>{
            if(e){
               next(e)
            }else{
                if(data.length > 0){
                    let totalUsers = data[0]
                    let totalPage = totalUsers[0].count / itemPerPage
                    
                    res.render("admin/users/getUsers",{flashMessage:Flash.getMessage(req),title:'',currentPage,itemPerPage,totalPage,users:data[1]})
                }else{
                    res.send("no users found")
                }
            }
        })
    } catch (error) {
        next(error)
    }
};

exports.bannedAnUser = (req,res,next) =>{
    try {
        let user_id = req.query.id
        let unban = req.query.unban
        let sql,flashMessage
        if(unban == 'true'){
            sql = `update users set isBanned='0' where id = ${user_id} `
            flashMessage = 'Unbanned Successlly done'
        }else{
            sql = `update users set isBanned='1' where id = ${user_id} `
            flashMessage = 'Banned Successlly done'
        }
        db.query("select * from users where id = ?",[user_id],(e,data)=>{
            if(e){
               next(e)
            }else{
                if(data.length > 0){
                    db.query(sql,(e,data)=>{
                        if(e){
                            next(e)
                        }else{
                            console.log(data);
                            req.flash('success',flashMessage)
                            res.redirect('/admin/users')
                        }
                    })                        
                }else{
                    res.send("no users found")
                }
            }
        })
    } catch (error) {
        next(error)
    }
};