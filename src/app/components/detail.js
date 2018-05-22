import React, { Component } from "react";
import Header from "./header";
import Footer from "./footer";
import ReviewList from "./review_list";
import ReviewAdd from "./review_add";
import Sidebar from "./sidebar";
import SimpleSlider from "./slider";
import Menu from "./menu";
import SimpleMap from "./simple_map";
import StarRatingComponent from "react-star-rating-component";
import client from "../utils";

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: null
    };
  }

  componentDidMount() {
    let { id } = this.props.match.params;
    console.log("ID", id);
    this.getData(id);
  }

  async getData(id) {
    let results = await client.doQuery(client.queries.detail(id));
    console.log("results", results);
    let detail = results.detail[0];
    console.log("detail", detail);
    this.setState({ detail });
  }

  render() {
    let { detail } = this.state;
    let { id } = this.props.match.params;
    let pageUrl = "http://localhost:3000/listing/" + id;

    console.log(detail);
    if (!detail)
      return (
        <div id="wrapper">
          <Header />
          <div className="clearfix" />
          <div className="container">
            <div>loading...</div>;
          </div>
        </div>
      );
    return (
      <div id="wrapper">
        <Header />
        <div className="clearfix" />
        {detail.images && <SimpleSlider images={detail.images} />}
        <div className="container">
          <div className="row sticky-wrapper">
            <div className="col-lg-8 col-md-8 padding-right-30">
              <div id="titlebar" className="listing-titlebar">
                <div className="listing-titlebar-title">
                  <h2>
                    {detail.name}
                    <span className="listing-tag">{detail.category.name}</span>
                  </h2>
                  <span>
                    <a href="#listing-location" className="listing-address">
                      <i className="fa fa-map-marker" />
                      {detail.address}
                    </a>
                  </span>
                  <div className="star-rating" data-rating={detail.rating}>
                    <div className="rating-counter">
                      <a href="#listing-reviews">(31 reviews)</a>
                    </div>
                  </div>
                </div>
              </div>

              <div id="listing-nav" className="listing-nav-container">
                <ul className="listing-nav">
                  <li>
                    <a href="#listing-overview" className="active">
                      Overview
                    </a>
                  </li>
                  <li>
                    <a href="#listing-pricing-list">Pricing</a>
                  </li>
                  <li>
                    <a href="#listing-location">Location</a>
                  </li>
                  <li>
                    <a href="#listing-reviews">Reviews</a>
                  </li>
                  <li>
                    <a href="#add-review">Add Review</a>
                  </li>
                </ul>
              </div>

              {detail.amenities && (
                <div id="listing-overview" className="listing-section">
                  <p>{detail.overview}</p>

                  <h3 className="listing-desc-headline">Amenities</h3>
                  <ul className="listing-features checkboxes margin-top-0">
                    {detail.amenities.map(a => <li key={a.id}>{a.name}</li>)}
                  </ul>
                </div>
              )}

              {id && <Menu items={detail.menu} pageUrl={pageUrl} />}

              <div id="listing-location" className="listing-section">
                <h3 className="listing-desc-headline margin-top-60 margin-bottom-30">
                  Location
                </h3>

                <div id="singleListingMap-container">
                  <SimpleMap detail={detail} />
                  <a href="#" id="streetView">
                    Street View
                  </a>
                </div>
              </div>

              <ReviewList />
              <ReviewAdd />
            </div>
            <Sidebar detail={detail} />
          </div>
        </div>

        <Footer />

        <div id="backtotop">
          <a href="#" />
        </div>
      </div>
    );
  }
}