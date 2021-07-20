import React from 'react'
import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { observer, inject } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import '../../style/CustomerDisplay.css'

import ModalSelected from './ModalSelected'
const CustomerDisplay = inject("CustomerStore")(observer((props) => {
    const [tableColumns, setTableColumns] = useState(["Name", "SureName", "Country", "FirstContact", "Email", "sold", "Owner"])
    const [data, setData] = useState([])
    const[selectedCustomer,setSelectedCustomer]=useState({})
    const[showAlert,setShowAlert]=useState(false);

    useEffect(() => {
        // setData(props.CustomerStore.list)
        // setTableColumns(Object.keys(props.CustomerStore.list[0]))
    }, [])
    const handleAlertModal = (proxy) => {
        const customer = Object.assign({}, proxy);
        console.log(customer)
        props.CustomerStore.handleAlertModalChange()
        setShowAlert(!showAlert)
        setSelectedCustomer(customer)
    }
    const handleUpdateCustomer=()=>{

    }

    return (
        <div>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr className="keys-column">
                    {tableColumns.map(d => <td>{d}</td>)}

                </tr>

            </thead>
            <tbody>
                {props.CustomerStore.list.map((customer,index )=>

                    <tr  key={index} onClick={() => { handleAlertModal(customer) }} >

                        <td>{customer.first}</td>
                        <td>{customer.last}</td>
                        <td>{customer.country}</td>
                        <td>{customer.date}</td>
                        <td>{customer.emailType}</td>
                        <td>{customer.sold ? <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon> : null}</td>
                        <td>{customer.owner}</td>


                        </tr>
                        
                        
                        
                        )}
                        <ModalSelected   customer={selectedCustomer}></ModalSelected>

            </tbody>

        </Table>

        </div>

    )
}))

export default CustomerDisplay