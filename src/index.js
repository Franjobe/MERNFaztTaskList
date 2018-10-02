// www.youtube.com/watch?v=DqpL5UtJHus   
// MIN 1:03

const express = require("express");
const morgan = require("morgan");
const path = require("path");

const { mongoose } = require("./database");

const app = express();

//SETTING (configuracion)
app.set("port", process.env.PORT || 3000);


//MIDDLEWARES (funciones que se ejecutan antes de qie lleguen a las rutas)
app.use(morgan("dev"));
app.use(express.json()); //chequea si cualquier dato que se envia al server es json. Si lo es podemos acceder desde el server y tmb enviar datos
    //esta funcion reemplaza al anterior bodyParser, que habia que instalar dsd npm. ahora viene incluido)


//ROUTES (urls que puede tener nuestro server)
app.use("/api/tasks", require("./routes/task.routes"));
        //aca se define el prefijo de la rest api.

//STATIC FILES(donde estarán los archivos estaticos: html, css, js -> en la carpeta public.)
app.use(express.static(path.join(__dirname, "public"))); //señala donde estan los estaticos.


app.listen(app.get("port"), () => {console.log(`Server on port ${app.get("port")}`)});