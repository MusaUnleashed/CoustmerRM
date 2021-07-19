import React from 'react'
import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { observer, inject } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import '../style/CustomerDisplay.css'
const CustomerDisplay = inject("CustomerStore")(observer((props) => {
    const [tableColumns, setTableColumns] = useState(["Name", "SureName", "Country", "FirstContact", "Email", "sold", "Owner"])
    const [data, setData] = useState([])
    useEffect(() => {
        setData(props.CustomerStore.list)
        // setTableColumns(Object.keys(props.CustomerStore.list[0]))
    }, [])
    const handleAlertModal = (e) => {
        const song = e.target;
        console.log('We need to get the details for ', song);
    }

    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr className="keys-column">
                    {tableColumns.map(d => <td>{d}</td>)}

                </tr>

            </thead>
            <tbody>
                {props.CustomerStore.list.map(customer =>
                    <tr data-id="ll" onClick={handleAlertModal}  name={customer.id}>
                        
                        <td>{customer.first}</td>
                        <td>{customer.last}</td>
                        <td>{customer.country}</td>
                        <td>{customer.date}</td>
                        <td>{customer.emailType}</td>
                        <td>{customer.sold ? <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon> : null}</td>
                        <td>{customer.owner}</td>





                    </tr>

                )}

            </tbody>

        </Table>
    )
}))

export default CustomerDisplay