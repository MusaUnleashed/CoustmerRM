import { observable, action, makeObservable, computed } from 'mobx'
import Data from '../data.json'

import axios from 'axios'


const serverApi = "http://localhost:8080/clients"
export class CustomerInventory {
    constructor() {
        this.list =[]

        makeObservable(this, {
            list: observable,
            getData: action,
        })
    }

  
    getData = async () => {
       await   axios.get(serverApi).
            then( (response)=> {
                console.log("res", response.data)
               this.list=  response.data
            }).catch(function (error) {
                console.log(error)
            })

    }


}

export default CustomerInventory
