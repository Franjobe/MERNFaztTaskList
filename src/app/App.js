// archivo principal del frontend app.

import React, { Component } from 'react';

class App extends Component {

  constructor() {
    super(); //sirve para heredar todas las funcionalidades que nos da el componente.
    this.state = {
      title: '',
      description: '',
      tasks: [],
      _id: ''   //este id sirve solo para comprobacion. lo toma y lo setea al apretar edit. Si existe addTasks hace UPDATE, sino existe hace un POST
    };
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
   
  }

  addTask(e) {
    if(this.state._id) {
      //UPDATE
      fetch(`/api/tasks/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify(this.state),
        headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
        } 
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        M.toast({html: 'Tarea actualizada'});
        this.setState({title:'', description:'',_id:''}) //limpia el formulario para que luego por defecto pueda agregar datos nuevamente.
        this.fetchTasks(); //actualiza la vista de la lista.
      })


    } else {
      // CREAR UNO NUEVO
      fetch('/api/tasks', { //fetch sirve para enviar http al servidor. no hace falta el localhost..
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
        } 
      }) 
       .then(res => res.json())
       .then(data => {
        console.log(data)
        M.toast({html: 'Task saved'});  //Noticiaciones de Materialize.
        this.setState({title: '', description:''}); //limpiar el formulario.
        this.fetchTasks();  //actualiza la lista en pantalla al guardar una tarea.
       })
       .catch(err => console.error(err));
    }

    e.preventDefault();  //evita que el propio metodo de envio refresque el navegador.
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    fetch('/api/tasks') //por defecto envia una peticion GET
      .then(res => res.json())
      .then(data => {
        this.setState({tasks: data});
        console.log(this.state.tasks);
      });
  }
  
  deleteTask(id) {
    if(confirm('Are you sure you want to delete it?')) {

      fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
        } 
      })
      .then(res => res.json())              //convierto la respuesta a formato json
      .then(data => {
        console.log(data);  //luego muestro eso en consola.
        M.toast({html: "tarea eliminada"});
        this.fetchTasks();
      });       
    }
  }

  editTask(id){  //primero seteo  el state, luego con addTask veo si existe o no hago un update o post
      fetch(`/api/tasks/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({  //actauliza el state con los datos de la opcion elegida para editar
          title: data.title,
          description: data.description,
          _id: data._id  //este id me sirve para comprobacion
        })
      });
  }

  handleChange(e) {
    const {name, value} = e.target;  //del e.target, quiero solo el name (title y description) y el value
    this.setState({
     [name]: value
    })
  }



  render() {
    return (
        // solo se puede montar un componente a la vez
        <div>
          {/*NAVIGATION*/}
          <nav className="light-blue darken-4"> 
            <div className="container">
              <a className="brand-logo" href="/">MERN STACK</a>
            </div>
          </nav>
          
          <div className="container">
              <div className="row">
                <div className="col s5">
                  <div className="card">

                    <div className="card-content">
                      <form onSubmit={this.addTask}>

                        <div className="row">
                          <div className="input-field col s12">
                            <input name="title" onChange={this.handleChange} value={this.state.title} type="text" placeholder="Task Title" />
                          </div>
                        </div>

                        <div className="row">
                          <div className="input-field col s12">
                            <textarea name="description" onChange={this.handleChange} value={this.state.description} className="materialize-textarea" placeholder="Task Description"></textarea>
                          </div>
                        </div>

                        <button type="submit" className="btn light-blue darken-4">SEND</button>

                      </form>
                    </div>

                  </div>
                </div>
                <div className="col s7">
                  <table>
                    <thead>
                        <tr>
                          <th>Title</th>
                          <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.tasks.map(task => {
                          return (
                            <tr key={task._id}>
                              <td>{task.title}</td> 
                              <td>{task.description}</td>
                              <td>
                                <button className="btn light-blue darken-4" onClick={() => this.deleteTask(task._id)}>
                                  <i className="material-icons">delete</i>
                                </button>
                                <button className="btn light-blue darken-4" style={{margin: "4px"}} onClick={() => this.editTask(task._id)} >
                                  <i className="material-icons">edit</i>
                                </button>
                                </td>
                            </tr>
                          )
                        } )
                      }
                    </tbody>
                  </table>
                </div>
              </div>
          </div>

        </div>
      );
    }
  }


export default App;