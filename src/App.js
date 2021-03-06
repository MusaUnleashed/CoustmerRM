import { observer, inject } from "mobx-react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import { useEffect } from "react";
import CustomerDisplay from "./components/client/CustomerDisplay";
//CustomerStore
const App = inject("CustomerStore")(
  observer((props) => {
    useEffect(async () => {
 
      props.CustomerStore.getPageNumber();
    }, []);
    return (
      <div>
        <NavBar></NavBar>
      </div>
    );
  })
);

export default App;
