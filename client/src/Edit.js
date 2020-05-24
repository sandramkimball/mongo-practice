import React, { useState} from 'react';

const Popup = (props) => {
    const [popupDisplay, setDisplay] = useState(props.display)    
    const [editCat, setEditCat] = useState({
        id: props.id,
        name: props.name,
        hobbies: props.hobbies,
        url: props.url
    })

    const handleChange = e => {
        e.preventDefault()
        setEditCat({ ...editCat, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios.put(`http://localhost:5050/cats/${props.id}`, editCat)
        .then(res=> {
            console.log('Outgoing Cat Alert', res)
            setDisplay('none')
        })
        .catch(err=> {
            console.log(err)
            setDisplay('none')
        })
    }

    const handleDelete = e => {
        e.preventDefault()
        axios.delete(`http://localhost:5050/cats/${props.id}`)
        .then(res=> {
            console.log('Cat was sent into space.', res)
            setDisplay('none')
        })
        .catch(err=> {
            console.log(err)
            setDisplay('none')
        })
    }

    return (
        <section style={`display: ${popupDisplay}`} className='edit-cat'>
            <p>Editing {props.id}</p>
            <form onSubmit={handleSubmit}>
                <input 
                type='text'
                value={props.name}
                placeholder={props.name}
                onChange={handleChange}
            />
                <input 
                type='text'
                value={props.hobbies}
                placeholder={props.hobbies}
                onChange={handleChange}
            />
                <input 
                type='text'
                value={props.url}
                placeholder={props.url}
                onChange={handleChange}
            />
            </form>
            <button onSubmit={handleSubmit}>Submit</button>
            <button onSubmit={handleDelete}>Delete</button>
        </section>
    )
}

export default Popup