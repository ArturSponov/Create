// const express = require("express");
// const os = require('os')
// const fs = require('fs')
// const app = express();
// const path = require('path')

// app.use(express.static(path.resolve(__dirname,'public')));
// app.get("/", function(request, response){
      
//     response.sendFile(path.resolve(__dirname,'public', "home.html"));
 
// });
const path=require('path')
const express = require("express");
const { resolve } = require('path');
let currentDate = new Date();
global.date = currentDate
const app = express();
const fs = require('fs');
const { response } = require('express');
app.use(express.static(path.resolve(__dirname, 'public')))
const productRouter = express.Router();
   
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({extended: false});
  
app.get("/", function (request, response) {
    response.sendFile(path.resolve(__dirname , 'public', "home.html"));
    // console.log(request.body)
});

app.post("/api/sing", urlencodedParser, function (request, response) {
    if(!request.body) {return response.sendStatus(400);}
    console.log(request.body);
    // response.json({userName:request.body.userName})
    if (request.body.userName === 'admin' & request.body.userPass == "123456" || request.body.userName === 'admin' &  request.body.userPass == "654321") {
        response.redirect(`/about?name='${request.body.userName}'&username='${request.body.userNime}'&age='${request.body.userAge}'&pass='${request.body.userPass=`****${request.body.userPass[4]}${request.body.userPass[5]}`}'`)
    } else {
        response.sendStatus(404).json({message:"invalid password"});

    }

    // response.end(data);
    
    
    // response.send(`${request.body.userName} - ${request.body.userNime} - ${request.body.userAge} <br> Ваш пароль:${request.body.userPass} <br> Дата запроса: ${global.date}`);
});
app.use("/about", urlencodedParser, function(request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    let userName = request.query.name;
    let userNime = request.query.username;
    let userAge = request.query.age
    let userPass = request.query.pass
    response.send(`
    <h1>Главная страница</h1>
    <h2>Ваш логин ${userName}, ${userNime} </h2>
    <h2>Ваш возвраст: ${userAge}</h2>
    <h3>ваш пароль: ${userPass}</h3>
    <h3>Дата входа:${global.date}</h3>
    <a href="http://localhost:3001/products/create">Добавление товара</a>
    <a href="http://localhost:3001/products/list">Список товаров</a>`)
})
productRouter.use("/create", urlencodedParser, function (request, response) {
    response.sendFile(path.resolve(__dirname , 'public', "create.html"));
    
  });
productRouter.post("/create", urlencodedParser, function (request, response){
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    if(request.body.shopCategory != null & request.body.shopInfo != null & request.body.shopId != null) {
        response.redirect(`/products/list/${request.body.shopId}`)
    } else{
        response.sendStatus(404);
    }
    console.log(request.body)
});
productRouter.use("/product/:id", urlencodedParser, function (request, response) {
    response.send(`<h1 class="kryt">Категория товара: ${request.params.id}</h1>`)
    console.log(request.body)
})
productRouter.use('/list/', urlencodedParser, function (request, response) {
 console.log(request.body)
    response.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
    body{
        margin:0;
    }
    .categor {
        width: 400px;
        height: 150px;
        border-radius: 15px;
        background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
        display: flex;
        margin-left: 10px;

        position:relative;
    }
    .incategor{
        width: 200px;
        height: 79px;
        border-radius: 15px;
        background-color: white;
        display: flex;
        flex-direction:column;
        justify-content: center;
        position:relative;

        margin-top:10px;
        align-items: center;
    }
    .name {
        font-size: 30px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-weight:700;
        color: black;
        margin:0;
    }
    .category{
        font-size: 16px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-weight:700;
        color: black;
        margin:0;
    }
    .imga {
        width: 178px;
        height: 121px;
        border-radius: 15px;
        background-image: url(https://cdn.dxomark.com/wp-content/uploads/medias/post-125428/Apple-iPhone-14-Pro-Max_FINAL_featured-image-packshot-review-1.jpg);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        margin-top: 11px;
        margin-left: 10px;
    }
    .buy {
        width: 200px;
        height: 35px;
        background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
        border-radius: 15px;
        margin-top: 8px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-weight: bold;
        font-size: 23;
        color: white;
        text-align: center;
    }
    .inincategor{

        width: 203px;
        height: 150px;
        margin-left: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    </style>
</head>
<body>
   <h1>Список товаров</h1> 
    <div class="categor">
    <div class="imga"></div>
    <div class="inincategor">
    <div class="incategor">
    
            <p class="name">${request.body.shopInfo}</p> 
            <p class="category">${request.body.shopCategory}</p>
        </div>
        <button class="buy"></button>
        </div> 
    </div>
    <script>
    let a = document.querySelector('.buy')
    a.innerHTML = 'Купить'
    a.addEventListener('click', function() {
        a.innerHTML = 'В корзине';
        a.style.backgroundColor = 'black';
        a.style.borderRadius = '25px';

    a.addEventListener('click', function() {
        a.innerHTML = 'Купить';
        a.style.width = '200px';
        a.style.height = '35px';
        a.style.borderRadius = '15px';
    })
    })
    </script>
</body>
</html>
    
    `
    
    )
})
productRouter.use("/", urlencodedParser, function (request, response) {
    response.sendFile(path.resolve(__dirname , 'public', "main.html"));
})
app.use("/products", productRouter);

app.listen(3001, ()=>console.log("Сервер запущен..."));

// app.use("/about", function(request, response){
//     let userInfo = os.userInfo().username;
//     // let id = request.query.id;
//     response.redirect(301, '/home?' + userInfo)
//     // let userName = request.query.name;
// });
// app.use("/home", function(request,response) {
//     response.sendFile('/home.html')
//     let userInfo = os.userInfo().username;
//     response.send('<h1 class=""ph"">' + userInfo + '</h1>')
    
    
    
// })
