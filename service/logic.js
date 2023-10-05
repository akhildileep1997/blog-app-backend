const db = require('./db')

const jwt =require('jsonwebtoken')

// register api
const register=(userName,userId,password)=>{
    return db.User.findOne({userId}).then((response)=>{
      console.log(response);
      if(response){
          return{
              statusCode:401,
              message:"User Id already exist"
          }
      }
      else{
          const newUser=new db.User({
            userName,
            userId,
            password,
          })
          // to store to mongodb
          newUser.save()
          // response send back to the client
          return {
              statusCode:200,
              message:"registration successfull"
          }
      }
    })
  }
  // login api
  const login=(userId,password)=>{
    return db.User.findOne({userId,password}).then((response)=>{
      if(response){
        const token = jwt.sign(
          {
            loginId:userId
          },'superkey2023')
        return{
          userId:response.userId,
          user:response.userName,
          statusCode:200,
          message:'login succesfull',
          token
        }
      }else{
        return{
          statusCode:400,
          message:'Invalid userId or password'
        }
      }
    })
  }
  // api for add blog
  const addBlog = (userId,blogId,title,subTitle,content,imageUrl,UserId) =>{
   return db.User.findOne({userId}).then((result)=>{
    if(result)
    {
      return db.Blog.findOne({blogId}).then((response)=>{
        if(response){
        return{
          statusCode:401,
          message:"the blog id is in use , Please enter a new id for blog"
        }
      }else{
        const blog = new db.Blog({
          blogId,
          title,
          subTitle,
          content,
          imageUrl,
          UserId,
      
         })
           blog.save();
           return{
            statusCode:200,
            message:'blog added successfully'
           }
      }
      })

    }else{
      return{
        statusCode:400,
        message:'cannot add blog'
      }
    }
   })
  }

  // for fetching blog to timeline
  const displayBlog =()=>{
    console.log('inside logic');
  return db.DashboardBlog.find().then((response)=>{
    console.log('inside logic2');

  if(response){
    console.log('inside logic3');
    console.log(response);
    return{
      response:response,
      statusCode:200,
      message:'data fetched successfully'
    }
  }else{
    return{
      statusCode:400,
      message:'unable to fetch data'
    }
  }
  })
  }

  //////////////////fetching blog to admin account/////////////////////////
  const displayAllBlog =()=>{
    console.log('inside logic');
  return db.Blog.find().then((response)=>{
    console.log('inside logic2');

  if(response){
    console.log('inside logic3');
    console.log(response);
    return{
      response:response,
      statusCode:200,
      message:'data fetched successfully'
    }
  }else{
    return{
      statusCode:400,
      message:'unable to fetch data'
    }
  }
  })
  }
  /// logic to fetch users list
  const getAllUser = () =>{
  return db.User.find().then((response)=>{
    if(response){
      return{
        response:response,
        statusCode:200,
        message:'successful.'
      }
    }else{
      return{
        statusCode:400,
        message:'failed to fetch data'
      }
    }
  })
  }

  //logic to view user added blog in account
  const viewBlog =(UserId) =>{
    console.log(UserId);
        return db.DashboardBlog.find({UserId}).then((result)=>{
          if(result){
            console.log(result);
            console.log('logic 2');
            return{
              result:result,
              statusCode:200,
              message:'successful'
            }
          }else{
            return{
              statusCode:400,
              message:'not found'
            }
          }
        })
        .catch((error)=>{
          console.log(error);
        })
      }
    
  

  //logic for removing blog
  const deleteBlog =(blogId)=>{
   return db.Blog.deleteOne({blogId}).then((response)=>{
   if(response)
   {
   return{
    statusCode:200,
    message:'deleted successfully'
   }
   }
   })
   .catch((error)=>{
    console.log(error);
   })
  }

  // logic for removing blog by the user
const removeBlog = (_id)=>{
 return db.DashboardBlog.deleteOne({_id}).then((response)=>{
  if(response){
    return{
      statusCode:200,
      message:'content removed successfully'
    }
  }else{
    return{
      statusCode:400,
      message:'cannot found id'
    }
  }
 },(error)=>{
  console.log(error);
 })
}

 
  // logic for sending feedback
  const feedback =(userId,name,mail,feedback)=>{
    console.log('userId',userId,name,mail,feedback);
   return db.User.find({userId}).then((response)=>{
    console.log('logic 1');
    if(response)
    {
      console.log('response',response);
      console.log(response.userId);
      console.log('logic 2');
      const feed = new db.Message({
        name,
        mail,
        feedback
      })
      feed.save();
      return{
        response:response,
        statusCode:201,
        message:'feedback send successfully'
      }
    }else{
         console.log('>>>>');
      return{
        statusCode:401,
        message:'invalid user id'
      }
    }
   })
   .catch((error)=>{
    console.log('error>>>>',error);
   })
  }


  // logic for displaying feedback
  const viewMessage=(name,mail,feedback)=>{
 return db.Message.find().then((response)=>{
  if(response)
  {
    return{
      response:response,
      statusCode:200,
      message:'success'
    }
  }
 })
 .catch((error)=>{
  console.log(error);
 })
  }

  ////////////////////////// admin approval/////////////////////////////
  const addDashboardBlog =(blogId,title,subTitle,content,imageUrl,UserId)=>{
    console.log(title,subTitle,content,imageUrl,UserId);
   return db.Blog.findOne({UserId}).then((result)=>{
   if(result){
    return db.DashboardBlog.findOne({blogId}).then((response)=>{
      if(response){
        return{
          statusCode:401,
          message:"blog already added"
        }

      }else{
        const blogs = new db.DashboardBlog({
          blogId,
          title,
          subTitle,
          content,
          imageUrl,
          UserId
        })
        blogs.save();
        return{
          statusCode:200,
          message:'blog added successfully'
        }
      }
    })
   }else{
    return{
      statusCode:400,
      message:'invalid user id'
    }
   }
   })
  }

  //logic for deleting account
  const deleteAccount = (userId)=>{
  return db.User.deleteOne({userId}).then((result)=>{
    if(result)
    {
      return{
        statusCode:200,
        message:'Account deleted successfully'
      }
    }else{
      return{
        statusCode:401,
        message:'can not find user id'
      }
    }
  })
  }


  

  module.exports={
    register,
    login,
    addBlog,
    displayBlog,
    viewBlog,
    getAllUser,
    deleteBlog,
    removeBlog,
    feedback,
    viewMessage,
    addDashboardBlog,
    displayAllBlog,
    deleteAccount
  }


