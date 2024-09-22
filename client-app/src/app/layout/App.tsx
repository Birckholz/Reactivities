import { Fragment, useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { Container, Header, List } from "semantic-ui-react";
import { Activity } from "../models/actitvity";
import NavBar from "./NavBar";
import ActivityDashboard from "./activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        console.log(response);
        setActivities(response.data);
      });
  }, []);
  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: "7em"}}>
        <ActivityDashboard activities={activities}/>
      </Container>
    </Fragment>
  );
}

export default App;
