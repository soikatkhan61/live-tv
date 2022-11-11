const db = require("../../../config/db.config")
const fs = require('fs');
const Flash = require("../../../utils/Flash");

exports.renderTvController = (req,res,next) =>{
    res.render("admin/tv",{title:'TV Panel',flashMessage:''})
}

exports.renderAllChannels = (req,res,next) =>{
    try {
        db.query("select id,channel_name,thumbnails,category,paid,createdAt from tv limit 12",(e,data)=>{
            if(e){
                next(e)
            }else{
                res.render("admin/tv/all-channels",{title:'All Channels',flashMessage:'',tv:data})
            }
        })
    } catch (error) {
        next(error)
    }
    
}

exports.createChannelPostController = (req,res,next) =>{
    let {channel_name,m3u8_link,category,featured,youtube,paid} = req.body

    let thumbnail
    if(req.file){
        thumbnail = `/uploads/${req.file.filename}`
    }
    
    if(!featured){
        featured = 'off'
    }
    if(!youtube){
        youtube = 'off'
    }

    try {
        db.query('insert into tv values(?,?,?,?,?,?,?,?,?,?)',[null,channel_name,thumbnail,m3u8_link,category,paid,featured,youtube,null,null],(e,data)=>{
            if(e){
                next(e)
            }else{
                console.log(data)
                if(data.insertId){
                    console.log("insert successfull")
                }
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.editChannelGetController = (req,res,next) =>{
    let channel_id = req.query.channel_id
    try {
        db.query("select * from tv where id = ? limit 1",[channel_id],(e,data)=>{
            if(e){
                next(e)
            }else{
                if(data.length>0){
                    res.render('admin/tv/edit-channel',{flashMessage: Flash.getMessage(req),title:'Edit channel',channel:data[0]})
                }else{
                    res.send("not found any channel")
                }
            }
        })
    } catch (error) {
        next(error)
    }
}
exports.editChannelPostController = (req,res,next) =>{
    let {channel_id,channel_name,m3u8_link,category,featured,youtube,paid,thumbnail} = req.body
    try {
        db.query("select * from tv where id = ? limit 1",[channel_id],(e,data)=>{
            if(e){
                next(e)
            }else{
                if(data.length>0){
                    if(req.file){
                        console.log(req.file.path)
                        console.log("." + data[0].thumbnails)
                        let path = "public" + data[0].thumbnails
                        fs.unlink(path, function (err) {
                            if (err && err.code == "ENOENT") {
                            // file doens't exist
                            console.info("File doesn't exist, won't remove it.");
                            } else if (err) {
                            // other errors, e.g. maybe we don't have enough permission
                            console.error("Error occurred while trying to remove file");
                            } else {
                            console.info(`removed`);
                            }
                        });
                        thumbnail = `/uploads/${req.file.filename}`
                    }else{
                        thumbnail = data[0].thumbnails
                    }

                    db.query("update tv set channel_name = ? ,link = ?,thumbnails = ?,category=?,featured=?,youtube=?,paid=? where id = ? ",[channel_name,m3u8_link,thumbnail,category,featured,youtube,paid,channel_id],(e,data)=>{
                        if(e){
                            next(e)
                        }else{
                            req.flash("success", "Successfully updated");
                            res.redirect(`/admin/tv/edit-channel?channel_id=${channel_id}`)
                        }
                    })
                }else{
                    res.send("No data found")
                }
               
                
            }
        })

        
    } catch (error) {
        next(error)
    }
}


exports.deleteChannel = (req,res,next) =>{
    let channel_id = req.query.channel_id

    try {
        db.query("delete from tv where id = ?",[channel_id],(e,data)=>{
            if(e){
                next(e)
            }else{
                res.redirect('/admin/tv/all-channels')
            }
        })
    } catch (error) {
        next(error)
    }
}