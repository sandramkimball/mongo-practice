import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
import Popup from './Edit.js';

function App() {
    const [cats, setCats] = useState([])
    const [popupDisplay, setDisplay] = useState('none')   
    const [newCat, setNewCat] = useState({
        name: '',
        hobbies: '',
        url: ''
    })

    useEffect(()=>{
        axios.get('http://localhost:5050/cats')
        .then(res=> setCats(res.data.data))
        .catch(err=> console.log(err))
    }, [])

    const handleChange = e => {
        e.preventDefault()
        setNewCat({ ...newCat, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios.post('http://localhost:5050/cats', newCat)
        .then(res=> {
            console.log('Outgoing Cat Alert', res)
        })
        .catch(err=> console.log(err))
    }

    const handleAdopt = (e, cat) => {
        e.preventDefault();
        console.log(`ADOPTED!`)
    }

    const handleEdit = (e) => {
        e.preventDefault()
        setDisplay('inherit')
    }

    return (
        <div className='App'>
            <div className='form-container'>
                <p>Add a New Cat to the Family</p>
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={handleChange}
                        type='text'
                        value={newCat.name}
                        name='name'
                        placeholder='Name'
                    />
                    <input
                        onChange={handleChange}
                        type='text'
                        value={newCat.hobbies}
                        name='hobbies'
                        placeholder='Hobbies'
                    />
                    <input
                        onChange={handleChange}
                        type='text'
                        value={newCat.url}
                        name='url'
                        placeholder='Image'
                    />
                </form>
                <button onSubmit={handleSubmit}>Submit</button>
            </div>
            <div className='new-cat'>
                {newCat.name !== '' &&(<h3>{newCat.name} says 'MEOW'!</h3>)}
            </div>
            <div className='container'>
                {cats.map(cat=> (
                    <div className='cat-card'>
                        <Popup props={cat} popupDisplay={popupDisplay}/>
                        <img src={cat.url} alt="pic of a fat cat"/>
                        <h3>{cat.name}</h3>
                        <h4>Enjoys {cat.hobbies}</h4>
                        <div>
                            <button className='adopt-btn' onClick={(e) => handleAdopt(e, cat)}>Adopt</button>
                            <button className='adopt-btn' onClick={(e)=> handleEdit(e)}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App;