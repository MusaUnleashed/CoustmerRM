import React from 'react'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useState, useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import axios from 'axios'

const apiUpdate = "http://localhost:8080"
const UpdateClient = inject("CustomerStore")(observer((props) => {
    const [formValues, setFormValues] = useState({})
    const [owner, setOwner] = useState("");
    const [emailType, setEmailType] = useState("")
    const [sold, setSold] = useState(false)
    const [name, setName] = useState("")

  
    const handleChange = (e) => {
        setName(e.target.value)
        // setFormValues({
        //     ...formValues,
        //     [e.target.name]: e.target.value
        // })

    }


    const handleSelectOwner = (e) => {
        setOwner(e.target.value)

    }
    const handleSubmit = () => {
        console.log(formValues)
    }


    const handleEmailType = (e) => {
        setEmailType(e.target.value)
    }
    const handleClickEmail = () => {
        axios.put(`${apiUpdate}/emails/?email=${emailType}&name=${name}`)
    }
    const handleClickOwner = () => {
        axios.put(`${apiUpdate}/owners/?owner=${owner}&name=${name}`)
    }
    const handleClickSold = (e) => {
        e.preventDefault();
        setSold(!sold);
        axios.put(`${apiUpdate}/sold/?name=${name}`)
    }


    return (
        <div>
            <Form>
                <h3>UPDATE</h3>
                <span>client Name</span><input name="client" placeholder="Client Name" onChange={handleChange}></input>
                <br></br>
                <label >Transfer OwnerShip To
                    <select
                        className="selectUpdate"
                        onChange={handleSelectOwner}
                        value={owner}
                    >
                        {props.CustomerStore.owners.map((o, index) => {
                            return (
                                <option key={index} value={o.owner}>
                                    {o.owner}
                                </option>
                            );
                        })}
                    </select>

                    <button onClick={handleClickOwner}>setOwner</button>
                </label>
                <br></br>
                <label > send Email
                    <select name="email" onChange={handleEmailType} placeholder="sendEmail">
                        <option value="A" >A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>

                    </select>
                    <button onClick={handleClickEmail}> sendEmail</button>

                </label>

                <br></br>
                <button onClick={handleClickSold}> sold</button>


            </Form>

        </div>
    )
}))
export default UpdateClient
