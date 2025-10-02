const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const {UserModel, ToDoListModel}=require('./models/index');
const {
    getAllUsers,getUserById,createUser,updateUser,deleteUser
}=require('./controllers/user_controller');
const {
    getAllToDoLists,getAllToDoListsByUserId,getToDoListById,createToDoList,updateToDoList,deleteToDoList
}=require('./controllers/todolist_controller');

const app=express();
const PORT=8082;

app.use(express.json());
dotenv.config();
const connectDB=require('./databaseConnection');
connectDB();

app.get('/',(req,res)=>{
    res.send('Hello, World!');
});

// APIs for Users
app.get('/users',getAllUsers);
app.get('/users/:id',getUserById);
app.post('/users',createUser);
app.put('/users/:id',updateUser);
app.delete('/users/:id',deleteUser);



// APIs for ToDoList
app.get('/todolist',getAllToDoLists);
app.get('/todolist/:userId',getAllToDoListsByUserId);
app.get('/todolist/:userId/:taskId',getToDoListById);
app.post('/todolist/:userId',createToDoList);
app.put('/todolist/:userId/:taskId',updateToDoList);
app.delete('/todolist/:userId/:taskId',deleteToDoList);




app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
    console.log(`Database URL: ${process.env.DB_URL}`);
});