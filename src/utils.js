import React from 'react';

export function getCarouselDimensions(slidesPerView, aspectRatio, noOfSlides, disabledInfinite) {
    const virtualNoOfSlides = disabledInfinite ? noOfSlides : noOfSlides + 2 * slidesPerView; // For infinite carousel, adding two extra mirrored slides.
    const slideWidth = 100 / slidesPerView;
    const trackWidth = slideWidth * virtualNoOfSlides;
    return {
        carouselHeight: aspectRatio ? `${slideWidth / aspectRatio}vw` : 'auto',
        slideWidth,
        trackWidth
    };
}

export function getStyle({ slidesPerView, noOfSlides, disabledInfinite, aspectRatio }) {
    const dimensions = getCarouselDimensions(slidesPerView, aspectRatio, noOfSlides, disabledInfinite);
    const slideStyle = { width: `${dimensions.slideWidth}%` };
    const transform = disabledInfinite ? 'translate3d(0, 0, 0)' : `translate3d(${(-1 * slidesPerView * dimensions.slideWidth / (noOfSlides + 2 * slidesPerView))}%, 0, 0)`;
    const trackStyle = { width: `${dimensions.trackWidth}%`, height: dimensions.carouselHeight, transform };
    return { slideStyle, trackStyle };
}

export function getTrackStyle({
    current,
    prevOrNext = 1,
    transitionOFF,
    slidesPerView,
    disabledInfinite,
    slideStyle,
    noOfSlides,
    trackStyle
}) {
    if (current == null) return;
    // we are doing current + 1 as 0 is starting index for infinite
    const currentSlide = disabledInfinite ? current + prevOrNext : (current + 1 + prevOrNext);
    const slideWidth = parseFloat(slideStyle.width);
    const virtualNoOfSlides = disabledInfinite ? noOfSlides : noOfSlides + 2 * slidesPerView;
    const baseX = slidesPerView * slideWidth / virtualNoOfSlides;
    return Object.assign({}, trackStyle, {
        transform: `translate3d(${-1 * currentSlide * baseX}%, 0, 0)`,
        transition: transitionOFF ? '' : 'transform 500ms ease 0s'
    });
}

export function getMirroredSlides({
    noOfSlides,
    slidesPerView,
    slideStyle,
    disabledInfinite,
    children
}) {
    if (disabledInfinite) return;
    const childs = React.Children.toArray(children);
    const leftMirroredSlides = [];
    const rightMirroedSlides = [];
    const diff = noOfSlides - slidesPerView;
    for (let i = 0; i < slidesPerView; i += 1) {
        leftMirroredSlides.push(<div key={i} className="carousel-slide mirrored" style={slideStyle}>{childs[diff + i]}</div>);
        rightMirroedSlides.push(<div key={i} className="carousel-slide mirrored" style={slideStyle}>{childs[i]}</div>);
    }
    return { leftMirroredSlides, rightMirroedSlides };
}

export function getIntialStateOfCarousel(config) {
    const noOfSlides = React.Children.count(config.children);
    const isFitToView = noOfSlides === config.slidesPerView;
    const state = {
        currentSlide: config.currentSlide,
        disabledInfinite: !config.infinite || isFitToView,
        isFitToView,
        noOfSlides
    };
    Object.assign(state, getStyle({ ...state, ...config }));
    Object.assign(state, getMirroredSlides({ ...state, ...config }));
    if (config.currentSlide) Object.assign(state, { trackStyle: getTrackStyle({ current: config.currentSlide, prevOrNext: 0, transitionOFF: true, ...state, ...config }) });
    return state;
}
