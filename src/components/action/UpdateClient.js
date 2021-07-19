import React from 'react'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useState, useEffect } from 'react'
export default function UpdateClient() {
    const [formValues, setFormValues] = useState({})
    const handleSubmit = () => {
        console.log(formValues)
    }
    const handleChange = (e) => {
        console.log(e.options)
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })

    }

    return (
        <div>
            <Form>
                <h3>UPDATE</h3>
                <span>client Name</span><input name="client" placeholder="Client Name" onChange={handleChange}></input>
                <br></br>
                <label >Transfer OwnerShip To
                    <select name="transferOwner" onChange={handleChange}>
                        <option>1</option>
                        <option>2</option>
                    </select>
                </label>
                <br></br>
                <label > send Email
                    <select name="email" onChange={handleChange} placeholder="sendEmail">
                        <option>1</option>
                        <option>2</option>
                    </select>
                </label>

                <br></br>


            </Form>

            <button onClick={handleSubmit} >submit</button>
        </div>
    )
}
