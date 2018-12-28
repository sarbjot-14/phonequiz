// users-api
//create sever using express
var express = require('express');
var app = express();
var serverIndex = require('serve-index');
var http = require('http');
//create mongodb server
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://sarb:Sarbjot22@ds121599.mlab.com:21599/mydb";


var port = process.env.PORT || 8080;
var users = [];

MongoClient.connect(url, function(err, client){
  if (err) console.log(err);
  //console.log('connected');
  var database = client.db('mydb'); // use

  var phones = database.collection('phones'); // db.documents
  var selections = database.collection('selections');



// parsing body
app.use(express.json());
app.use(express.urlencoded( { extended:false} ));

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm','html'],
  index: "start.html"
}

app.use('/', function(req,res,next){
  console.log(req.method, 'request:', req.url, JSON.stringify(req.body));
  next();
});



app.use('/', express.static('./public', options));
//send homepage when root is requested
app.get('/', function(req,res,next){
  res.sendFile(__dirname + '/index.html');

});



//gives admin access to admin page 
app.get('/admin', function(req,res,next){
  res.sendFile(__dirname + '/admin.html');

});

  
app.post('/current', function(req,res,next){
    // removes previous results from last user
    selections.remove();
    var current= req.body;

   phones.find({}).toArray(function(err, result) {
     if (err) throw err;
     
     
     //takes each phone specs from database
     result.forEach(function(cell){
        //give score to each phone by comparing phone specs and user submission
       //give score based on price
       if(Math.abs(current.price - cell.price)<=3){
         //console.log(cell);
         cell.score= +cell.score + 15;

       }
       else if(Math.abs(current.price - cell.price)<=4){
         // console.log( Math.abs(current.price - cell.price));
         // console.log("yay close");
         // console.log(cell);
         cell.score= +cell.score + 5;
       }
       //give score based on screen size
       if(current.screen==cell.screen){
         cell.score= +cell.score + 20;
       }
       else if(cell.screen== "<4"){
         cell.score= +cell.score -10;
       }
       //give score based on resolution
       if(current.res==cell.res){
         cell.score= +cell.score + 10;
       }
       else if(current.res== ">720"){
         cell.score= +cell.score +10;
       }
       else if(current.res== ">1080"){
         if(cell.res==">2k"){
           cell.score= +cell.score +10;
         }
       }
       //give score based on battery
       if(current.battery==cell.battery){
         cell.score= +cell.score + 15;
       }
       //give score based on camera qualtiy

       if(Math.abs(current.camera - cell.camera)<=10){
         //console.log(cell);

         cell.score= +cell.score + 18;

       }
       else if(Math.abs(current.camera - cell.camera)<=20){
         // console.log( Math.abs(current.price - cell.price));
         // console.log("yay close");
         // console.log(cell);
         cell.score= +cell.score + 7;
       }
       //give score based on memory of phone

       if(current.microSD== cell.microSD){
         cell.score= +cell.score + 15;
       }


       if(current.memory>= cell.memory){
         //console.log("yes it is more");
         cell.score= +cell.score + 15;

       }
       //score on Preferred of user

       console.log(current);
       if (current.company.constructor != Array){
         if(current.company==cell.company){
           cell.score= +cell.score + 10;
         }
        }
        else{

         current.company.forEach(function(comp){
           if(comp==cell.company){
             cell.score= +cell.score + 10;
           }
         });

       }


        //insert result into database
       selections.insert(cell, function(err, result){
         //console.log(result);
       });

     })

   });
  // displays the results 
  res.sendFile(__dirname + '/results.html');
});


//admin inserts phone into database and route back to admin page
app.post('/newPhone', function(req,res,next){
  console.log(req.body);
  //users.push(req.body);
  //console.log("prooly and error"+req.body);
  var aPhone= req.body;
  phones.insert(aPhone, function(err, result){
    console.log(result);
  });


  res.sendFile(__dirname + '/admin.html');

});

app.post('/selections', function(req,res,next){

  selections.find({}).toArray(function(err, result) {
    if (err) throw err;
    //console.log(result);
    res.json(result)
  });

});


});

http.createServer(app).listen(port);
console.log('running on port',port);
