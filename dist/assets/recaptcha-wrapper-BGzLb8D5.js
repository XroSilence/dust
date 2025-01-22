import{g as Y,r as L}from"./react-vendor-pwIkDrj-.js";var N={exports:{}},$,z;function Q(){if(z)return $;z=1;var n="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return $=n,$}var C,H;function X(){if(H)return C;H=1;var n=Q();function o(){}function i(){}return i.resetWarningCache=o,C=function(){function e(y,R,_,h,l,s){if(s!==n){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}e.isRequired=e;function t(){return e}var c={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:o};return c.PropTypes=c,c},C}var G;function Z(){return G||(G=1,N.exports=X()()),N.exports}var ee=Z();const v=Y(ee);var te=["sitekey","onChange","theme","type","tabindex","onExpired","onErrored","size","stoken","grecaptcha","badge","hl","isolated"];function D(){return D=Object.assign?Object.assign.bind():function(n){for(var o=1;o<arguments.length;o++){var i=arguments[o];for(var e in i)Object.prototype.hasOwnProperty.call(i,e)&&(n[e]=i[e])}return n},D.apply(this,arguments)}function re(n,o){if(n==null)return{};var i={},e=Object.keys(n),t,c;for(c=0;c<e.length;c++)t=e[c],!(o.indexOf(t)>=0)&&(i[t]=n[t]);return i}function E(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function ne(n,o){n.prototype=Object.create(o.prototype),n.prototype.constructor=n,q(n,o)}function q(n,o){return q=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},q(n,o)}var I=function(n){ne(o,n);function o(){var e;return e=n.call(this)||this,e.handleExpired=e.handleExpired.bind(E(e)),e.handleErrored=e.handleErrored.bind(E(e)),e.handleChange=e.handleChange.bind(E(e)),e.handleRecaptchaRef=e.handleRecaptchaRef.bind(E(e)),e}var i=o.prototype;return i.getCaptchaFunction=function(t){return this.props.grecaptcha?this.props.grecaptcha.enterprise?this.props.grecaptcha.enterprise[t]:this.props.grecaptcha[t]:null},i.getValue=function(){var t=this.getCaptchaFunction("getResponse");return t&&this._widgetId!==void 0?t(this._widgetId):null},i.getWidgetId=function(){return this.props.grecaptcha&&this._widgetId!==void 0?this._widgetId:null},i.execute=function(){var t=this.getCaptchaFunction("execute");if(t&&this._widgetId!==void 0)return t(this._widgetId);this._executeRequested=!0},i.executeAsync=function(){var t=this;return new Promise(function(c,y){t.executionResolve=c,t.executionReject=y,t.execute()})},i.reset=function(){var t=this.getCaptchaFunction("reset");t&&this._widgetId!==void 0&&t(this._widgetId)},i.forceReset=function(){var t=this.getCaptchaFunction("reset");t&&t()},i.handleExpired=function(){this.props.onExpired?this.props.onExpired():this.handleChange(null)},i.handleErrored=function(){this.props.onErrored&&this.props.onErrored(),this.executionReject&&(this.executionReject(),delete this.executionResolve,delete this.executionReject)},i.handleChange=function(t){this.props.onChange&&this.props.onChange(t),this.executionResolve&&(this.executionResolve(t),delete this.executionReject,delete this.executionResolve)},i.explicitRender=function(){var t=this.getCaptchaFunction("render");if(t&&this._widgetId===void 0){var c=document.createElement("div");this._widgetId=t(c,{sitekey:this.props.sitekey,callback:this.handleChange,theme:this.props.theme,type:this.props.type,tabindex:this.props.tabindex,"expired-callback":this.handleExpired,"error-callback":this.handleErrored,size:this.props.size,stoken:this.props.stoken,hl:this.props.hl,badge:this.props.badge,isolated:this.props.isolated}),this.captcha.appendChild(c)}this._executeRequested&&this.props.grecaptcha&&this._widgetId!==void 0&&(this._executeRequested=!1,this.execute())},i.componentDidMount=function(){this.explicitRender()},i.componentDidUpdate=function(){this.explicitRender()},i.handleRecaptchaRef=function(t){this.captcha=t},i.render=function(){var t=this.props;t.sitekey,t.onChange,t.theme,t.type,t.tabindex,t.onExpired,t.onErrored,t.size,t.stoken,t.grecaptcha,t.badge,t.hl,t.isolated;var c=re(t,te);return L.createElement("div",D({},c,{ref:this.handleRecaptchaRef}))},o}(L.Component);I.displayName="ReCAPTCHA";I.propTypes={sitekey:v.string.isRequired,onChange:v.func,grecaptcha:v.object,theme:v.oneOf(["dark","light"]),type:v.oneOf(["image","audio"]),tabindex:v.number,onExpired:v.func,onErrored:v.func,size:v.oneOf(["compact","normal","invisible"]),stoken:v.string,hl:v.string,badge:v.oneOf(["bottomright","bottomleft","inline"]),isolated:v.bool};I.defaultProps={onChange:function(){},theme:"light",type:"image",tabindex:0,size:"normal",badge:"bottomright"};var A={exports:{}},p={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var V;function oe(){if(V)return p;V=1;var n=typeof Symbol=="function"&&Symbol.for,o=n?Symbol.for("react.element"):60103,i=n?Symbol.for("react.portal"):60106,e=n?Symbol.for("react.fragment"):60107,t=n?Symbol.for("react.strict_mode"):60108,c=n?Symbol.for("react.profiler"):60114,y=n?Symbol.for("react.provider"):60109,R=n?Symbol.for("react.context"):60110,_=n?Symbol.for("react.async_mode"):60111,h=n?Symbol.for("react.concurrent_mode"):60111,l=n?Symbol.for("react.forward_ref"):60112,s=n?Symbol.for("react.suspense"):60113,a=n?Symbol.for("react.suspense_list"):60120,d=n?Symbol.for("react.memo"):60115,u=n?Symbol.for("react.lazy"):60116,x=n?Symbol.for("react.block"):60121,w=n?Symbol.for("react.fundamental"):60117,P=n?Symbol.for("react.responder"):60118,S=n?Symbol.for("react.scope"):60119;function f(r){if(typeof r=="object"&&r!==null){var b=r.$$typeof;switch(b){case o:switch(r=r.type,r){case _:case h:case e:case c:case t:case s:return r;default:switch(r=r&&r.$$typeof,r){case R:case l:case u:case d:case y:return r;default:return b}}case i:return b}}}function g(r){return f(r)===h}return p.AsyncMode=_,p.ConcurrentMode=h,p.ContextConsumer=R,p.ContextProvider=y,p.Element=o,p.ForwardRef=l,p.Fragment=e,p.Lazy=u,p.Memo=d,p.Portal=i,p.Profiler=c,p.StrictMode=t,p.Suspense=s,p.isAsyncMode=function(r){return g(r)||f(r)===_},p.isConcurrentMode=g,p.isContextConsumer=function(r){return f(r)===R},p.isContextProvider=function(r){return f(r)===y},p.isElement=function(r){return typeof r=="object"&&r!==null&&r.$$typeof===o},p.isForwardRef=function(r){return f(r)===l},p.isFragment=function(r){return f(r)===e},p.isLazy=function(r){return f(r)===u},p.isMemo=function(r){return f(r)===d},p.isPortal=function(r){return f(r)===i},p.isProfiler=function(r){return f(r)===c},p.isStrictMode=function(r){return f(r)===t},p.isSuspense=function(r){return f(r)===s},p.isValidElementType=function(r){return typeof r=="string"||typeof r=="function"||r===e||r===h||r===c||r===t||r===s||r===a||typeof r=="object"&&r!==null&&(r.$$typeof===u||r.$$typeof===d||r.$$typeof===y||r.$$typeof===R||r.$$typeof===l||r.$$typeof===w||r.$$typeof===P||r.$$typeof===S||r.$$typeof===x)},p.typeOf=f,p}var B;function ie(){return B||(B=1,A.exports=oe()),A.exports}var F,K;function ae(){if(K)return F;K=1;var n=ie(),o={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},i={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},e={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},t={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},c={};c[n.ForwardRef]=e,c[n.Memo]=t;function y(u){return n.isMemo(u)?t:c[u.$$typeof]||o}var R=Object.defineProperty,_=Object.getOwnPropertyNames,h=Object.getOwnPropertySymbols,l=Object.getOwnPropertyDescriptor,s=Object.getPrototypeOf,a=Object.prototype;function d(u,x,w){if(typeof x!="string"){if(a){var P=s(x);P&&P!==a&&d(u,P,w)}var S=_(x);h&&(S=S.concat(h(x)));for(var f=y(u),g=y(x),r=0;r<S.length;++r){var b=S[r];if(!i[b]&&!(w&&w[b])&&!(g&&g[b])&&!(f&&f[b])){var m=l(x,b);try{R(u,b,m)}catch{}}}}return u}return F=d,F}var ce=ae();const se=Y(ce);function k(){return k=Object.assign||function(n){for(var o=1;o<arguments.length;o++){var i=arguments[o];for(var e in i)Object.prototype.hasOwnProperty.call(i,e)&&(n[e]=i[e])}return n},k.apply(this,arguments)}function pe(n,o){if(n==null)return{};var i={},e=Object.keys(n),t,c;for(c=0;c<e.length;c++)t=e[c],!(o.indexOf(t)>=0)&&(i[t]=n[t]);return i}function ue(n,o){n.prototype=Object.create(o.prototype),n.prototype.constructor=n,n.__proto__=o}var O={},de=0;function fe(n,o){return o=o||{},function(e){var t=e.displayName||e.name||"Component",c=function(R){ue(_,R);function _(l,s){var a;return a=R.call(this,l,s)||this,a.state={},a.__scriptURL="",a}var h=_.prototype;return h.asyncScriptLoaderGetScriptLoaderID=function(){return this.__scriptLoaderID||(this.__scriptLoaderID="async-script-loader-"+de++),this.__scriptLoaderID},h.setupScriptURL=function(){return this.__scriptURL=typeof n=="function"?n():n,this.__scriptURL},h.asyncScriptLoaderHandleLoad=function(s){var a=this;this.setState(s,function(){return a.props.asyncScriptOnLoad&&a.props.asyncScriptOnLoad(a.state)})},h.asyncScriptLoaderTriggerOnScriptLoaded=function(){var s=O[this.__scriptURL];if(!s||!s.loaded)throw new Error("Script is not loaded.");for(var a in s.observers)s.observers[a](s);delete window[o.callbackName]},h.componentDidMount=function(){var s=this,a=this.setupScriptURL(),d=this.asyncScriptLoaderGetScriptLoaderID(),u=o,x=u.globalName,w=u.callbackName,P=u.scriptId;if(x&&typeof window[x]<"u"&&(O[a]={loaded:!0,observers:{}}),O[a]){var S=O[a];if(S&&(S.loaded||S.errored)){this.asyncScriptLoaderHandleLoad(S);return}S.observers[d]=function(m){return s.asyncScriptLoaderHandleLoad(m)};return}var f={};f[d]=function(m){return s.asyncScriptLoaderHandleLoad(m)},O[a]={loaded:!1,observers:f};var g=document.createElement("script");g.src=a,g.async=!0;for(var r in o.attributes)g.setAttribute(r,o.attributes[r]);P&&(g.id=P);var b=function(T){if(O[a]){var J=O[a],j=J.observers;for(var W in j)T(j[W])&&delete j[W]}};w&&typeof window<"u"&&(window[w]=function(){return s.asyncScriptLoaderTriggerOnScriptLoaded()}),g.onload=function(){var m=O[a];m&&(m.loaded=!0,b(function(T){return w?!1:(T(m),!0)}))},g.onerror=function(){var m=O[a];m&&(m.errored=!0,b(function(T){return T(m),!0}))},document.body.appendChild(g)},h.componentWillUnmount=function(){var s=this.__scriptURL;if(o.removeOnUnmount===!0)for(var a=document.getElementsByTagName("script"),d=0;d<a.length;d+=1)a[d].src.indexOf(s)>-1&&a[d].parentNode&&a[d].parentNode.removeChild(a[d]);var u=O[s];u&&(delete u.observers[this.asyncScriptLoaderGetScriptLoaderID()],o.removeOnUnmount===!0&&delete O[s])},h.render=function(){var s=o.globalName,a=this.props;a.asyncScriptOnLoad;var d=a.forwardedRef,u=pe(a,["asyncScriptOnLoad","forwardedRef"]);return s&&typeof window<"u"&&(u[s]=typeof window[s]<"u"?window[s]:void 0),u.ref=d,L.createElement(e,u)},_}(L.Component),y=L.forwardRef(function(R,_){return L.createElement(c,k({},R,{forwardedRef:_}))});return y.displayName="AsyncScriptLoader("+t+")",y.propTypes={asyncScriptOnLoad:v.func},se(y,e)}}var U="onloadcallback",he="grecaptcha";function M(){return typeof window<"u"&&window.recaptchaOptions||{}}function le(){var n=M(),o=n.useRecaptchaNet?"recaptcha.net":"www.google.com";return n.enterprise?"https://"+o+"/recaptcha/enterprise.js?onload="+U+"&render=explicit":"https://"+o+"/recaptcha/api.js?onload="+U+"&render=explicit"}const me=fe(le,{callbackName:U,globalName:he,attributes:M().nonce?{nonce:M().nonce}:{}})(I);export{me as R};
//# sourceMappingURL=recaptcha-wrapper-BGzLb8D5.js.map
