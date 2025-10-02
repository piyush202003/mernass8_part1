const {UserModel} = require('../models/index');

exports.getAllUsers=async(req,res)=>{
    const users = await UserModel.find();
    if (users.length === 0) {
        return res.status(404).json({ 
            success: false,
            message: 'No users found' 
        });
    }
    res.status(200).json({
        success: true,
        data: users
    }); 
}

exports.getUserById=async(req,res)=>{
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (user) {
        return res.status(200).json({
            success: true,
            data: user
        });
    }
    res.status(404).json({
        success: false,
        message: `No user found with id: ${id}`
    }); 
}

exports.createUser=async(req,res)=>{
    const { data } = req.body;
    if (!data || !data.name || !data.email || !data.password) {
        return res.status(400).json({
            success: false,
            message: 'Name, email and password are required'
        });
    }
    const userExists = await UserModel.findOne({ email: data.email });
    if (userExists) {
        return res.status(409).json({
            success: false,
            message: `User already exists with email: ${data.email}`
        });
    }
    const newUser = new UserModel(data);
    await newUser.save();
    res.status(201).json({
        success: true,
        data: newUser
    });
}

exports.updateUser=async(req,res)=>{
    const { id } = req.params;
    const { data } = req.body;
    const user = await UserModel.findById(id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `No user found with id: ${id}`
        });
    }   
    const existEmail = await UserModel.findOne({ email: data.email });
    if (existEmail && existEmail._id.toString() !== id) {
        return res.status(409).json({
            success: false,
            message: `Email already in use: ${data.email}`
        });
    }  
    user.name = data.name || user.name;
    user.email = data.email || user.email;
    user.password = data.password || user.password;
    await user.save();
    res.status(200).json({
        success: true,
        data: user
    });
}

exports.deleteUser=async(req,res)=>{
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `No user found with id: ${id}`
        });
    }
    await UserModel.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        message: `User deleted with id: ${id}`
    });
}