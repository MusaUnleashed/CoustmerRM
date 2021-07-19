import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { observer, inject } from 'mobx-react'
import Button from 'react-bootstrap/Button'

const ModalSelected = inject("CustomerStore")(observer((props) => {

    const [selectedCustomer, setSelectedCustomer] = useState({})
    useEffect(() => {
        setSelectedCustomer(props.customer)
    }, [])


    useEffect(() => {
        return ()=>{
            setSelectedCustomer({})

        }
    },[])
    const handleChange = (e) => {
        console.log(e.target.value)
        setSelectedCustomer({
            ...selectedCustomer,
            [e.target.name]: e.target.value
        })

    }
    const handleSubmit=()=>{
    }
    return (
        <div>
            <Modal show={props.CustomerStore.showModal} onHide={props.CustomerStore.handleAlertModalChange}>
                <Modal.Header >
                    <Modal.Title>{"mosa"} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <span>Name</span><input name="first" value={selectedCustomer.first} onChange={handleChange}></input>
                        <br></br>
                        <span>SurName</span><input name="last" value={selectedCustomer.last} onChange={handleChange}></input>
                        <br></br>

                        <span>Country</span><input name="country" value={selectedCustomer.country} onChange={handleChange}></input>

                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}))
export default ModalSelected
