import React from 'react'

export default function AddClient() {
    handleChange=()=>{
        
    }
    return (
        <div>
            <h3>Add Client</h3>
            <span>first Name</span><input name="firstName" placeholder="Client Name" onChange={handleChange}></input>
            <span>SureName</span><input name="SurName" placeholder="SurName" onChange={handleChange}></input>
            <span>Country</span><input name="country" placeholder="Country" onChange={handleChange}></input>
            <span>Owner</span><input name="owner" placeholder="Owner" onChange={handleChange}></input>

        </div>
    )
}
