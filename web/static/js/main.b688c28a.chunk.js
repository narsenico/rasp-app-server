(this["webpackJsonprasp-app-client"]=this["webpackJsonprasp-app-client"]||[]).push([[0],{36:function(e,t,a){e.exports=a(68)},41:function(e,t,a){},64:function(e,t,a){},65:function(e,t,a){},66:function(e,t,a){},67:function(e,t,a){},68:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(34),i=a.n(r),o=(a(41),a(10)),s=a.n(o),l=a(13),u=a(12),m=a(14),d=a.n(m),v=a(74),f=a(71),p=a(73),w=a(72),E=a(35),h=function(e,t,a){var c=Object(n.useRef)();Object(n.useEffect)((function(){c.current=e}),[e]),Object(n.useEffect)((function(){var e;return t<a&&(e=setTimeout(c.current,t)),function(){clearTimeout(e)}}),[c,t,a]),Object(n.useEffect)((function(){var e=setInterval(c.current,a);return function(){clearInterval(e)}}),[c,a])},y=function(e,t){return Object(v.a)(e,t,{locale:w.a})},b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Date.now();return y(e,"HH:mm")},x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Date.now();return y(e,"EEE, dd MMM")},O=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Date.now(),t=y(Date.now(),"yyyyMMdd"),a=y(Object(f.a)(Date.now(),1),"yyyyMMdd"),n=y(e,"yyyyMMdd");return n===t?"Oggi":n===a?"Domani":x(e)},N=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"yyyyMMdd";return Object(p.a)(e,t,0)};a(64);var j=function(){var e=Object(n.useState)(),t=Object(u.a)(e,2),a=t[0],r=t[1],i=Object(n.useState)(),o=Object(u.a)(i,2),m=o[0],v=o[1];return h((function(){v(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Date.now();return y(e,"HH:mm:ss")}())}),1e3,1e3),h((function(){Object(l.a)(s.a.mark((function e(){var t,a,n,c,i,o,l,u,m,v;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.a.get("".concat("http://192.168.0.4:3001","/calendar/events"));case 3:t=e.sent,0===(a=t.data).length?r(null):(n=a[0],c=n.start,i=n.end,o=n.summary,l=n.description,u=n.location,m=new Date(c),v=new Date(i),r({start:"".concat(O(m)," ").concat(b(m)),end:"".concat(O(v)," ").concat(b(v)),summary:o,description:l,location:u})),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.error(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()}),0,6e4),c.a.createElement("div",{className:"calendar-event"},c.a.createElement("div",{className:"time"},m),a?c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"start"},a.start),c.a.createElement("div",{className:"end"},a.end),c.a.createElement("div",{className:"summary"},a.summary),c.a.createElement("div",{className:"descr"},a.description),c.a.createElement("div",{className:"location"},a.location)):c.a.createElement("div",{className:"descr"},"Non hai un cazzo da fare"))},g=function(e,t,a){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,c=e.weather[n],r=+(new Date(e.date).getTime()/1e3).toFixed();return r>=t&&r<a?"wi wi-owm-day-".concat(c.id):r>=a||r<t?"wi wi-owm-night-".concat(c.id):""};a(65);var M=function(){var e=Object(n.useState)(),t=Object(u.a)(e,2),a=t[0],r=t[1];return function(e,t,a){var c=a.runOnInit,r=Object(n.useRef)();Object(n.useEffect)((function(){r.current=t}),[t]),Object(n.useEffect)((function(){var t=new E.CronJob(e,r.current,null,!1,void 0,void 0,c);return t.start(),function(){return t.stop()}}),[e,c])}("0 */30 * * * *",Object(l.a)(s.a.mark((function e(){var t,a,n,c,i;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.a.get("".concat("http://192.168.0.4:3001","/weather/forecast"));case 3:t=e.sent,a=t.data,n=a.sunrise,c=a.sunset,i=a.hourly,r({current:{description:i[0].weather[0].description,icon:g(i[0],n,c)},items:i.slice(1,5).map((function(e){return{time:b(new Date(e.date)),icon:g(e,n,c)}}))}),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),console.error(e.t0),r(null);case 12:case"end":return e.stop()}}),e,null,[[0,8]])}))),{runOnInit:!0}),c.a.createElement("div",{className:"weather box"},a?c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"weather-description marquee box-header text-center place-center text-uppercase text-ellipsis text-2x"},a.current.description),c.a.createElement("div",{className:"weather-icon place-center"},c.a.createElement("i",{className:a.current.icon})),c.a.createElement("div",{className:"weather-items"},a.items.map((function(e,t){return c.a.createElement("div",{key:t},c.a.createElement("div",null,e.time),c.a.createElement("i",{className:e.icon}))})))):null)},k=(a(66),{P:"Plastica",C:"Carta",U:"Umido",V:"Vetro",S:"Secco"});var D=function(){var e=Object(n.useState)({}),t=Object(u.a)(e,2),a=t[0],r=t[1];return Object(n.useEffect)((function(){Object(l.a)(s.a.mark((function e(){var t,a,n,c,i;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=y(new Date,"yyyyMMdd"),a=b(),e.next=5,d.a.get("".concat("http://192.168.0.4:3001","/waste/").concat(t));case 5:n=e.sent,c=n.data,i=a<="10:00"&&c[0]?0:1,c[i]?r({title:O(N(c[i].date)),items:c[i].waste.split("").map((function(e){return{icon:"waste-icon-"+e,type:e,description:k[e]}}))}):r({title:"NULLA",itmes:[]}),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))()}),[]),c.a.createElement("div",{className:"waste-collection box"},c.a.createElement("div",{className:"box-header text-center place-center text-uppercase text-ellipsis text-2x"},a.title),c.a.createElement("div",{className:"item-container"},a.items&&a.items.map((function(e,t){return c.a.createElement("div",{key:t,className:"item"},c.a.createElement("div",{className:"descr text-uppercase"},e.description),c.a.createElement("div",{className:"icon"},c.a.createElement("div",{className:"waste-icon",type:e.type})))}))))};a(67);var S=function(){return c.a.createElement("div",{className:"app"},c.a.createElement("main",null,c.a.createElement(D,null),c.a.createElement(M,null)),c.a.createElement("footer",null,c.a.createElement(j,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[36,1,2]]]);
//# sourceMappingURL=main.b688c28a.chunk.js.map