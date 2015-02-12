function Navigation(e){this.splitApp=null;this.app=null;this.sViewType=e}Navigation.prototype.loadNewView=function(e){var t=Util.replaceAllInString(e,".","_");var n=sap.ui.view({id:t,viewName:e,type:this.sViewType});return n};Navigation.prototype.navigate=function(e,t,n,r){var i=$("#"+e);r=r.toUpperCase();if(r==="VERTICAL"){$(".citNavigateContainer").slideUp();i.slideDown()}else if(r==="LEFT"){}else if(r==="RIGHT"){}if(t!==undefined&&t.onBeforeShow){t.onBeforeShow(n)}};Navigation.prototype.toMasterPage=function(e,t,n){var r=Util.replaceAllInString(e,".","_");var i=sap.ui.getCore().byId(r);if(i===undefined){i=this.loadNewView(e);this.splitApp.addMasterPage(i)}n=this.transitionLookup(n);if(this.splitApp.getCurrentMasterPage().getId()==r&&this.splitApp.getCurrentMasterPage().getController.onBeforeShow!=undefined){var s={};s.data=t;this.splitApp.getCurrentMasterPage().getController().onBeforeShow(s)}else{this.splitApp.toMaster(r,n,t,null)}};Navigation.prototype.toDetailPage=function(e,t,n){var r=Util.replaceAllInString(e,".","_");var i=sap.ui.getCore().byId(r);if(i===undefined){i=this.loadNewView(e);this.getSplitApp().addDetailPage(i)}n=this.transitionLookup(n);if(this.getSplitApp().getCurrentDetailPage().getId()==r&&this.splitApp.getCurrentDetailPage().getController.onBeforeShow!=undefined){var s={};s.data=t;this.splitApp.getCurrentDetailPage().getController().onBeforeShow(s)}else{this.splitApp.toDetail(r,n,t,null)}};Navigation.prototype.backMasterPage=function(e,t){if(t!==undefined){var n=Util.replaceAllInString(t,".","_");this.splitApp.backToPage(n,e)}else{this.splitApp.backMaster(e)}};Navigation.prototype.backDetailPage=function(e,t){if(t!==undefined){var n=Util.replaceAllInString(t,".","_");this.splitApp.backToPage(n,e)}else{this.splitApp.backDetail(e)}};Navigation.prototype.toPage=function(e,t,n){var r=Util.replaceAllInString(sPage,".","_");var i=sap.ui.getCore().byId(r);if(i===undefined){i=this.loadNewView(sPage);this.app.addPage(i)}n=this.transitionLookup(n);if(this.app.getCurrentPage().getId()==r&&this.app.getCurrentPage().onBeforeShow!=undefined){var s={};s.data=t;this.app.getCurrentPage().getController().onBeforeShow(s)}else{this.app.to(r,n,t,null)}};Navigation.prototype.backPage=function(e,t){if(t!==undefined){var n=Util.replaceAllInString(t,".","_");this.app.backToPage(n,e)}else{this.app.back(e)}};Navigation.prototype.transitionLookup=function(e){if(e!=undefined){e=e.toLowerCase();if(e!=="fade"&&e!=="flip"&&e!=="show"){e="slide"}}else{e="slide"}return e};Navigation.prototype.getApp=function(){return this.app};Navigation.prototype.setApp=function(e){this.app=e};Navigation.prototype.getSplitApp=function(){return this.splitApp};Navigation.prototype.setSplitApp=function(e){this.splitApp=e}