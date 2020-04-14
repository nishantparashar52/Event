import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import Header from './Header/Header';
import Slider from './Slider/Slider';
import LinkProvider from './LinkProvider';
import LazyLoadProvider from './LazyLoadProvider/LazyLoadProvider';
import Info from './Info/Info'
import Maps from './Google/Google';
import Venue from './Venue/Venue';
class Index extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
  const item = {
    aspectRatio: 3.4,
    slidesPerView: 1,
    paddingBtwnSlides: '2px',
    items: [
      {
          "img": "http://pegasusevents.in/wp-content/uploads/2017/09/Home-Page-Header-1-new.jpg",
          "url": "https://www.eventkarde.com/frame-size",
          "page": "home:banner",
          "componentName": "air",
          "horizontalPosition": "1"
      },
      {
          "img": "http://pegasusevents.in/wp-content/uploads/2017/09/Home-Page-Header-2-New.jpg",
          "url": "https://www.eventkarde.com/eyeglasses/brands/vincent-chase-eyeglasses/vc-round-eyeglasses.html",
          "page": "home:banner",
          "componentName": "eoss",
          "horizontalPosition": "1"
      },
      {
          "img": "http://pegasusevents.in/wp-content/uploads/2017/09/Home-Page-Header-3-New.jpg",
          "url": "https://www.eventkarde.com/sunglasses/special/sunglasses-hexagon-men.html",
          "page": "home:banner",
          "componentName": "eoss",
          "horizontalPosition": "1"
      },
      {
          "img": "http://pegasusevents.in/wp-content/uploads/2017/09/Home-Page-Header-2-New.jpg",
          "url": "https://www.eventkarde.com/eyeglasses/promotions/transparent-john-jacobs-eyeglasses.html",
          "page": "home:banner",
          "componentName": "eoss",
          "horizontalPosition": "1"
      }
  ]
  }
    return (
      <div className="">
        <Header />
        <Slider aspectRatio={item.aspectRatio} slidesPerView={item.slidesPerView} paddingBtwnSlides={item.paddingBtwnSlides} item={item}>
          {item.items.map((unit, i) => {
              return (<div key={`slider-child-${i}`} style={{ paddingRight: item.paddingBtwnSlides }} className="w100 h100 block">
                  <LinkProvider key={`link-${i}`} to={unit.url} className="w100 h100 inline-block">
                      <LazyLoadProvider className="lazy" alt={`img-${i}`} src={unit.img}></LazyLoadProvider>
                  </LinkProvider>
              </div>);
          })}
      </Slider>
      <Venue />
      <Info />
      <Maps />
        {/* <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps, { fetchPosts })(Index);
