import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import HomePage_PreviewEvent from "./HomePage_PreviewEvent.jsx";
const uuid = require('uuid/v4');

class HomePage_Events extends Component {
  constructor(props){
    super(props);
  }

  render() {
    console.log('all events', this.props.previewEvents);
    
    const previewEvents = this.props.previewEvents.map( previewEvent => {
      let hosts = new Set();
      previewEvent.hosts_and_chefs.forEach( person => {
        hosts.add(`${person.first_name} ${person.last_name}`)
      })
      console.log(hosts);
      return <HomePage_PreviewEvent 
        key={previewEvent.event_id}
        title={previewEvent.title}
        price={previewEvent.price}
        description={previewEvent.description}
        neighbourhood={previewEvent.neighbourhood}
        capacity={previewEvent.capacity}
        event_id={previewEvent.event_id}
        host={[...hosts].join(', ')}
      />
      });
      
    return(
      <div className="container-fluid eventContainer">
        <div className="row">
         { previewEvents }
        </div>
      </div>
    );
  }
}

export default HomePage_Events;