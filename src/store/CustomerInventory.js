import { observable, action, makeObservable, computed } from "mobx";
import Data from "../data.json";

import axios from "axios";

const serverApi = "http://localhost:8080";
export class CustomerInventory {
  constructor() {
    this.from = 0;
    this.to = 20;

    this.list = [];
    this.showModal = false;
    this.owners = [];
    this.page = 1;
    this.maxPage = 0;
    this.pageSize = 20;

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
      incrementPage: action,
      decrementPage: action,
      pageComputed: computed,
    });
  }

  handleAlertModalChange = () => {
    this.showModal = !this.showModal;
  };
  getPageNumber = () => {
    axios.get(`${serverApi}/pages`).then((response) => {
      //   console.log("rows we gto ", response.data.pages);
      this.maxPage = response.data.pages;
    });
  };
  incrementPage = () => {
    this.page++;
    if (this.page > this.maxPage) {
      this.page = this.maxPage;
    }
    console.info(" ne page ", this.page);
  };

  decrementPage = () => {
    this.page--;
    if (this.page < 1) {
      this.page = 1;
    }
  };
  getOwners = () => {
    axios
      .get(`${serverApi}/owners`)
      .then((response) => {
        console.log("res", response.data);
        this.owners = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  get pageComputed() {
    return this.page;
  }

  getData = async () => {
    await axios
      .get(`${serverApi}/clients/?page=${this.page}&pageSize=${this.pageSize}`)
      .then((response) => {
        console.log("res", response.data);
        this.list = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  updateSelectedCustomer = async (customer) => {
    await axios
      .put(`${serverApi}/clients`, customer)
      .then(async (response) => {
        console.log("res", response.data);
        await this.getData();
        // this.list = response.data
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  addNewClient = async (client) => {
    axios
      .post(`${serverApi}/clients`, client)
      .then(async (response) => {
        console.log("res", response.data);
        await this.getData();
        // this.list = response.data
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export default CustomerInventory;
