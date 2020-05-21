import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
    const [cats, setCats] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:5050/posts')
        .then(res=> setCats(res.data.catData))
        .catch(err=> console.log(err))
    })
    return (
        <div className='App'>
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