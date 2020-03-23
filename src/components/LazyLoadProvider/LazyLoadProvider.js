import React from 'react';
import './LazyLoadProvider.scss';

class LazyLoadProvider extends React.PureComponent {
    constructor(props) {
        super(props);
        this.lazyloadThrottleTimeout = '';
        this.lazyloadImage = null;
        this.handleScroll = this.handleScroll.bind(this);
        this.handleIntersectionObserver = this.handleIntersectionObserver.bind(this);
        this.imgRef = React.createRef();
    }

    componentDidMount() {
        // This is for those browser who support Intersection Observer
        if ('IntersectionObserver' in window) {
            this.handleIntersectionObserver();
        } else {
            // This is for those browser who don't support Intersection Observer
            this.lazyloadImage = this.imgRef.current;
            window.addEventListener('scroll', this.handleScroll);
            window.addEventListener('resize', this.handleScroll);
            window.addEventListener('orientationChange', this.handleScroll);
        }
    }

    componentDidUpdate(prevProps) {
        const { src } = this.props;
        if (prevProps.src !== src && 'IntersectionObserver' in window) {
            this.handleIntersectionObserver();
        }
    }

    componentWillUnmount() {
        if (this.imageObserver) {
            this.imageObserver.unobserve(this.lazyloadImage);
        }
    }

    handleIntersectionObserver() {
        this.lazyloadImage = this.imgRef.current;
        this.imageObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.lazyloadImage.src = this.lazyloadImage.dataset.src;
                    this.lazyloadImage.onload = () => {
                        this.lazyloadImage.classList.remove('lazy');
                    };
                    this.imageObserver.unobserve(this.lazyloadImage);
                }
            });
        });
        this.imageObserver.observe(this.lazyloadImage);
    }

    handleScroll() {
        if (this.lazyloadThrottleTimeout) {
            clearTimeout(this.lazyloadThrottleTimeout);
        }
        this.lazyloadThrottleTimeout = setTimeout(() => {
            const scrollTop = window.pageYOffset;
            if (this.lazyloadImage.offsetTop < (window.innerHeight + scrollTop)) {
                this.lazyloadImage.src = this.lazyloadImage.dataset.src;
                this.lazyloadImage.classList.remove('lazy');
            }
            if (this.lazyloadImage.length === 0) {
                document.removeEventListener('scroll', this.handleScroll);
                window.removeEventListener('resize', this.handleScroll);
                window.removeEventListener('orientationChange', this.handleScroll);
            }
        }, 20);
    }

    render() {
        const { alt, style, className, src } = this.props;
        return (<img ref={this.imgRef} alt={alt} data-src={src} style={style} className={className} src={src} />);
    }
}

export default LazyLoadProvider;
