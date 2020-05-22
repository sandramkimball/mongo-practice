import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
    const [cats, setCats] = useState([])
    const [newCat, setNewCat] = useState({
        name: '',
        hobbies: '',
        url: ''
    })

    useEffect(()=>{
        axios.get('http://localhost:5050/posts')
        .then(res=> setCats(res.data.catData))
        .catch(err=> console.log(err))
    })

    const handleChange = e => {
        e.preventDefault()
        setNewCat({ [e.target.value]: value })
    }

    const handleCSubmit = e => {
        e.preventDefault()
        console.log('Meow Added')
        // axios.put('http://localhost:5050/posts')
        // .then(res=> setCats(res.data.catData))
        // .catch(err=> console.log(err))
    }

    return (
        <div className='App'>
            <div>
                <form>
                    <p>Add a New Member to the Cat Family</p>
                    <input
                        onChange={handleChange}
                        type='text'
                        value='name'
                        paceholder='Name'
                    />
                    <input
                        onChange={handleChange}
                        type='text'
                        value='hobbies'
                        palceholder='Hobbies'
                    />
                    <input
                        onChange={handleChange}
                        type='text'
                        value='url'
                        placeholder='Paste Image Url'
                    />
                    <button onSubmit={handleSubmit}>Submit</button>
                </form>
            </div>
            <div className='container'>
                {cats.map(cat=> (
                    <div className='cat-card'>
                        <img src={cat.url} alt="pic of a fat cat"/>
                        <h3>{cat.name}</h3>
                        <h4>Enjoys {cat.hobbies}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App;