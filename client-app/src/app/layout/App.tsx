import { Fragment, useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/actitvity";
import NavBar from "./NavBar";
import ActivityDashboard from "./activities/dashboard/ActivityDashboard";
import {v4 as uuid} from 'uuid'
import agent from "../API/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list()
      .then((response) => {
        let activities: Activity[] = [];
        response.forEach(activity => {
          activity.date = activity.date.split('T')[0];
          activities.push(activity  )
        });
        console.log(response);
        setActivities(response);
        setLoading(false);
      });
  }, [])

  function handleDeleteActivity(id:string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities(activities.filter(x => x.id !== id))
      setSubmitting(false)
    })
    
  }

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id))
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined)
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true)
  }

  function handleFormClose() {
    setEditMode(false)
  }

  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true)
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
      setSelectedActivity(activity);
      setEditMode(false)
      setSubmitting(false)
      })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setEditMode(false);
        setSubmitting(false);
      }) 
    }
  }
  
  if (loading) return <LoadingComponent content="Loading App" />;

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen }/>
      <Container style={{marginTop: "7em"}}>
        <ActivityDashboard activities={activities}
        selectedActivity={selectedActivity}
        selectActivity={handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEdit={handleCreateOrEditActivity}
        deleteActivity={handleDeleteActivity}
        submitting={submitting}
        />
      </Container>
    </Fragment>
  );
}




export default App;
