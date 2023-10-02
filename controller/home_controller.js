

module.exports.homePage = async function(req,res){
    try{
        if(req.user){
           return res.redirect('/users/habit');
        }
        return res.render('home',{
            title : "home page"
        });
    }catch(err){
        console.log("Error at home controller homepage",err);
        return;
    }
}