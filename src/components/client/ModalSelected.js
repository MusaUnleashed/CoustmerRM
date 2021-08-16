import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { observer, inject } from 'mobx-react'
import Button from 'react-bootstrap/Button'

const ModalSelected = inject("CustomerStore")(observer((props) => {

    const [selectedCustomer, setSelectedCustomer] = useState({})
    useEffect(() => {
        setSelectedCustomer(props.customer)
        // console.log(selectedCustomer)
    },[props.customer])


  
    const handleChange = (e) => {
        console.log(e.target.value)
        setSelectedCustomer({
            ...selectedCustomer,
            [e.target.name]: e.target.value
        })

    }
    const handleSubmit=()=>{// this should call handle update in our store 

        const customerToUpdate={ 
            id:selectedCustomer.id,
            first:selectedCustomer.first,
            last:selectedCustomer.last,
            country:selectedCustomer.country
        }
        props.CustomerStore.updateSelectedCustomer(customerToUpdate)

    }
    const handleCancel=()=>{

    }
    return (
        <div>
            <Modal show={props.CustomerStore.showModal} onHide={props.CustomerStore.handleAlertModalChange}>
                <Modal.Header >
                    <Modal.Title>{"hi What would you like to change "} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <span>Name</span><input name="first" value={selectedCustomer.first || ""} onChange={handleChange}></input>
                        <br></br>
                        <span>SurName</span><input name="last" value={selectedCustomer.last|| ""} onChange={handleChange}></input>
                        <br></br>

                        <span>Country</span><input name="country" value={selectedCustomer.country|| ""} onChange={handleChange}></input>

                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>
                        submit
                    </Button>

                    <Button variant="primary" onClick={handleCancel}>
                    cancel
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}))
export default ModalSelected
