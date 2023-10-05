const express = require('express')
const cors=require('cors')
const logic=require('./service/logic')
const jwt = require('jsonwebtoken')

const server = express()
server.use(cors({
    Origin:'http://localhost:4200/'
}))
server.use(express.json())

server.listen(5000,()=>{
    console.log('server is listening in port 5000');
})

server.get('/',(req,res)=>{
    res.send("welcome to backend")
})
//setting middleware
const jwtMiddleware = (req,res,next)=>{
console.log('router level middleware');
try{
    const token = req.headers['verify-token']
    console.log(token);
    const data = jwt.verify(token,'superkey2023')
    console.log(data);
    req.userId = data.loginId
    next();
}
catch{
    res.status(401).json({message:"Please Login"})
}
}

// for register
server.post('/register',(req,res)=>{
    console.log('inside register api');
    console.log(req.body);
    logic.register(req.body.userName,req.body.userId,req.body.password).then((response)=>{
        res.status(response.statusCode).json(response)
    })
})
// for login
server.post('/login',(req,res)=>{
    console.log('inside login api call');
    console.log(req.body);
    req.userId=req.body.userId
    logic.login(req.body.userId,req.body.password).then((response)=>{
    res.status(response.statusCode).json(response)
    })
})
// for adding blog to admin
server.post('/addBlog',jwtMiddleware,(req,res)=>{
    console.log('inside addBlog api');
    console.log(req.body);
    console.log(req.title);
    logic.addBlog(req.userId,req.body.blogId,req.body.title,req.body.subTitle,req.body.content,req.body.imageUrl,req.body.UserId).then((response)=>{
    res.status(response.statusCode).json(response)    
    })
})

////////////////////////////////add dashboard blog
server.post('/add-dashboard-blog',jwtMiddleware,(req,res)=>{
console.log('inside dashhhhhhhhhhhhhhhh api',);
console.log(req.body);
// console.log(req.body.UserId);
logic.addDashboardBlog(req.body.blogId,req.body.title,req.body.subTitle,req.body.content,req.body.imageUrl,req.body.UserId).then((response)=>{
    res.status(response.statusCode).json(response)
})
})

// for displaying blog
server.get('/displayAllBlog',jwtMiddleware,(req,res)=>{
    console.log('inside displayBlog api');
    logic.displayBlog().then((response)=>{
    res.status(response.statusCode).json(response)
    })
})

/////////////////displaying blog to admin page
server.get('/display-blog',jwtMiddleware,(req,res)=>{
    console.log('inside admin displayBlog api');
    logic.displayAllBlog().then((response)=>{
    res.status(response.statusCode).json(response)
    })
})

// for displaying individual blogs
server.get('/displayBlog/:id',jwtMiddleware,(req,res)=>{
    console.log('inside user blog in account api',req.params.id);                            
    let UserId=req.params.id
    logic.viewBlog(UserId).then((response)=>{
        res.status(response.statusCode).json(response)
    })
})

// for displaying users list in admin page
server.get('/users',jwtMiddleware,(req,res)=>{
    console.log('inside users api call >>>>>>');
    logic.getAllUser().then((response)=>{
        res.status(response.statusCode).json(response)
    })
})

//for deleting blog Admin part
server.delete('/removeBlog/:id',jwtMiddleware,(req,res)=>{
    console.log('inside delete api call,',req.params.id);
    let blogId=req.params.id
   logic.deleteBlog(blogId).then((response)=>{
    res.status(response.statusCode).json(response)
   })
})

////////////////////////for deleting blog from user part
server.delete('/remove-blog/:id',jwtMiddleware,(req,res)=>{
    console.log('inside delete api call from user,',req.params.id);
    let blogId=req.params.id
   logic.removeBlog(blogId).then((response)=>{
    res.status(response.statusCode).json(response)
   })
})


//adding feedback
server.post('/feedback',jwtMiddleware,(req,res)=>{
    console.log('inside feedback api');
    console.log('body',req.body);
    // let userId = req.body.userId
    logic.feedback(req.userId,req.body.name,req.body.mail,req.body.feedback).then((response)=>{
        res.status(response.statusCode).json(response)
    })
})
//displaying message
server.get('/message',jwtMiddleware,(req,res)=>{
    console.log('inside display message api');
    logic.viewMessage().then((response)=>{
        res.status(response.statusCode).json(response)
    })
})
//deleting account
server.delete('/delete-account',jwtMiddleware,(req,res)=>{
    console.log('inside delete account api call');
    logic.deleteAccount(req.userId).then((response)=>{
        res.status(response.statusCode).json(response)
    })
})
                                