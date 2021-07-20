import { observable, action, makeObservable, computed } from 'mobx'
import Data from '../data.json'

import axios from 'axios'


const serverApi = "http://localhost:8080/clients"
export class CustomerInventory {
    constructor() {
        this.from = 0;
        this.to = 20;
        this.list = []
        this.showModal = false

        makeObservable(this, {
            list: observable,
            getData: action,
            to: observable,
            from: observable,
            showModal: observable,
            handleAlertModalChange: action,
            updateSelectedCustomer: action
        })
    }

    handleAlertModalChange = () => {
        this.showModal = !this.showModal

    }

    getData = async () => {
        await axios.get(`${serverApi}/?from=${this.from}&to=${this.to}`).
            then((response) => {
                console.log("res", response.data)
                this.list = response.data
            }).catch(function (error) {
                console.log(error)
            })

    }

    updateSelectedCustomer = async (customer) => {
        await axios.put(`${serverApi}`,customer).
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
