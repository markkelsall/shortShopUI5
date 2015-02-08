/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/EventProvider','sap/ui/base/ManagedObject','./HashChanger','./Route','sap/ui/thirdparty/crossroads','sap/ui/thirdparty/signals'],function(q,E,M,H,R){"use strict";var r={};var a=E.extend("sap.ui.core.routing.Router",{constructor:function(o,c,O){E.apply(this);this._oConfig=c;this._oRouter=crossroads.create();this._oRouter.ignoreState=true;this._oRoutes={};this._oViews={};this._oOwner=O;var t=this;if(!o){o={}}if(q.isArray(o)){var b=o;o={};q.each(b,function(i,d){o[d.name]=d})}q.each(o,function(s,d){if(d.name==undefined){d.name=s}t.addRoute(d)})},metadata:{publicMethods:["initialize","getURL","register","getRoute"]}});a.M_EVENTS={RouteMatched:"routeMatched",RoutePatternMatched:"routePatternMatched",ViewCreated:"viewCreated"};a.prototype.addRoute=function(c,p){if(!c.name){q.sap.log.error("A name has to be specified for every route")}if(this._oRoutes[c.name]){q.sap.log.error("Route with name "+c.name+" already exists")}this._oRoutes[c.name]=new R(this,c,p)};a.prototype.parse=function(n,o){this._oRouter.parse(n)};a.prototype.initialize=function(){var t=this,h=this.oHashChanger=H.getInstance();if(this._bIsInitialized){q.sap.log.warning("Router is already initialized.");return this}this._bIsInitialized=true;this.fnHashChanged=function(e){t.parse(e.getParameter("newHash"),e.getParameter("oldHash"))};h.attachEvent("hashChanged",this.fnHashChanged);if(!h.init()){this.parse(h.getHash())}return this};a.prototype.stop=function(){if(!this._bIsInitialized){q.sap.log.warning("Router is not initialized. But it got stopped")}if(this.fnHashChanged){this.oHashChanger.detachEvent("hashChanged",this.fnHashChanged)}this._bIsInitialized=false;return this};a.prototype.destroy=function(){E.prototype.destroy.apply(this);if(!this._bIsInitialized){q.sap.log.info("Router is not initialized, but got destroyed.")}if(this.fnHashChanged){this.oHashChanger.detachEvent("hashChanged",this.fnHashChanged)}this._oOwner=null;this._oRouter.removeAllRoutes();this._oRouter=null;return this};a.prototype.getURL=function(n,p){if(p===undefined){p={}}var o=this.getRoute(n);if(!o){q.sap.log.warning("Route with name "+n+" does not exist");return}return o.getURL(p)};a.prototype.getRoute=function(n){return this._oRoutes[n]};a.prototype.getView=function(v,V,s){if(!v){q.sap.log.error("A name for the view has to be defined")}if(!this._oViews[v]){var c=function(){var o={type:V,viewName:v};if(s){o.id=s}return sap.ui.view(o)};if(this._oOwner){this._oViews[v]=this._oOwner.runAsOwner(c)}else{this._oViews[v]=c()}this.fireViewCreated({view:this._oViews[v],viewName:v,type:V})}return this._oViews[v]};a.prototype.setView=function(v,V){if(!v){q.sap.log.error("A name for the view has to be defined")}this._oViews[v]=V};a.prototype.navTo=function(n,p,b){if(b){this.oHashChanger.replaceHash(this.getURL(n,p))}else{this.oHashChanger.setHash(this.getURL(n,p))}};a.prototype.attachRouteMatched=function(d,f,l){this.attachEvent("routeMatched",d,f,l);return this};a.prototype.detachRouteMatched=function(f,l){this.detachEvent("routeMatched",f,l);return this};a.prototype.fireRouteMatched=function(A){this.fireEvent("routeMatched",A);return this};a.prototype.attachViewCreated=function(d,f,l){this.attachEvent("viewCreated",d,f,l);return this};a.prototype.detachViewCreated=function(f,l){this.detachEvent("viewCreated",f,l);return this};a.prototype.fireViewCreated=function(A){this.fireEvent("viewCreated",A);return this};a.prototype.attachRoutePatternMatched=function(d,f,l){this.attachEvent("routePatternMatched",d,f,l);return this};a.prototype.detachRoutePatternMatched=function(f,l){this.detachEvent("routePatternMatched",f,l);return this};a.prototype.fireRoutePatternMatched=function(A){this.fireEvent("routePatternMatched",A);return this};a.prototype.register=function(n){r[n]=this;return this};a.getRouter=function(n){return r[n]};return a},true);
