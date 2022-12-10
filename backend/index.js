import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Prueba1234",
	database: "test",
	port: 3307
})


// if the is a auth problem
// // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Prueba1234';

// HTTP METHODS
app.use(express.json())
app.use(cors())

// HTTP GET
app.get("/", (req,res)=>{
	res.json("hello this is the backend")
})


// GET all books
app.get("/books", (req,res)=>{
	const qry = "SELECT * FROM books"
	db.query(qry,(err,data)=>{
		if(err) return res.json(err)
		return res.json(data)
	})
})

// POST METHOD
app.post("/books", (req,res)=>{
	const qry = "INSERT INTO books (`title`,`description`,`price`,`cover`) VALUES (?)"
	//const values = ["title from backend","description from backend","price from backend","cover pic from backend"]
	const values = [
		req.body.title,
		req.body.description,
		req.body.price,
		req.body.cover,
	];

	db.query(qry,[values], (err,data)=>{
		if(err) return res.json(err)
		//return res.json(data)
		return res.json("Books has been created successfully.")
	})
})

// Delete Method
app.delete("/books/:id", (req,res)=>{
	const bookId = req.params.id;
	const qry = "DELETE FROM books WHERE id = ?"

	db.query(qry,[bookId], (err,data)=>{
		if (err) return res.json(err);
		return res.json("Book has been Deleted successfully.");
	})
})

// Update Method
app.put("/books/:id", (req, res) => {
	const bookId = req.params.id;
	const qry = "UPDATE books SET `title`= ?, `description`= ?, `price` = ?, `cover` = ? WHERE id = ?";

	const values=[
		req.body.title ,
		req.body.description ,
		req.body.price ,
		req.body.cover ,		
	]

	db.query(qry,[...values,bookId], (err,data) => {
		if (err) return res.json(err);
		return res.json("Book has been Updated successfully.");
	})
})

app.listen(8800, ()=>{
	console.log("Connected to backend 1-2-3!")
})
