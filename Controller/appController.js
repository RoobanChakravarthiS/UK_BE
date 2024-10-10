const mysqlpool = require('../utils/db');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    const { username, email, password, number } = req.body;

    if (!username || !email || !password || !number) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const userUuid = uuidv4();
    
    try {
        const hashedPassword = await bcrypt.hash(password.toString(), 10); 

        const [rows] = await mysqlpool.query(
            'INSERT INTO users (id, username, email, number, password) VALUES (?, ?, ?, ?, ?)', 
            [userUuid, username, email, number, hashedPassword] 
        );
        
        console.log("User created successfully with ID (UUID):", userUuid);
        return res.status(201).json({ message: 'User created successfully', userId: userUuid });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Database error' });
    }
};


const login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const [rows] = await mysqlpool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // If the login is successful, return user data or token (if you're using JWT)
        return res.status(200).json({ message: 'Login successful', userId: user.id, uuid: user.id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Database error' });
    }
};





module.exports ={
    signup,
    login

}