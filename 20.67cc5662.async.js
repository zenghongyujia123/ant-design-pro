webpackJsonp([20],{1014:function(e,t){e.exports={stepForm:"stepForm___2dNH0",stepFormText:"stepFormText___8f9Gp",result:"result___Mvkvs",desc:"desc___1Hidv",information:"information___3Dwf0",label:"label___lLVL4",money:"money___6-ji-",uppercase:"uppercase___3OjmB"}},546:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(585),s=r(a),i=n(647),o=r(i),l=n(648),u=r(l);n(595),n(649),n(650);var c=n(0),f=r(c),d=n(231),p=n(968),m=r(p),h=n(1014),y=r(h);t.default=function(e){var t=e.dispatch,n=e.data,r=function(){t(d.routerRedux.push("/form/step-form"))},a=f.default.createElement("div",{className:y.default.information},f.default.createElement(o.default,null,f.default.createElement(u.default,{span:8,className:y.default.label},"\u4ed8\u6b3e\u8d26\u6237\uff1a"),f.default.createElement(u.default,{span:16},n.payAccount)),f.default.createElement(o.default,null,f.default.createElement(u.default,{span:8,className:y.default.label},"\u6536\u6b3e\u8d26\u6237\uff1a"),f.default.createElement(u.default,{span:16},n.receiverAccount)),f.default.createElement(o.default,null,f.default.createElement(u.default,{span:8,className:y.default.label},"\u6536\u6b3e\u4eba\u59d3\u540d\uff1a"),f.default.createElement(u.default,{span:16},n.receiverName)),f.default.createElement(o.default,null,f.default.createElement(u.default,{span:8,className:y.default.label},"\u8f6c\u8d26\u91d1\u989d\uff1a"),f.default.createElement(u.default,{span:16},f.default.createElement("span",{className:y.default.money},n.amount)," \u5143"))),i=f.default.createElement("div",null,f.default.createElement(s.default,{type:"primary",onClick:r},"\u518d\u8f6c\u4e00\u7b14"),f.default.createElement(s.default,null,"\u67e5\u770b\u8d26\u5355"));return f.default.createElement(m.default,{type:"success",title:"\u64cd\u4f5c\u6210\u529f",description:"\u9884\u8ba1\u4e24\u5c0f\u65f6\u5185\u5230\u8d26",extra:a,actions:i,className:y.default.result})},e.exports=t.default},573:function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}},575:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(5),a=n.n(r),s=n(123),i=n.n(s),o=n(0),l=(n.n(o),n(226)),u=n.n(l),c=n(228),f=function(e){var t=e.type,n=e.className,r=void 0===n?"":n,s=e.spin,l=u()(i()({anticon:!0,"anticon-spin":!!s||"loading"===t},"anticon-"+t,!0),r);return o.createElement("i",a()({},Object(c.a)(e,["type","spin"]),{className:l}))};t.default=f},585:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(607),a=n(608);r.a.Group=a.a,t.default=r.a},587:function(e,t){},589:function(e,t,n){"use strict";var r=n(610),a=n(611);n.d(t,"b",function(){return r.a}),n.d(t,"a",function(){return a.a})},592:function(e,t){function n(e,t){var n=0,r=e.length;for(n;n<r&&!1!==t(e[n],n);n++);}function r(e){return"[object Array]"===Object.prototype.toString.apply(e)}function a(e){return"function"==typeof e}e.exports={isFunction:a,isArray:r,each:n}},595:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(227),a=(n.n(r),n(612));n.n(a)},607:function(e,t,n){"use strict";function r(e){return"string"==typeof e}function a(e,t){if(null!=e){var n=t?" ":"";return"string"!=typeof e&&"number"!=typeof e&&r(e.type)&&E(e.props.children)?v.cloneElement(e,{},e.props.children.split("").join(n)):"string"==typeof e?(E(e)&&(e=e.split("").join(n)),v.createElement("span",null,e)):e}}var s=n(5),i=n.n(s),o=n(123),l=n.n(o),u=n(27),c=n.n(u),f=n(28),d=n.n(f),p=n(39),m=n.n(p),h=n(40),y=n.n(h),v=n(0),_=(n.n(v),n(2)),g=n.n(_),b=n(226),O=n.n(b),x=n(228),j=n(575),w=this&&this.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&(n[r[a]]=e[r[a]]);return n},N=/^[\u4e00-\u9fa5]{2}$/,E=N.test.bind(N),P=function(e){function t(e){c()(this,t);var n=m()(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleClick=function(e){n.setState({clicked:!0}),clearTimeout(n.timeout),n.timeout=window.setTimeout(function(){return n.setState({clicked:!1})},500);var t=n.props.onClick;t&&t(e)},n.state={loading:e.loading,clicked:!1},n}return y()(t,e),d()(t,[{key:"componentWillReceiveProps",value:function(e){var t=this,n=this.props.loading,r=e.loading;n&&clearTimeout(this.delayTimeout),"boolean"!=typeof r&&r&&r.delay?this.delayTimeout=window.setTimeout(function(){return t.setState({loading:r})},r.delay):this.setState({loading:r})}},{key:"componentWillUnmount",value:function(){this.timeout&&clearTimeout(this.timeout),this.delayTimeout&&clearTimeout(this.delayTimeout)}},{key:"render",value:function(){var e,t=this.props,n=t.type,r=t.shape,s=t.size,o=t.className,u=t.htmlType,c=t.children,f=t.icon,d=t.prefixCls,p=t.ghost,m=w(t,["type","shape","size","className","htmlType","children","icon","prefixCls","ghost"]),h=this.state,y=h.loading,_=h.clicked,g="";switch(s){case"large":g="lg";break;case"small":g="sm"}var b=O()(d,o,(e={},l()(e,d+"-"+n,n),l()(e,d+"-"+r,r),l()(e,d+"-"+g,g),l()(e,d+"-icon-only",!c&&f),l()(e,d+"-loading",y),l()(e,d+"-clicked",_),l()(e,d+"-background-ghost",p),e)),N=y?"loading":f,E=N?v.createElement(j.default,{type:N}):null,P=1===v.Children.count(c)&&(!N||"loading"===N),k=c?v.Children.map(c,function(e){return a(e,P)}):null;return v.createElement("button",i()({},Object(x.a)(m,["loading"]),{type:u||"button",className:b,onClick:this.handleClick}),E,k)}}]),t}(v.Component);t.a=P,P.__ANT_BUTTON=!0,P.defaultProps={prefixCls:"ant-btn",loading:!1,ghost:!1},P.propTypes={type:g.a.string,shape:g.a.oneOf(["circle","circle-outline"]),size:g.a.oneOf(["large","default","small"]),htmlType:g.a.oneOf(["submit","button","reset"]),onClick:g.a.func,loading:g.a.oneOfType([g.a.bool,g.a.object]),className:g.a.string,icon:g.a.string}},608:function(e,t,n){"use strict";var r=n(5),a=n.n(r),s=n(123),i=n.n(s),o=n(0),l=(n.n(o),n(226)),u=n.n(l),c=this&&this.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&(n[r[a]]=e[r[a]]);return n},f=function(e){var t=e.prefixCls,n=void 0===t?"ant-btn-group":t,r=e.size,s=e.className,l=c(e,["prefixCls","size","className"]),f="";switch(r){case"large":f="lg";break;case"small":f="sm"}var d=u()(n,i()({},n+"-"+f,f),s);return o.createElement("div",a()({},l,{className:d}))};t.a=f},610:function(e,t,n){"use strict";var r=n(123),a=n.n(r),s=n(5),i=n.n(s),o=n(17),l=n.n(o),u=n(27),c=n.n(u),f=n(28),d=n.n(f),p=n(39),m=n.n(p),h=n(40),y=n.n(h),v=n(0),_=(n.n(v),n(226)),g=n.n(_),b=n(2),O=n.n(b),x=this&&this.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&(n[r[a]]=e[r[a]]);return n},j=void 0;if("undefined"!=typeof window){var w=function(e){return{media:e,matches:!1,addListener:function(){},removeListener:function(){}}};window.matchMedia=window.matchMedia||w,j=n(624)}var N=["xxl","xl","lg","md","sm","xs"],E={xs:"(max-width: 575px)",sm:"(min-width: 576px)",md:"(min-width: 768px)",lg:"(min-width: 992px)",xl:"(min-width: 1200px)",xxl:"(min-width: 1600px)"},P=function(e){function t(){c()(this,t);var e=m()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.state={screens:{}},e}return y()(t,e),d()(t,[{key:"componentDidMount",value:function(){var e=this;Object.keys(E).map(function(t){return j.register(E[t],{match:function(){"object"===l()(e.props.gutter)&&e.setState(function(e){return{screens:i()({},e.screens,a()({},t,!0))}})},unmatch:function(){"object"===l()(e.props.gutter)&&e.setState(function(e){return{screens:i()({},e.screens,a()({},t,!1))}})},destroy:function(){}})})}},{key:"componentWillUnmount",value:function(){Object.keys(E).map(function(e){return j.unregister(E[e])})}},{key:"getGutter",value:function(){var e=this.props.gutter;if("object"===(void 0===e?"undefined":l()(e)))for(var t=0;t<=N.length;t++){var n=N[t];if(this.state.screens[n]&&void 0!==e[n])return e[n]}return e}},{key:"render",value:function(){var e,t=this.props,n=t.type,r=t.justify,s=t.align,o=t.className,l=t.style,u=t.children,c=t.prefixCls,f=void 0===c?"ant-row":c,d=x(t,["type","justify","align","className","style","children","prefixCls"]),p=this.getGutter(),m=g()((e={},a()(e,f,!n),a()(e,f+"-"+n,n),a()(e,f+"-"+n+"-"+r,n&&r),a()(e,f+"-"+n+"-"+s,n&&s),e),o),h=p>0?i()({marginLeft:p/-2,marginRight:p/-2},l):l,y=v.Children.map(u,function(e){return e?e.props&&p>0?Object(v.cloneElement)(e,{style:i()({paddingLeft:p/2,paddingRight:p/2},e.props.style)}):e:null}),_=i()({},d);return delete _.gutter,v.createElement("div",i()({},_,{className:m,style:h}),y)}}]),t}(v.Component);t.a=P,P.defaultProps={gutter:0},P.propTypes={type:O.a.string,align:O.a.string,justify:O.a.string,className:O.a.string,children:O.a.node,gutter:O.a.oneOfType([O.a.object,O.a.number]),prefixCls:O.a.string}},611:function(e,t,n){"use strict";var r=n(123),a=n.n(r),s=n(5),i=n.n(s),o=n(17),l=n.n(o),u=n(27),c=n.n(u),f=n(28),d=n.n(f),p=n(39),m=n.n(p),h=n(40),y=n.n(h),v=n(0),_=(n.n(v),n(2)),g=n.n(_),b=n(226),O=n.n(b),x=this&&this.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&(n[r[a]]=e[r[a]]);return n},j=g.a.oneOfType([g.a.string,g.a.number]),w=g.a.oneOfType([g.a.object,g.a.number]),N=function(e){function t(){return c()(this,t),m()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return y()(t,e),d()(t,[{key:"render",value:function(){var e,t=this.props,n=t.span,r=t.order,s=t.offset,o=t.push,u=t.pull,c=t.className,f=t.children,d=t.prefixCls,p=void 0===d?"ant-col":d,m=x(t,["span","order","offset","push","pull","className","children","prefixCls"]),h={};["xs","sm","md","lg","xl","xxl"].forEach(function(e){var n,r={};"number"==typeof t[e]?r.span=t[e]:"object"===l()(t[e])&&(r=t[e]||{}),delete m[e],h=i()({},h,(n={},a()(n,p+"-"+e+"-"+r.span,void 0!==r.span),a()(n,p+"-"+e+"-order-"+r.order,r.order||0===r.order),a()(n,p+"-"+e+"-offset-"+r.offset,r.offset||0===r.offset),a()(n,p+"-"+e+"-push-"+r.push,r.push||0===r.push),a()(n,p+"-"+e+"-pull-"+r.pull,r.pull||0===r.pull),n))});var y=O()((e={},a()(e,p+"-"+n,void 0!==n),a()(e,p+"-order-"+r,r),a()(e,p+"-offset-"+s,s),a()(e,p+"-push-"+o,o),a()(e,p+"-pull-"+u,u),e),c,h);return v.createElement("div",i()({},m,{className:y}),f)}}]),t}(v.Component);t.a=N,N.propTypes={span:j,order:j,offset:j,push:j,pull:j,className:g.a.string,children:g.a.node,xs:w,sm:w,md:w,lg:w,xl:w}},612:function(e,t){},613:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(227);n.n(r)},624:function(e,t,n){var r=n(625);e.exports=new r},625:function(e,t,n){function r(){if(!window.matchMedia)throw new Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!window.matchMedia("only all").matches}var a=n(626),s=n(592),i=s.each,o=s.isFunction,l=s.isArray;r.prototype={constructor:r,register:function(e,t,n){var r=this.queries,s=n&&this.browserIsIncapable;return r[e]||(r[e]=new a(e,s)),o(t)&&(t={match:t}),l(t)||(t=[t]),i(t,function(t){o(t)&&(t={match:t}),r[e].addHandler(t)}),this},unregister:function(e,t){var n=this.queries[e];return n&&(t?n.removeHandler(t):(n.clear(),delete this.queries[e])),this}},e.exports=r},626:function(e,t,n){function r(e,t){this.query=e,this.isUnconditional=t,this.handlers=[],this.mql=window.matchMedia(e);var n=this;this.listener=function(e){n.mql=e.currentTarget||e,n.assess()},this.mql.addListener(this.listener)}var a=n(627),s=n(592).each;r.prototype={constuctor:r,addHandler:function(e){var t=new a(e);this.handlers.push(t),this.matches()&&t.on()},removeHandler:function(e){var t=this.handlers;s(t,function(n,r){if(n.equals(e))return n.destroy(),!t.splice(r,1)})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){s(this.handlers,function(e){e.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var e=this.matches()?"on":"off";s(this.handlers,function(t){t[e]()})}},e.exports=r},627:function(e,t){function n(e){this.options=e,!e.deferSetup&&this.setup()}n.prototype={constructor:n,setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(e){return this.options===e||this.options.match===e}},e.exports=n},647:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(589);t.default=r.b},648:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(589);t.default=r.a},649:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(227),a=(n.n(r),n(587));n.n(a)},650:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(227),a=(n.n(r),n(587));n.n(a)},968:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e){var t=e.className,n=e.type,r=e.title,a=e.description,s=e.extra,o=e.actions,u=(0,c.default)(e,["className","type","title","description","extra","actions"]),f={error:d.default.createElement(l.default,{className:y.default.error,type:"close-circle"}),success:d.default.createElement(l.default,{className:y.default.success,type:"check-circle"})},p=(0,m.default)(y.default.result,t);return d.default.createElement("div",(0,i.default)({className:p},u),d.default.createElement("div",{className:y.default.icon},f[n]),d.default.createElement("div",{className:y.default.title},r),a&&d.default.createElement("div",{className:y.default.description},a),s&&d.default.createElement("div",{className:y.default.extra},s),o&&d.default.createElement("div",{className:y.default.actions},o))}Object.defineProperty(t,"__esModule",{value:!0});var s=n(5),i=r(s),o=n(575),l=r(o),u=n(573),c=r(u);t.default=a,n(613);var f=n(0),d=r(f),p=n(226),m=r(p),h=n(969),y=r(h);e.exports=t.default},969:function(e,t){e.exports={result:"result___Hm4g7",icon:"icon___3gQI1",success:"success___mKc7I",error:"error___1xqXc",title:"title___3_4zg",description:"description___1xuel",extra:"extra___2XdYc",actions:"actions___1qj92"}}});