

const mysql = require("mysql2") //  لإنشاء اتصال بقاعدة البيانات mysql2  استيراد مكتبة 
const dotenv = require("dotenv")
dotenv.config()

const db = mysql.createConnection({         // إنشاء اتصال بقاعدة البيانات
    host: process.env.DB_HOST,
    user: process.env.DB_USER, 
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})


db.connect((err)=>{
   if(err){
    console.error("Database connection failed",err.message)
    return
   }
   console.log('Connected to MySQL database');

})

module.exports = db