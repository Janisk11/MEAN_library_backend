const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const BookData =require('./src/model/Bookdata');
const AuthorData =require('./src/model/Authordata');

var app = new express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

email='admin@gmail.com';
password='Admin123@';

function verifyToken(req,res,next){
    if(!req.headers.authorization)
    {
        return res.status(401).send('Unauthorized request')
    }
    let token=req.headers.authorization.split('')[1]
    if(token=='null')
    {
        return res.status(401).send('Unauthorized request')
    }
    let payload =jwt.verify(token,'secretKey')
    console.log(payload)
    if(!payload)
    {
        return res.status(401).send('Unauthorized request') 
    }
    req.userId=payload.subject
    next()
}


app.post('/login',(req,res)=>{
    let userData =req.body

        if(!email){
          res.status(401).send('Invalid User')  
        }else 
        if(password !== userData.password){
            res.status(401).send('Invalid Password')
        }else{
            let payload={subject:email+password}
            let token = jwt.sign(payload,'secretKey')
            res.status(200).send({token})
        }

})

// Codes for books

app.get('/books',function(req,res){
    res.header('Access-Control-Allow-Origin',"*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE. OPTIONS');
    BookData.find()
    .then(function(bookdatas){
        res.send(bookdatas);
    });
});

app.get('/books:id',  (req, res) => {
  
    const id = req.params.id;
      BookData.findOne({"_id":id})
      .then((book)=>{
          res.send(book);
      });
  })


// insert new book
app.post('/insertbook',verifyToken,function(req,res){
    res.header('Access-Control-Allow-Origin',"*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE. OPTIONS');
    console.log(req.body);
   
    var book = {       
        title : req.body.book.title,
        author : req.body.book.author,
        genere : req.body.book.genere,
        imageUrl : req.body.book.imageUrl,
   }       
   var book = new BookData(book);
   book.save();
});

// edit book
app.put('/updatebook',(req,res)=>{
    console.log(req.body)

    id = req.body._id,
    title = req.body.title,
    author = req.body.author,
    genere = req.body.genere,
    imageUrl = req.body.imageUrl,
   BookData.findByIdAndUpdate({"_id":id},
                                {$set:{"title":title,
                                "author":author,
                                "genere":genere,
                                "imageUrl":imageUrl},
                                
                            })
   .then(function(req,res){
       res.send();
   })
 })

//  remove book
 
app.delete('/removebook/:id',(req,res)=>{
 
   id = req.params.id;
   BookData.findByIdAndDelete({"_id":id})
   .then(()=>{
       console.log('success')
       res.send();
   })
 })

//  end of codes for books

// codes for authors
   
 app.get('/authors',function(req,res){
    res.header('Access-Control-Allow-Origin',"*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE. OPTIONS');
    AuthorData.find()
    .then(function(authordatas){
        res.send(authordatas);
    });
});

app.get('/authors:id',  (req, res) => {
  
    const id = req.params.id;
      AuthorData.findOne({"_id":id})
      .then((author)=>{
          res.send(author);
      });
  })

// insert new author
app.post('/insertauthor',verifyToken,function(req,res){
    res.header('Access-Control-Allow-Origin',"*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE. OPTIONS');
    console.log(req.body);
   
    var author = {       
        
        author : req.body.author.author, 
        imageUrl : req.body.author.imageUrl,
        about : req.body.author.about
   }       
   var author = new AuthorData(author);
   author.save();
});

// edit author
app.put('/updateauthor',(req,res)=>{
    console.log(req.body)

    id = req.body._id,
    author = req.body.author,
    imageUrl = req.body.imageUrl,
    about = req.body.about,
   AuthorData.findByIdAndUpdate({"_id":id},
                                {$set:{
                                "author":author,
                                "imageUrl":imageUrl,
                                "about":about
                            }
                                
                            })
   .then(function(req,res){
       res.send();
   })
 })

//  remove author
 
app.delete('/removeauthor/:id',(req,res)=>{
 
   id = req.params.id;
   AuthorData.findByIdAndDelete({"_id":id})
   .then(()=>{
       console.log('success')
       res.send();
   })
 })

//  end of codes for authors



app.listen(3000,function(){
    console.log('listening to port 3000');
});
