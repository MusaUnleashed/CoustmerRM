import React from "react";
import { useState, useEffect, useRef } from "react";
import Table from "react-bootstrap/Table";
import { observer, inject } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import "../../style/CustomerDisplay.css";
import debounce from "lodash.debounce";

import ModalSelected from "./ModalSelected";
const CustomerDisplay = inject("CustomerStore")(
  observer((props) => {
    const listInnerRef = useRef();

    const [tableColumns, setTableColumns] = useState([
      "Name",
      "SureName",
      "Country",
      "FirstContact",
      "Email",
      "sold",
      "Owner",
    ]);
    const [data, setData] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [isBottom, setIsBottom] = useState(false);
    const [isTop, setIsTop] = useState(false);

    useEffect(() => {
      props.CustomerStore.getData();
      window.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      window.addEventListener("wheel", handleWheel);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    useEffect(() => {
      if (isBottom === false) {
        return;
      }
      window.scrollTo(0, 0);
      setIsBottom(false);
      console.log(window);
    }, [isBottom]);

    useEffect(() => {
      if (isTop === false) {
        return;
      }
      window.scrollTo(0, 0);

      setIsTop(false);
    }, [isTop]);
    ///

    ////
    const handleWheel = (e) => {
      //   console.log(e);
    };

    const handleAlertModal = (proxy) => {
      const customer = Object.assign({}, proxy);
      console.log(customer);
      props.CustomerStore.handleAlertModalChange();
      setShowAlert(!showAlert);
      setSelectedCustomer(customer);
    };

    const handleScroll = () => {
      //   console.info("scrolling ", window.scrollY);

      let top = window.scrollY === 0;

      let bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight;
      console.log(window.scrollY);

      if (bottom) {
        setIsBottom(true); // bottom true
        props.CustomerStore.incrementPage();
        console.log(props.CustomerStore.page);

        props.CustomerStore.getData();
        console.log("at the bottom");
      } else if (top) {
        console.log(" ------------------------top ", window.scrollY);
        props.CustomerStore.decrementPage();
        props.CustomerStore.getData();
        setIsTop(true); // top
      }
    };

    return (
      <div>
        <Table striped bordered hover variant="dark" ref={listInnerRef}>
          <thead>
            <tr className="keys-column">
              {tableColumns.map((d) => (
                <td key={d}>{d}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.CustomerStore.list.map((customer, index) => (
              <tr
                key={index + customer.first}
                onClick={() => {
                  handleAlertModal(customer);
                }}
              >
                <td key={index + "f"}>{customer.first}</td>
                <td key={index + "l"}>{customer.last}</td>
                <td key={index + "c"}>{customer.country}</td>
                <td key={index + "d"}>{customer.date}</td>
                <td key={index + "e"}>{customer.email_type}</td>
                <td key={index + "s"}>
                  {customer.sold == 1 ? (
                    <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                  ) : null}
                </td>
                <td key={index + "o"}>{customer.owner}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {isFetching ? (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : null}

        <ModalSelected customer={selectedCustomer}></ModalSelected>
      </div>
    );
  })
);

export default CustomerDisplay;
