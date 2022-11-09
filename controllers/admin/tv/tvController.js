const db = require("../../../config/db.config")

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
                    res.render('admin/tv/edit-channel',{flashMessage:'',title:'Edit channel',channel:data[0]})
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
    let {channel_id,channel_name,m3u8_link} = req.body
    console.log(req.body.thumbnail)
    console.log(req.body)
    return
    try {
        db.query("update tv set channel_name = ? ,link = ? where id = ? ",[channel_name,m3u8_link,channel_id],(e,data)=>{
            if(e){
                next(e)
            }else{
                res.redirect(`/admin/tv/edit-channel?channel_id=${channel_id}`)
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