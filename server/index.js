const express = require("express");
const app = express();
const cors = require("cors");

const port = 3000;

const pool = require("./db"); // by using a pool we can run querries w postgres
//middleware

app.use(cors());
app.use(express.json()); //req.body

//ROUTES :-
// create a to do 

app.post("/todos" , async (req, res)=>{
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);

        res.json(newTodo.rows[0]);
        
    } catch (error) {
        console.log(error.message);
    }
});
// get all todos 

app.get("/todos" , async (req, res)=>{
    try {
       
        const allTodo = await pool.query("SELECT * FROM todo");

        res.json(allTodo.rows);
        
    } catch (error) {
        console.log(error.message);
    }
});

// get a todo

app.get("/todos/:id" , async (req, res)=>{
    try {
       
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE t_id  = $1",[id]);

        res.json(todo.rows[0]);
        
    } catch (error) {
        console.log(error.message);
    }
});

//update a todo

app.put("/todos/:id" , async (req, res) =>{
    try {
        const { id } = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE t_id = $2",[description,id]);

        res.json("todo was updated");

        
    } catch (error) {
        console.log(error.message);
    }
});

//delete a todo

app.delete("/todos/:id" , async (req, res)=>{
    try {
       
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE t_id = $1 ",[id]);

        res.json("Todo was deleted");
        
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});