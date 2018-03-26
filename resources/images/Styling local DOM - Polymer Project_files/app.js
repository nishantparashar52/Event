/*
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
!function(e){"use strict";function n(){ga("send","event","button","download")}function t(e){ga("send","event","search",e)}function o(e){var n=e||location.pathname+location.hash;ga("send","pageview",n),ga("devrelTracker.send","pageview",n)}if("registerElement"in document&&"import"in document.createElement("link")&&"content"in document.createElement("template"));else{var c=document.createElement("script");c.src="/bower_components/webcomponentsjs/webcomponents-lite.min.js",document.body.appendChild(c)}e.recordPageview=o,e.recordSearch=t,e.downloadStarter=n,function(e,n,t,o,c,a,r){e.GoogleAnalyticsObject=c,e[c]=e[c]||function(){(e[c].q=e[c].q||[]).push(arguments)},e[c].l=1*new Date,a=n.createElement(t),r=n.getElementsByTagName(t)[0],a.async=1,a.src=o,r.parentNode.insertBefore(a,r)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-39334307-1","auto",{siteSpeedSampleRate:50}),ga("create","UA-49880327-9","auto",{name:"devrelTracker"}),o(),console&&console.log("%cWelcome to Polymer!\n%cweb components are the <bees-knees>","font-size:1.5em;color:#4558c9;","color:#d61a7f;font-size:1em;")}(window);