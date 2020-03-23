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

export const hasFrameOnlyProduct = (cartItems = []) => {
    return cartItems.some(eyeFrame => (eyeFrame.classification === 'eyeframe' || eyeFrame.classification === 'sunglasses') && eyeFrame.powerRequired === 'POWER_REQUIRED');
};

export const getHelplineNo = (config, categoryType) => {
    let buyoncallConfig;
    if (config) {
        buyoncallConfig = JSON.parse(config);
    }
    const catConfig = buyoncallConfig ? buyoncallConfig[categoryType] : {};
    if (catConfig && catConfig.isShown !== 'ON') {
        return null;
    }
    if (catConfig && catConfig.contactNumberDisplay) {
        return buyoncallConfig[categoryType].contactNumberDisplay;
    }
    return '';
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

export function determineCategory(pathname, cmsCategoryArray) {
    let category = 'accessories';
    category = category.replace('_', '-');
    if (cmsCategoryArray.indexOf(category) < 0) {
        if (pathname.indexOf('eyeglasses') > -1) {
            category = 'eyeglasses';
        }
        if (pathname.indexOf('sunglasses') > -1) {
            category = 'sunglasses';
        }
        if (pathname.indexOf('power-sunglasses') > -1) {
            category = 'power sunglasses';
            document.cookie = 'product_category=power_sunglasses';
        }
        if (pathname.indexOf('premium-eyeglasses') > -1) {
            category = 'premium eyeglasses';
        }
        if (pathname.indexOf('contact-lenses') > -1) {
            category = 'contact-lenses';
        }
    }
    if (category !== 'contact-lenses') {
        category = category.replace('-', ' ');
    }
    return category;
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

export const extractAndAppendScriptSourceForCMS = domString => {
    const scriptTagString = domString;
    scriptTagString.split('</script>').forEach((domString, index) => {
        // delete node first if they are exist
        const scriptEl = document.getElementById(`cms${index}`);
        if (scriptEl) document.body.removeChild(scriptEl);
        if (domString.indexOf('<script') > -1) {
            const script = document.createElement('script');
            script.id = `cms${index}`;
            if (domString.indexOf('src=') > -1) {
                // in script tag of cms pages src must be last in the tag otherwise condition will break.
                const srcPath = domString.substring(domString.indexOf('src=') + 5, domString.length - 2);
                script.src = srcPath;
            } else {
                const scriptToAppend = domString.substr(domString.indexOf('<script>') + 8);
                script.type = 'text/javascript';
                // script.append(scriptToAppend);
                script.innerHTML = scriptToAppend;
            }
            document.body.appendChild(script);
        }
    });
};

export function updateImageResolution(url, resolution = null) {
    if (url) {
        const urlArray = url.split('/');
        const indexMinusTwo = urlArray.indexOf('cache');
        if (urlArray[indexMinusTwo + 1] === '1' && resolution) {
            const index = indexMinusTwo + 2;
            urlArray[index] = 'thumbnail';
            urlArray[index + 1] = resolution;
            const newUrlString = urlArray.join('/');
            return convertHttps(newUrlString);
        }
        return convertHttps(url);
    }
    return '';
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

export function getLocationApiErrorMessage(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            return 'Error! Location access has earlier been denied, kindly enable it from the browser setting to access the auto detect location.';
        case error.POSITION_UNAVAILABLE:
            return 'Error! Please enable your location services or enter your address or pin-code in search bar.';
        case error.TIMEOUT:
            return 'Error! The request to get user location timed out.';
        case error.UNKNOWN_ERROR:
            return 'Error! An unknown error occurred.';
        default:
            return 'Could not determine your location, please try again';
    }
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

export const readQueryParam = (name, url, isServer) => {
    if (!url && !isServer) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const removeParameterFromUrl = (url, parameter) => {
    return url.replace(new RegExp('^([^#]*\?)(([^#]*)&)?' + parameter + '(\=[^&#]*)?(&|#|$)'), '$1$3$5').replace(/^([^#]*)((\?)&|\?(#|$))/, '$1$3$4');
};

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
};

export function setParam(uri, key, val) {
    return uri
        .replace(new RegExp('([?&]' + key + '(?=[=&#]|$)[^#&]*|(?=#|$))'), '&' + key + '=' + val)
        .replace(/^([^?&]+)&/, '$1?');
}

export function capitalize(str = '') {
    return str.replace(/(?:^|\s)\S/g, a => { return a.toUpperCase(); });
}

// detect search crawler
export function isSearchCrawler(serverCallUserAgent = null) {
    const botPattern = '(googlebot\/|Googlebot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)';
    const re = new RegExp(botPattern, 'i');
    if (serverCallUserAgent) {
        return re.test(serverCallUserAgent);
    }
    return typeof window !== 'undefined' && re.test(window.navigator.userAgent);
}

export const composeValidators = (...validators) => value => validators.reduce((error, validator) => error || validator(value), undefined);

export const sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

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


export function getLogo(cartData, redisCommonData = {}) {
    let dealskartLogo;
    const { RBI_POLICY_MARKETPLACE_CONFIG } = redisCommonData;
    try {
        const rbiMarketPolicy = RBI_POLICY_MARKETPLACE_CONFIG ? JSON.parse(RBI_POLICY_MARKETPLACE_CONFIG) : {};
        dealskartLogo = rbiMarketPolicy.checkout === 'ON' ? rbiMarketPolicy.msitedkLogo : null;
    } catch (error) {
        console.log(error);
    }
    const merchantId = cartData.merchantId ? cartData.merchantId.toLowerCase() : 'lenskart';
    if (merchantId === 'dealskart' && cartData.items && cartData.items.length) {
        return dealskartLogo;
    }
    return null;
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

export function getClassification(type) {
    let classification;
    switch (type) {
        case 'eyeframe':
            classification = 'Eyeglasses';
            break;
        case 'sunglasses':
            classification = 'Sunglasses';
            break;
        case 'contact_lens':
            classification = 'Contact Lens';
            break;
        default:
            classification = 'Accessories';
    }
    return classification;
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

export function resetOrientation(srcBase64, srcOrientation, callback) {
    const img = new Image();

    img.onload = function () {
        const width = img.width;
        const height = img.height;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // set proper canvas dimensions before transform & export
        if (srcOrientation > 4 && srcOrientation < 9) {
            canvas.width = height;
            canvas.height = width;
        } else {
            canvas.width = width;
            canvas.height = height;
        }

        // transform context before drawing image
        switch (srcOrientation) {
            case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
            case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
            case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
            case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
            case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
            case 7: ctx.transform(0, -1, -1, 0, height, width); break;
            case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
            default: break;
        }

        // draw image
        ctx.drawImage(img, 0, 0);

        // export base64
        callback(canvas.toDataURL('image/jpeg'));
    };

    img.src = srcBase64;
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
export const preFetchOrigins = [
    '//www.google-analytics.com',
    '//www.googletagmanager.com',
    // '//api.lenskart.com',
    // '//assets.adobedtm.com',
    // '//cdn.trackjs.com',
    // '//cdn.freshmarketer.com',
    // '//static.lenskart.com',
    '//static.lenskart.com',
    '//static.lenskart.com',
    '//static5.lenskart.com',
    // '//api.yotpo.com',
    // '//staticw2.yotpo.com',
    // '//cdn.appsflyer.com',
    // '//asia.creativecdn.com',
    // '//dis.as.criteo.com',
    // '//www.facebook.com',
    // '//connect.facebook.net',
    // '//static.criteo.net',
    // '//usage.trackjs.com',
    // '//gum.criteo.com',
    // '//sslwidget.criteo.com',
    // '//wa.appsflyer.com',
    // '//s-cs.send.microad.jp',
    // '//wzrkt.com',
    // '//bat.bing.com'
];

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
    const location = place.geometry && place.geometry.location || {};
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