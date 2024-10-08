import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../models/actitvity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActitivityDeatils";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities: Activity[];
}

export default function ActivityDashboard({activities}: Props) {
  return (
    <Grid>
      <Grid.Column width={"10"}>
        <ActivityList activities={activities}/>
      </Grid.Column>
      <Grid.Column width={"6"}>
        {activities[0] && 
        <ActivityDetails activity={activities[0]}/>}
        <ActivityForm />
      </Grid.Column>
    </Grid>
  );
}
