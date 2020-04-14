export const noop = () => { };

export const removeDomainName = (url, alsoRemove = '') => {
    let domain = url.replace('http://', '').replace('https://', '').replace('www.lenskart.com', '');
    if (alsoRemove) domain = domain.replace(alsoRemove, '');
    return domain;
};

export const getQueryParam = (query, param) => {
    const result = {};
    query.split('&').forEach(param => {
        const item = param.split(/=(.+)/);
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return param ? result[param] : result;
};

export const getNumericChars = str => {
    if (str) {
        return str.replace(/\D/g, '');
    }
    return str;
};

export const roundUptoDigits = (number, digits) => {
    if (number) {
        const factor = 10 ** digits;
        return Math.round(Number(number) * factor) / factor;
    }
    return number;
};

export const onImageLoadError = evt => {
    evt.target.src = 'https://static.lenskart.com/media/desktop/img/image.jpg';
};

export const isEmptyObject = obj => {
    return typeof obj === 'object' && Object.keys(obj).length === 0 && obj.constructor === Object;
};

export function isObject(obj) {
    return obj === Object(obj);
}


export function loadFile(file, ext, id, place, async, defer) {
    let child;
    if (ext === 'css') {
        child = document.createElement('link');
        child.rel = 'stylesheet';
        child.href = file;
        child.type = 'text/css';
    } else {
        child = document.createElement('script');
        child.type = 'text/javascript';
        child.src = file;
    }
    if (async === 'async') {
        child.async = 'async';
    }
    if (defer === 'defer') {
        child.defer = 'defer';
    }
    if (id) {
        document.getElementById(id).appendChild(child);
    }
    if (place) {
        document[place].appendChild(child);
    }
}

export function loadScriptWithCallback(url, callback, attrs = {}) {
    if (!document) return;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    Object.keys(attrs).forEach(attr => {
        script[attr] = attrs[attr];
    });
    if (script.readyState) {
        script.onreadystatechange = () => {
            if (script.readyState === 'loaded'
                || script.readyState === 'complete') {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = () => {
            callback();
        };
    }
    script.src = url;
    document.body.appendChild(script);
}

export function convertHttps(value) {
    return value.replace('http:', 'https:');
}

export function isNavigationRequired(pathname) {
    if (pathname === 'checkout/success') return true;
    const noNavigationRequiredUrls = ['checkout', 'rx/buy'];
    return !noNavigationRequiredUrls.some(path => pathname.indexOf(path) > 0);
}

export function isRelativeUrl(url) {
    return url.indexOf('http') === -1 && url.indexOf('//www.lenskart.') === -1;
}

export function disableBackgroundScroll() {
    document.body.classList.add('overflow-hidden');
}

export function enableBackgroundScroll() {
    document.body.classList.remove('overflow-hidden');
}

export function showElement(query, show) { // used in case of lazy load
    const $element = document.querySelector(query);
    if ($element) {
        const display = show ? 'block' : 'none';
        $element.style.display = display;
    }
}

export function checkElementInViewport($element) {
    const rect = $element.getBoundingClientRect();

    return (
        rect.top >= 0
        && rect.left >= 0
        && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

export function debounce(func, wait, immediate) {
    let timeout;
    return function (...args) {
        const context = this;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

export function calcPriceWithGST(price, gstPercentage) {
    const gst = price * gstPercentage / 100;
    return price + gst;
}

export function removeDuplicatesInArray(arr, match = '') {
    const dups = [];
    const retArray = arr.filter(el => {
        const matchKey = match ? el[match] : el;
        // If it is not a duplicate, return true
        if (dups.indexOf(matchKey) === -1) {
            dups.push(matchKey);
            return true;
        }
        return false;
    });
    return retArray;
}

// export const removeParameterFromUrl = (url, parameter) => {
//     return url.replace(new RegExp('^([^#]*\?)(([^#]*)&)?' + parameter + '(\=[^&#]*)?(&|#|$)'), '$1$3$5').replace(/^([^#]*)((\?)&|\?(#|$))/, '$1$3$4');
// }

export const appendScriptToDOM = (scriptSrc, id, isAsync, callback) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scriptSrc;
    if (id) {
        script.id = id;
    }
    if (isAsync) {
        script.async = true;
    }
    if (callback) {
        if (script.readyState) {
            script.onreadystatechange = () => {
                if (script.readyState === 'loaded'
                    || script.readyState === 'complete') {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = () => {
                callback();
            };
        }
    }
    document.head.appendChild(script);
}

export function setParam(uri, key, val) {
    return uri
        .replace(new RegExp('([?&]' + key + '(?=[=&#]|$)[^#&]*|(?=#|$))'), '&' + key + '=' + val)
        .replace(/^([^?&]+)&/, '$1?');
}

export function capitalize(str = '') {
    return str.replace(/(?:^|\s)\S/g, a => { return a.toUpperCase(); });
}

// detect search crawler
// export function isSearchCrawler(serverCallUserAgent = null) {
//     const botPattern = '(googlebot\/|Googlebot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)';
//     const re = new RegExp(botPattern, 'i');
//     if (serverCallUserAgent) {
//         return re.test(serverCallUserAgent);
//     }
//     return typeof window !== 'undefined' && re.test(window.navigator.userAgent);
// }
export function formatDate(time, pattern, year = '') {
    let formattedString = '';
    if (isNaN(time)) return '';
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(time).getDate();
    const day = new Date(time).getDay();
    const month = new Date(time).getMonth();
    formattedString = pattern.replace('EEE', days[day].substr(0, 3));
    formattedString = formattedString.replace('MMM', months[month].substr(0, 3));
    formattedString = formattedString.replace('D', date);
    if (year) {
        formattedString = formattedString.concat(' ' + new Date(time).getFullYear());
    }
    return formattedString;
}

export function getCardType(cardNo) {
    const cards = {
        visa: '^4[0-9]{6,}$',
        maestro: '^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$',
        diners: '^3(?:0[0-5]|[68][0-9])[0-9]{4,}$',
        jcb: '^(?:2131|1800|35[0-9]{3})[0-9]{3,}$',
        amex: '^3[47][0-9]{5,}$',
        discover: '^6(?:011|5[0-9]{2})[0-9]{3,}$'
    };
    const type = Object.keys(cards).find(key => {
        const regx = new RegExp(cards[key]);
        return regx.test(cardNo);
    });
    return type || '';
}

export function getOSType() {
    const ua = window.navigator.userAgent;
    let osType = '';
    if (/Android/i.test(ua)) {
        osType = 'android';
    } else if (/iPhone/i.test(ua)) {
        osType = 'ios';
    }
    return osType;
}

export function replaceUnderscore(text) {
    return text.replace('_', ' ');
}

export function checkElementExist(defaultTimeout, query, cb) {
    let _counter = 100;
    const checkExist = setInterval(() => {
        if (document.querySelector(query) || _counter > defaultTimeout) {
            if (cb) cb(document.querySelector(query));
            clearInterval(checkExist);
        }
        _counter += 100;
    }, 100);
}

export function checkPriceRange(keyprices, lenskartPrice) {
    return keyprices.find(sp => {
        const pricerange = sp.split('_');
        return (lenskartPrice >= pricerange[0] && lenskartPrice <= pricerange[1] || lenskartPrice == pricerange[0] && pricerange[1] == null); // eslint-disable-line
    });
}
export function calcGSTPrice(classification, brandName, frameType, lenskartPrice, PRODUCTS_GST) {
    let gsttotal;
    let finalprice = lenskartPrice;
    const ftype = frameType ? frameType.toLowerCase() : '_';
    if (PRODUCTS_GST) {
        gsttotal = PRODUCTS_GST[`non_fff_${classification}_${brandName}_${ftype}`] || PRODUCTS_GST[`${classification}_${brandName}_${ftype}`] || PRODUCTS_GST[`${classification}_${brandName}`];
        // set default GST based on Product Type
        if (gsttotal == null && PRODUCTS_GST[classification]) gsttotal = PRODUCTS_GST[classification] || 0;
        finalprice = calcPriceWithGST(lenskartPrice, Number(gsttotal));
    }
    return finalprice;
}

export function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}
// export const preConnectOrigins = [
//     '//www.google-analytics.com',
//     '//www.googletagmanager.com',
// ];
export function getGeocodeDetails(data) {
    return new Promise((resolve, reject) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode(data, (results, status) => {
            if (status === 'OK') {
                resolve(results[0]);
            } else {
                reject(new Error('No Result Found..'));
            }
        });
    });
}

export function getAddressFromPlaces(place) {
    const location = (place.geometry && place.geometry.location) || {};
    const lat = typeof location.lat === 'function' ? location.lat() : undefined;
    const lng = typeof location.lng === 'function' ? location.lng() : undefined;
    if (place && place.address_components && place.address_components.length) {
        const a = place.address_components.reduce((memo, c) => {
            memo[c.types[0]] = c.long_name;
            return memo;
        }, {});
        return {
            lat,
            lng,
            postcode: a.postal_code,
            city: a.locality || a.administrative_area_level_2 || a.administrative_area_level_1,
            state: a.administrative_area_level_1,
            country: a.country,
            formattedAddress: place.formatted_address
        };
    }
    return {
        formattedAddress: place ? place.name : '',
        lat,
        lng,
    };
}