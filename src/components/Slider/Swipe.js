import React from 'react';
import PropTypes from 'prop-types';

class Swipe extends React.PureComponent {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
    }

    componentDidMount() {
        const $container = this.containerRef.current;
        if ($container) {
            this.containerWidth = $container.getBoundingClientRect().width;
        }
    }

    onTouchStart(event) {
        this.start = {
            pageX: event.touches[0].pageX,
            pageY: event.touches[0].pageY,
            time: Number(new Date())
        };
        this.isScrolling = null;
        this.deltaX = 0;
    }

    onTouchMove(event) {
        // this fn ensure event is swiping and not pinching
        if (event.touches.length > 1 || (event.scale && event.scale !== 1)) return;
        this.deltaX = event.touches[0].pageX - this.start.pageX;

        if (this.isScrolling == null) {
            this.isScrolling = !!(this.isScrolling || Math.abs(this.deltaX) < Math.abs(event.touches[0].pageY - this.start.pageY));
        }
    }

    onTouchEnd() {
        /**
         * if slide duration is less than 250ms
         * and if slide amt is greater than 20px
         * or if slide amt is greater than half the width
         */
        // const isValidSlide = Number(new Date()) - (this.start.time < 250) && Math.abs(this.deltaX) > 20 || (Math.abs(this.deltaX) > this.containerWidth / 2);

        // if (!this.isScrolling && isValidSlide) {
        //     const fn = this.deltaX < 0 ? this.props.next : this.props.previous;
        //     fn();
        // }
    }

    render() {
        return (
            <div className="swipe-container" ref={this.containerRef} onTouchStart={e => this.onTouchStart(e)} onTouchEnd={e => this.onTouchEnd(e)} onTouchMove={e => this.onTouchMove(e)}>
                {this.props.children}
            </div>
        );
    }
}

Swipe.propTypes = {
    previous: PropTypes.func,
    next: PropTypes.func,
    children: PropTypes.element.isRequired
};

Swipe.defaultProps = {
    previous: () => { },
    next: () => { }
};

export default Swipe;
