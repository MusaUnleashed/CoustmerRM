import React, { useEffect } from 'react'
import UpdateClient from './UpdateClient'
import { observer, inject } from 'mobx-react'
import AddClient from './AddClient'

const Actions = inject("CustomerStore")(observer((props) => {

    useEffect(() => {
        props.CustomerStore.getOwners()
        console.log(props.CustomerStore.owners)
    }, [])

    return (
        <div>
            <UpdateClient></UpdateClient>

            <AddClient></AddClient>
        </div>
    )
}))

export default Actions
