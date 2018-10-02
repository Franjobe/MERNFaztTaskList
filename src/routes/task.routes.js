// Acá se setean todas las rutas CRUD

const express = require("express");
const router = express.Router(); //me devuevle un obj que permite ingresar rutas.

const Task = require("../models/task");

//este obj que permite rutas posibilita el clasico manejador de eventos de express
// aca es en donde luego se define la rest API, y se vincula con la bdd
router.get("/", async (req,res) => {
    const tasks = await Task.find();  //cuadno termine de buscar, que almacene (MIN 42:30 fazt)
    res.json(tasks);
});

//pedir a la BD que muestre una unica task
router.get("/:id", async(req, res) =>{
    //alamcena en una cons, la tarea solicitada a la BD por medio del id.
    const oneTask = await Task.findById(req.params.id);
    res.json(oneTask);
})

router.post("/", async (req, res) => {
    
    //recibe los parametros del body de la petición
    const { title, description } = req.body;
    
    // los guarda de acuerdo al model
    const task = new Task ({
        title: title,
        description: description
    });

    //almacena en la BD. await hace que espere a que termine de guardar para seguir con la sig linea.
    await task.save(); 
    res.json({status: "Task saved"});
});


router.put("/:id", async (req, res) => {

    // recibe los parametros a actualizar y los almacena en la var newTask
    // newTask es una variable, no tiene nada que ver con new Task
    const { title, description } = req.body;
    const newTask = { title: title, description: description};

    //findById es una operaciond de la BDD
    //busca el id que viene en el body de la petición, y lo update con la newTask
    // como es una operacion de la BD, es lenta y con await espera a que termine. 
    await Task.findByIdAndUpdate(req.params.id, newTask);

    res.json({status: "Task updated"});
})


router.delete("/:id", async(req, res) => {
    
    //findById es una operacion de la BD. se le pasa como parametro el id de la petición. 
    //como es una consulta a la BD, va a tomar tiempo, por eso el await.
    await Task.findByIdAndRemove(req.params.id);
    res.json({status: "Task removed"}); //respuesta para que el cliente se entere.
});





//luego exporto el objeto entero, con todas las rutas definidas dentro.
module.exports = router;

