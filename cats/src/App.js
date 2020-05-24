import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
    const [cats, setCats] = useState([])
    const [newCat, setNewCat] = useState({
        name: null,
        hobbies: null,
        url: null
    })

    useEffect(()=>{
        axios.get('http://localhost:5050/cats')
        .then(res=> setCats(res.data.catData))
        .catch(err=> console.log(err))
    })

    const handleChange = e => {
        e.preventDefault()
        setNewCat({ [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log('Meow Added', newCat)
        // axios.put('http://localhost:5050/cats')
        // .then(res=> setCats(res.data.catData))
        // .catch(err=> console.log(err))
    }

    return (
        <div className='App'>
            <div>
                <form>
                    <p>Add a New Cat to the Family</p>
                    <input
                        onChange={handleChange}
                        type='text'
                        value={newCat.name}
                        name='name'
                    />
                    <input
                        onChange={handleChange}
                        type='text'
                        value={newCat.hobbies}
                        name='hobbies'
                    />
                    <input
                        onChange={handleChange}
                        type='text'
                        value={newCat.url}
                        name='url'
                    />
                    <button onSubmit={handleSubmit}>Submit</button>
                </form>
            </div>
            <div className='new-cat'>
                {newCat.name !== null &&(<h3>{newCat.name} says 'MEOW'!</h3>)}
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