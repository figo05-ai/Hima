// الكود الكامل لملف server.js

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000; 

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// 1. إعداد الاتصال بقاعدة البيانات MySQL
// بيانات XAMPP الافتراضية: user: root, password: (فارغ)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234', // <-- اكتب كلمة المرور الصحيحة هنا
    database: 'cars_db'
});

// الاتصال
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        // إذا حدث خطأ، تأكد أن MySQL يعمل على XAMPP وأن كلمة المرور صحيحة
        return;
    }
    console.log('Connected to MySQL successfully!');
});

// 2. المسار الأول (API Endpoint) لجلب كل السيارات
app.get('/api/vehicles', (req, res) => {
    const sql = 'SELECT * FROM vehicles';
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            return res.status(500).json({ error: 'Failed to fetch vehicles' });
        }
        // إرسال البيانات المسترجعة بتنسيق JSON
        res.json(results);
    });
});


// 3. تشغيل الخادم
app.listen(port, () => {
    console.log(`Node.js Server running on http://localhost:${port}`);
});