const express = require("express");
var router = express.Router();
var Userinfo = require("../model/User");
const User = require("../model/User");

    router.get('/user',function(req,res){
	if(req.token != ""){
            res.status(200).json({
                userid : req.userid,
        		useremail : req.useremail,
        		username : req.username,
            });
        }else{
            res.json({"success":"not login"})
    	}
    });
    router.post("/login",function(req,res) {
        if((req.body.userid != null)&&(req.body.password != null)){
       	    Userinfo.findOne({"userid":req.body.userid},function(err,user){
      	        if(err){
       	            throw new Error("Error")
      	        }
        	if(!user){
       	            return res.json({"success":"not user"});
       	        }else{
        	    user.comparePassword(req.body.password,function(err,result){
        	        if(err){
        	            throw new Error("Error")
        	        }
        	        if(result == true){
						user.generateToken((err,user)=>{
							res.cookie("w_authExp",user.tokenExp);
							res.cookie("w_auth",user.token).status(200).json({
								"success" : "user login",
								userid = req.body.userid,
								useremail = req.body.useremail,
							})
						});
        	        }else{
        	            return res.json({"success":"dose not match"});
        	        }
        	    })
        	}
            });
    	}else{
            return res.json({"success":"fill all item"});
    	}
    });

    router.post('/logout',function(req,res){
   	if(req.token!=""){
        User.findeOneAndUpdate(
			{userid:req.userid},
			{token:"",tokenExp:""},
			(err,doc)=>{
					if(err) return res.json({"success":"fail",err});
					return res.status(200).send({
						"success":"logout success"
					});
			});
		}else{
			return res.json({"success":"fail"})
		}
    });
	
    router.post('/register',function(req,res){
        if((req.body.userid != null)&&(req.body.password!= null)&&(req.body.useremail != null)){
	    if(req.body.password == req.body.password_check){
	        Userinfo.find({"userid":req.body.userid},function(err,user){
	            if(err){
	                throw new Error("Error")
	            }
	            if(user.length!=0){
	                return res.json({"success":"user already exist"})
	            }else{
	                var user = new Userinfo();
					user.userid=req.body.userid;
					user.username=req.body.username;
					user.password=req.body.password;
					user.useremail=req.body.useremail;
	        		user.save((err,doc) => {
	                    if(err) {throw new Error("Error")}
	                    return res.status(200).json({"success":"submit"})
	                })
	            }
	        });
	    }else{
	        return res.json({"success":"password does not match password_check"})
	    }
	}else{
	    return res.json({"success":"fill the all blank"})
        }
    });
   	
module.exports = router;