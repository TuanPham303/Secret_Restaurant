import React, {Component} from 'react';
import NavBar from '../NavBar.jsx';
import EventPage_Banner from './EventPage_Banner.jsx';
import EventPage_Menu from './EventPage_Menu.jsx';
import EventPage_Review from './EventPage_Review.jsx';
import EventPage_GuestList from './EventPage_GuestList.jsx';
import Login from '../Login.jsx';
import Register from '../Register.jsx';

import moment from 'moment';

export default class EventPage extends Component {

  state = {
    event: null,
    reviews: [],
    images: [],
    currentUser: {
      id: null,
      first_name: '',
      last_name: '',
      is_host: false,
      is_chef: false
    },
    guestList: []
  }

  get eventId() {
    return this.props.match.params.id;
  }

  get eventDate() {
    if(this.state.event && this.state.event.event_date) {
      return moment(this.state.event.event_date).format('MMMM Do YYYY, h:mm a');
    }
    return "Unknown date";
  }

  getReviews() {
    $.get(`/api/events/${this.eventId}/reviews`)
      .then(reviews => this.setState({ reviews }))
  }

  getEvent() {
    $.get(`/api/events/${this.eventId}`)
      .then(([event]) => {
        this.setState({ event })
      });
  }
  getCurrentUser = () => {
    $.ajax({
      method: "GET",
      url: "/api/users/current"
    })
    .done(result => {
      this.setState({
        currentUser: {
          id: result.id,
          first_name: result.first_name,
          last_name: result.last_name,
          is_host: result.is_host,
          is_chef: result.is_chef
        }
      });
    })
    .fail(err => {
      console.error('Failed to get current user', err);
    })
  }

  getEventImages = (id = this.eventId) => {
    $.get(`/api/events/${id}/images`)
    .then(images => {
      
      if (images) {
        this.setState({ images  })
      } 
      if (images.length === 0)  {
        this.setState({
          images: this.state.images.concat([{image: '/event-images/event_default.jpg'}])
        })
      }
    })
  }

  clearUser = event => {
    this.setState({
      currentUser: {
        id: null,
        first_name: '',
        last_name: '',
        is_host: false,
        is_chef: false
      }
    });
  }

  submitReview = (description, rating, reviewer_id, user_id) => {
    const review = {
      reviewer_id,
      user_id,
      rating,
      description
    };
    console.log(review);

    $.post(`/api/events/${this.eventId}/reviews`, review)
      .then((res) => {
        this.getReviews()
        if (res === "Created") {
          $('.hidden').removeClass('hidden').fadeOut(4000);
        }
      })
  }

  getGuestList = () => {
    $.get(`/api/events/${this.eventId}/guestlist`)
    .then( guestList => {
      this.setState({
        guestList
      })
    })
  }

  componentDidMount() {
    this.getEvent();
    this.getReviews();
    this.getCurrentUser();
    this.getGuestList();
    this.getEventImages();
    setTimeout(() => {
      window.scrollTo(0, 180)
    }, 600);
  }

  render() {
    const { event, reviews, guestList, images } = this.state;
    if(!event) { return null; }

    return (
      <div className='eventWrapper' id="bootstrap-overrides">
        <NavBar
          currentUser={this.state.currentUser}
          clearUser={this.clearUser}
          getCurrentUser={this.getCurrentUser}
        />
        <EventPage_Banner
          id ={event.event_id}
          title={event.title}
          price={event.price}
          capacity={event.capacity}
          date={this.eventDate}
          description={event.description}
          image={event.image_url}
          hosts_and_chefs={event.hosts_and_chefs}
          location={event.location}
          getGuestList={this.getGuestList}
          images={images}
         />
        <EventPage_Menu
          menu={event.menu_description}
        />
        <EventPage_GuestList
          guestList={guestList}
        />
        <EventPage_Review
          reviews={reviews}
          submitReview={this.submitReview}
          guestList={guestList}
        />
        <Login getCurrentUser={this.getCurrentUser} />
        <Register getCurrentUser={this.getCurrentUser} />
      </div>

    );
  }
}