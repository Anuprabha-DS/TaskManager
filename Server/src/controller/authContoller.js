const User = require("../model/user")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req,res)=>{
    try{
        const {name, email, password} = req.body

        if(!name || !email || !password){
            return res.status(400).json({ error: 'All field required' });  
        }
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered in users' });
        }
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save() 
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ user, token});
    
    }catch(error){
        res.status(500).json({ message: error.message });  
    }
}


exports.Login = async(req,res)=>{
    try{
        const {email, password}= req.body;
        if(!email || !password){
            return res.status(400).json({ error: 'All field required' });  
        }
        const user = await User.findOne({email})
        console.log(user)
        if (!user) {
            return res.status(401).json({ error: 'Invalid login credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid login credentials' });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET,{ expiresIn: '24h' });
        res.json({
            user: {
                _id: user._id,
                email: user.email
            },
            token
        });
    }catch(error){
        res.status(500).json({ message: error.message });  
    }
}



exports.Logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
};