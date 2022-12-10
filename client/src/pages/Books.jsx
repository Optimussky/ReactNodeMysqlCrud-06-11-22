import React from 'react'
import {Link} from 'react-router-dom'
import {useEffect} from 'react'
import {useState} from 'react'
import axios from 'axios'


const Book = () => {
	const [books,setBooks] = useState([])

	useEffect(()=>{
	const fetchAllBooks = async ()=>{
		try{
			const res = await axios.get("http://localhost:8800/books")
			setBooks(res.data);
			console.log(res)
		}catch(err){
		console.log(err)
		}

	}
	fetchAllBooks()
	},[])

	const handleDelete = async (id)=>{
		try{
			await axios.delete("http://localhost:8800/books/"+id)
			window.location.reload()
		}catch(err){
			console.log(err)
		}
	}
	return (
		<div> 
		<h1>Beto Book Shop</h1>
		<div className="books">
			{books.map(book=>(
			<div className="book">
				{book.cover && <img src={book.cover} alt=""/>}
				<h2>{book.title}</h2>
				<h2>{book.description}</h2>
				<span>{book.price}</span>
				<button className='delete' onClick={()=>handleDelete(book.id)}>Delete</button>
				<button className='update'><Link to={`/update/${book.id}`}>Update</Link></button>
			</div>
			))}
		</div>
			<button><Link to="/add">Add new book</Link></button>
			
		</div>
	);	
	
};


export default Book
