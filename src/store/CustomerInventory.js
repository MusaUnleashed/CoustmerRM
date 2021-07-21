import { observable, action, makeObservable, computed } from 'mobx'
import Data from '../data.json'

import axios from 'axios'


const serverApi = "http://localhost:8080"
export class CustomerInventory {
    constructor() {
        this.from = 0;
        this.to = 20;
        this.list = []
        this.showModal = false
        this.owners = []

        makeObservable(this, {
            list: observable,
            to: observable,
            owners: observable,
            getData: action,
            from: observable,
            showModal: observable,
            handleAlertModalChange: action,
            updateSelectedCustomer: action,
            getOwners: action,

        })
    }

    handleAlertModalChange = () => {
        this.showModal = !this.showModal

    }
    getOwners = () => {

        axios.get(`${serverApi}/owners`).
            then((response) => {
                console.log("res", response.data)
                this.owners = response.data
            }).catch(function (error) {
                console.log(error)
            })

    }


    getData = async () => {
        await axios.get(`${serverApi}/clients/?from=${this.from}&to=${this.to}`).
            then((response) => {
                console.log("res", response.data)
                this.list = response.data
            }).catch(function (error) {
                console.log(error)
            })

    }

    updateSelectedCustomer = async (customer) => {
        await axios.put(`${serverApi}/clients`, customer).
            then(async (response) => {
                console.log("res", response.data)
                await this.getData()
                // this.list = response.data
            }).catch(function (error) {
                console.log(error)
            })

    }
    addNewClient = async (client) => {
        axios.post(`${serverApi}/clients`, client).
        then(async (response) => {
            console.log("res", response.data)
            await this.getData()
            // this.list = response.data
        }).catch(function (error) {
            console.log(error)
        })

    }

}

export default CustomerInventory
