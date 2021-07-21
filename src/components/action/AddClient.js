import React, { useState, useEffect } from 'react'
import { observer, inject } from 'mobx-react'

const AddClient = inject("CustomerStore")(observer((props) => {
    const [newClient, setNewClient] = useState({})
    useEffect(() => {

        setNewClient({owner:"Janice Alvarado"})

    }, [])
    const handleChange = (e) => {
        setNewClient({
            ...newClient,
            [e.target.name]: e.target.value
        })


    }
    const handleSubmit = () => {
        console.log(newClient)
        props.CustomerStore.addNewClient(newClient)
    }

    return (
        <div>
            <h3>Add Client</h3>
            <span>first Name</span><input name="firstName" placeholder="Client Name" onChange={handleChange}></input>
            <br></br>
            <span>SureName</span><input name="lastName" placeholder="SurName" onChange={handleChange}></input>
            <br></br>
            <span>Country</span><input name="country" placeholder="Country" onChange={handleChange}></input>
            <br></br>
            <select
                className="selectUpdate"
                onChange={handleChange}
                name="owner"
                value={newClient.owner}
            >
                {props.CustomerStore.owners.map((o, index) => {
                    return (
                        <option key={index} value={o.owner}>
                            {o.owner}
                        </option>
                    );
                })}
            </select>
            <br></br>
            <button onClick={handleSubmit}> Add new Client</button>

        </div>
    )
}))
export default AddClient
