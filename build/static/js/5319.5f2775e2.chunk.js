"use strict";(self.webpackChunkprismatech_webapp=self.webpackChunkprismatech_webapp||[]).push([[5319,7534],{45319:function(e,a,t){t.r(a);var i=t(1413),r=t(15671),n=t(43144),l=t(60136),o=t(54062),d=t(72791),s=t(1851),c=t(79271),u=t(87534),m=t(48262),p=t(80184),g=function(e){(0,l.Z)(t,e);var a=(0,o.Z)(t);function t(){return(0,r.Z)(this,t),a.apply(this,arguments)}return(0,n.Z)(t,[{key:"render",value:function(){console.log("DetailCompDetailCompDetailComp");var e=this.props,a=e.formTitle,t=e.children,i=e.childFunc,r=e.fields,n=e.upsertServiceName,l=e.detailServiceName,o=e.updatePageUrl,d=e.createPageUrl,s=e.redirectAfterDelete,c=(e.customFooterButtons,e.deleteServiceName),g=e.id,h=e.withoutWrapper,b=e.preProcessPatchData,v=e.apiVersion,f=e.buttonAction,y=e.collapsable;return console.log("upsertServiceNameupsertServiceNameupsertServiceNameupsertServiceName",n),(0,p.jsx)(m.As,{collapsable:y,formTitle:a,withoutWrapper:h,serviceName:l,children:(0,p.jsx)(u.default,{preProcessPatchData:b,updatePageUrl:o,createPageUrl:d,upsertServiceName:n,detailServiceName:l,deleteServiceName:c,fields:r,childFunc:i,id:g,redirectAfterDelete:s,apiVersion:v,buttonAction:f,children:t&&t})})}}]),t}(d.PureComponent);a.default=(0,s.ZP)((function(e){var a=(0,c.k6)();return(0,p.jsx)(g,(0,i.Z)({history:a},e))}))},87534:function(e,a,t){t.r(a),t.d(a,{default:function(){return N}});var i=t(72791),r=t(60364),n=t(79271),l=t(1851),o=t(763),d=t.n(o),s=t(11742),c=t(15671),u=t(43144),m=t(60136),p=t(54062),g=t(80184),h=function(e){(0,m.Z)(t,e);var a=(0,p.Z)(t);function t(){return(0,c.Z)(this,t),a.apply(this,arguments)}return(0,u.Z)(t,[{key:"render",value:function(){var e=this.props,a=e.child,t=e.tablepaginationOnChangeForm,i=e.dataDetail,r=e.payload,n=e.loading,l=e.userPrivileges;return(0,g.jsx)(g.Fragment,{children:a({tablepaginationOnChangeForm:t,dataDetail:i,payload:r,loading:n,userPrivileges:l})})}}]),t}(i.PureComponent),b=t(72606),v=t(38626),f=function(e){(0,m.Z)(t,e);var a=(0,p.Z)(t);function t(){return(0,c.Z)(this,t),a.apply(this,arguments)}return(0,u.Z)(t,[{key:"render",value:function(){var e=this.props,a=e.tablepaginationDeleteData,t=e.deleteServiceName,i=e.redirectAfterDelete,r=e.history,n=e.deletePayload,l=e.loading;return console.log("modalmodalmodalmodalmodal",this.props),(0,g.jsx)("div",{className:"modal fade",id:"modal-danger",children:(0,g.jsx)("div",{className:"modal-dialog",children:(0,g.jsxs)("div",{className:"modal-content bg-danger",children:[(0,g.jsxs)("div",{className:"modal-header",children:[(0,g.jsx)("h4",{className:"modal-title",children:(0,g.jsx)(b.Z,{id:"label-danger"})}),(0,g.jsx)("button",{type:"button",className:"close","data-dismiss":"modal","aria-label":"Close",children:(0,g.jsx)("span",{"aria-hidden":"true",children:"\xd7"})})]}),(0,g.jsx)("div",{className:"modal-body",children:(0,g.jsx)("p",{children:(0,g.jsx)(b.Z,{id:"label-delete-confirmation"})})}),(0,g.jsxs)("div",{className:"modal-footer justify-content-between",children:[l&&(0,g.jsx)(v.Z,{loading:!0,type:"rpmerah"}),!l&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("button",{id:"buttonCloseModal",type:"button",className:"btn btn-outline-light","data-dismiss":"modal",children:(0,g.jsx)(b.Z,{id:"label.cancel"})}),(0,g.jsx)("button",{type:"button",className:"btn btn-outline-light",onClick:function(){return a({deletePayload:n,serviceName:t,redirectAfterDelete:i,history:r})},children:(0,g.jsx)(b.Z,{id:"label.delete"})})]})]})]})})})}}]),t}(i.PureComponent),y=(0,r.$j)((function(e,a){return{deletePayload:e.tablepagination.deletePayload,loading:(e.tablepagination.loading||{})[a.deleteServiceName]}}),(function(e){return{tablepaginationDeleteData:function(a){return e(s.ZP.tablepaginationDeleteData(a))}}}))((0,l.ZP)(f));function D(e){var a=e.history,t=e.children,r=e.userPrivileges,n=e.errors,l=e.upsertServiceName,o=e.detailServiceName,s=e.deleteServiceName,c=e.dataDetail,u=e.child,m=e.fetchData,p=e.id,h=e.tablepaginationOnChangeForm,b=e.tablepaginationDeleteData,v=e.tablepaginationResetForm,f=e.payload,D=e.loading,N=e.updatePageUrl,P=e.createPageUrl,S=e.redirectAfterDelete,j=e.needToSave,F=e.activeForm,x=e.fileArray,Z=e.buttonAction,C=e.myUserId,A=e.myMerchantId;i.useEffect((function(){p&&m({id:p})}),[m,p]);var U=i.Children.map(t,(function(e){return i.isValidElement(e)?i.cloneElement(e,{tablepaginationOnChangeForm:h,tablepaginationResetForm:v,dataDetail:c,payload:f,loading:D,userPrivileges:r,childFunc:u,upsertServiceName:l,detailServiceName:o,id:p,needToSave:j,activeForm:F,fileArray:x,myUserId:C,myMerchantId:A}):e}));return(0,g.jsxs)(g.Fragment,{children:[!d().isEmpty(n)&&(0,g.jsx)("div",{class:"alert alert-danger",role:"alert",children:(0,g.jsx)("ul",{children:n.map((function(e,a){return(0,g.jsx)("li",{children:e.message},a)}))})}),U,Z&&Z({dataDetail:c,id:p,deleteServiceName:s}),!Z&&(0,g.jsxs)(g.Fragment,{children:[p&&s&&(0,g.jsx)("button",{style:{width:100},type:"button",className:"btn bg-gradient-danger","data-toggle":"modal","data-target":"#modal-danger",children:"Hapus"}),N&&(0,g.jsx)("button",{style:{width:100,marginLeft:5},onClick:function(){return a.push(N)},type:"button",className:"btn bg-gradient-primary",children:"Ubah"}),p&&P&&(0,g.jsx)("button",{style:{width:100,marginLeft:5},onClick:function(){return a.push(P)},type:"button",className:"btn bg-gradient-info",children:"Buat"})]}),(0,g.jsx)(y,{tablepaginationDeleteData:b,deleteServiceName:s,redirectAfterDelete:S,history:a,id:p}),(0,g.jsx)("br",{}),(0,g.jsx)("br",{})]})}var N=(0,r.$j)((function(e,a){var t=(e.tablepagination.errors||{})[a.detailServiceName],i=(e.tablepagination.loading||{})[a.detailServiceName],r=(e.tablepagination.dataDetail||{})[a.detailServiceName],n=(e.tablepagination.payload||{})[a.upsertServiceName];return{fileArray:(e.tablepagination.fileArray||{})[a.upsertServiceName]||{},isReloading:e.tablepagination.reloadDetail[a.detailServiceName],currentFileArray:e.tablepagination.currentFileArray,loading:i,errors:t,payload:n,needToSave:e.tablepagination.needToSave,activeForm:e.tablepagination.activeForm,dataDetail:r||{},userPrivileges:e.myprofile.user_privileges,myUserId:e.myprofile.user_id,myMerchantId:(e.myprofile.merchant||{}).id}}),(function(e){return{tablepaginationSetReloadDetail:function(a){return e(s.ZP.setReloadDetail(a))},tablepaginationSetloading:function(a){return e(s.ZP.tablepaginationSetloading(a))},tablepaginationOnChangeForm:function(a){return e(s.ZP.tablepaginationOnChangeForm(a))},tablepaginationSubmitForm:function(a){return e(s.ZP.tablepaginationSubmitForm(a))},tablepaginationFetchDataDetail:function(a){return e(s.ZP.tablepaginationFetchDataDetail(a))},tablepaginationResetForm:function(a){return e(s.ZP.tablepaginationResetForm(a))},tablepaginationDeleteData:function(a){return e(s.ZP.tablepaginationDeleteData(a))}}}))((0,l.ZP)((function(e){var a=(0,n.k6)(),t=e.childFunc,r=e.tablepaginationOnChangeForm,l=e.id,o=e.dataDetail,d=e.tablepaginationFetchDataDetail,s=e.tablepaginationResetForm,c=e.tablepaginationDeleteData,u=e.payload,m=e.errors,p=e.loading,b=e.userPrivileges,v=e.children,f=e.serviceName,y=e.isReloading,N=e.detailServiceName,P=e.upsertServiceName,S=e.fields,j=e.updatePageUrl,F=e.createPageUrl,x=e.redirectAfterDelete,Z=e.deleteServiceName,C=e.needToSave,A=e.activeForm,U=e.fileArray,k=e.apiVersion,R=e.buttonAction,w=e.myUserId,I=e.myMerchantId,O=e.preProcessPatchData,T=e.tablepaginationSetReloadDetail,E=i.useCallback((function(e){var a=e.id,t={serviceName:N,id:a,fields:S,apiVersion:k};O&&(t.preProcessPatchData=O),d(t)}),[d,N,S,y]);return(0,i.useEffect)((function(){return function(){}}),[s,P,y]),(0,i.useEffect)((function(){T({isReload:!1,serviceName:N})}),[]),(0,g.jsxs)(D,{activeForm:A,needToSave:C,history:a,upsertServiceName:P,detailServiceName:N,deleteServiceName:Z,userPrivileges:b,errors:m,serviceName:f,payload:u||{},tablepaginationResetForm:s,tablepaginationOnChangeForm:r,tablepaginationDeleteData:c,loading:p,dataDetail:o||{},childFunc:t,fetchData:E,id:l,updatePageUrl:j,createPageUrl:F,redirectAfterDelete:x,fileArray:U,apiVersion:k,buttonAction:R,myUserId:w,myMerchantId:I,children:[v&&v,!v&&t&&(0,g.jsx)(h,{})]})})))}}]);
//# sourceMappingURL=5319.5f2775e2.chunk.js.map