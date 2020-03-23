import React, { PureComponent } from 'react';
import Swipe from './Swipe';
import './Slider.scss';

import { getIntialStateOfCarousel, getTrackStyle } from '../../utils';

class Carousel extends PureComponent {
    static getDerivedStateFromProps(props, state) {
        const noOfSlides = React.Children.count(props.children);
        if (noOfSlides !== state.noOfSlides) {
            return getIntialStateOfCarousel(props);
        }
        return null;
    }
    constructor(props) {
        super(props);
        this.state = getIntialStateOfCarousel(props);
        this.prevSlideHandler = this.prevSlideHandler.bind(this);
        this.nextSlideHandler = this.nextSlideHandler.bind(this);
    }
    componentDidMount() {
        if (this.props.autoPlay > 0) {
            this.autoPlayHandler = setInterval(() => {
                this.getNextSlide();
            }, this.props.autoPlay);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.currentSlide === this.state.currentSlide) {
            return;
        }
        if (this.props.currentSlide !== prevProps.currentSlide) {
            this.getSlideIntoView(this.props.currentSlide, 0);
        }
        if (prevState === this.state || this.state.disabledInfinite) {
            return;
        }
        // For infine carousel, using mirrored slides on both ends. creating loop
        const { currentSlide, noOfSlides } = this.state;
        if (currentSlide === noOfSlides) {
            this.animating = true;
            setTimeout(() => {
                this.getSlideIntoView(-1, 1, true);
                this.animating = false;
            }, 500);
        } else if (currentSlide === -1) {
            this.animating = true;
            setTimeout(() => {
                this.getSlideIntoView(noOfSlides, -1, true);
                this.animating = false;
            }, 500);
        }
    }
    componentWillUnmount() {
        if (this.autoPlayHandler) { clearInterval(this.autoPlayHandler); }
    }
    getPrevSlide() {
        const { currentSlide, disabledInfinite } = this.state;
        if (disabledInfinite && currentSlide === 0) return;
        this.getSlideIntoView(currentSlide, -1);
    }
    getNextSlide() {
        const { currentSlide, disabledInfinite } = this.state;
        if (disabledInfinite && currentSlide === this.state.noOfSlides - 1) return;
        this.getSlideIntoView(currentSlide, 1);
    }
    getSlideIntoView(current, prevOrNext = 1, transitionOFF) { // if prevOrNext = -1 * n :: previous else next(1 * n)
        const trackStyle = getTrackStyle({ current, prevOrNext, transitionOFF, ...this.state, ...this.props });
        this.setState({ currentSlide: current + prevOrNext, trackStyle }, () => {
            if (typeof this.props.onSlideChange === 'function') {
                this.props.onSlideChange({ currentSlide: this.state.currentSlide });
            }
        });
    }
    stopAutoPlay() {
        if (this.autoPlayHandler) { clearInterval(this.autoPlayHandler); }
    }
    prevSlideHandler() {
        if (this.animating || this.state.isFitToView) return;
        this.getPrevSlide();
        this.stopAutoPlay();
    }
    nextSlideHandler() {
        if (this.animating || this.state.isFitToView) return;
        this.getNextSlide();
        this.stopAutoPlay();
    }
    render() {
        const { currentSlide, trackStyle, slideStyle, isFitToView, leftMirroredSlides, rightMirroedSlides, disabledInfinite } = this.state;
        const { children, dots, arrows } = this.props;

        return (
            <section className="carousel">
                {arrows && !isFitToView && <button aria-label="carousel-prev" onClick={this.prevSlideHandler} className="carousel-prev" type="button">prev</button>}

                <Swipe previous={this.prevSlideHandler} next={this.nextSlideHandler}>
                    <div className="carousel-slide-container">
                        <div className="carousel-track" style={trackStyle}>
                            {
                                (!disabledInfinite && leftMirroredSlides)
                            }
                            {
                                React.Children.map(children, (childNode, index) => {
                                    return <div key={index} className={`carousel-slide ${currentSlide === index ? 'active-slide' : ''}`} style={slideStyle}>{childNode}</div>;
                                })
                            }
                            {
                                (!disabledInfinite && rightMirroedSlides)
                            }
                        </div>
                    </div>
                </Swipe>

                {arrows && !isFitToView && <button onClick={this.nextSlideHandler} aria-label="carousel-next" className="carousel-next" type="button">next</button>}

                {dots && !isFitToView && <div className="nav-dots-container">
                    {
                        React.Children.map(children, (childNode, index) => {
                            return <span key={index} className={`nav-dot ${currentSlide === index ? 'active' : ''}`}></span>;
                        })
                    }
                </div>}
            </section>
        );
    }
}

Carousel.defaultProps = {
    currentSlide: 0,
    slidesPerView: 1,
    aspectRatio: 1,
    dots: true,
    arrows: true,
    infinite: true,
    autoPlay: 0
};

export default Carousel;
