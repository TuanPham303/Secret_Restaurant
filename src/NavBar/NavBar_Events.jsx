import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import NavBar_PreviewEvent from "./NavBar_PreviewEvent.jsx";

class NavBar_Events extends Component {
  constructor(props){
    super(props);
  }

  // navbarEvents = () => {
  //   console.log('all events', props.navbarEvents.title);

  //   props.navbarEvents.map( navbarEvent => {
  //     return
  //       <NavBar_PreviewEvent
  //         key={navbarEvent.event_id}
  //         title={navbarEvent.title}
  //         neighbourhood={navbarEvent.neighbourhood}
  //         event_id={navbarEvent.event_id}
  //       />
  //   });
  // }

  render() {
    const navbarEvents = this.props.navbarEvents.map( navbarEvent => {
      return <NavBar_PreviewEvent
          key= { navbarEvent.event_id }
          title= { navbarEvent.title }
          neighbourhood= { navbarEvent.neighbourhood }
          event_id= { navbarEvent.event_id } />
    });
    return(
        <div>
          { navbarEvents }
        </div>
    );
  }
}

export default NavBar_Events;