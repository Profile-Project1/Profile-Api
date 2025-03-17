
const express = require('express');
const dotenv = require("dotenv");
const mysql = require('mysql2');
const app = express();
dotenv.config();  // تحميل المتغيرات من .env

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT;

app.use(bodyParser.json())
app.use(cookieParser())

const secretKey = process.env.JWT_SECRET_KEY;
const refreshKey = process.env.JWT_REFRESH_KEY;
const token_expiry = "1h"
const refresh_expiry = "30d"

const refreshToken = new Map()


// إعداد الاتصال بقاعدة البيانات
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});


app.use(express.json());


// Register
app.post("/register",(req,res)=>{
  const {userName,first_name,last_name,email, password, role,address,phone} = req.body
  if(!userName || !first_name || !last_name || !email || !password || !role || !address || !phone){
    return res.status(400).json({ message: "please enter all info" });
  }
  db.query("SELECT * FROM users WHERE email=?",[email],(err,result)=>{
    if(err){
      return res.status(500).json({ message: "Database error" });
    }
    if(result.length>0){
      return res.status(400).json({ message: "User already exists" });
    }
    bcrypt.hash(password,10,(err,hash)=>{
      if(err){
        return res.status(500).json({ message: "Error hashing password" });
      }
      const query = "INSERT INTO users (userName, first_name, last_name, email, password, role, address, phone) VALUES(?,?,?,?,?,?,?,?)"
      const values = [userName, first_name, last_name, email, hash, role, address, phone];
      db.query(query,values,(err,result)=>{
        if(err){
          return res.status(500).json({ message: "Error registering user" });
        }
        res.status(201).json({ message: "User registered successfully" });

      })
    })
  })
})

// 
const authenticateToken = (req,res,next)=>{
  const token = req.headers['authorization'] && req.headers['authorization'].split(" ")[1]
  if(!token){
    return res.status(403).json({ message: "Access Denied, No Token Provided" });
  }
  // Tokenالتحقق من صحة الـ 
  jwt.verify(token,secretKey,(err,user)=>{
    if(err){
      return res.status(401).json({ message: "Invalid Token" });
    }
    req.user = user
    next()
  }
)}

// Login 
app.post("/login",async(req,res)=>{
  const {email,password} = req.body

  db.query("SELECT * FROM users WHERE email=?",[email],async(err,result)=>{
    if(err){
      return res.status(500).json({ message: "Database error" });
    }
    if(result.length===0){
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const user = result[0]

    const isPasswordValid   = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      {userName:user.userName, role:user.role},
      secretKey,
      {expiresIn: token_expiry}
    )
    res.status(200).json({ message: "Login successful", token });
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
