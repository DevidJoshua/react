"use strict";(self.webpackChunkprismatech_webapp=self.webpackChunkprismatech_webapp||[]).push([[7534],{87534:function(e,a,t){t.r(a),t.d(a,{default:function(){return N}});var i=t(72791),n=t(60364),r=t(79271),l=t(1851),o=t(763),d=t.n(o),s=t(11742),c=t(15671),u=t(43144),m=t(60136),g=t(54062),p=t(80184),b=function(e){(0,m.Z)(t,e);var a=(0,g.Z)(t);function t(){return(0,c.Z)(this,t),a.apply(this,arguments)}return(0,u.Z)(t,[{key:"render",value:function(){var e=this.props,a=e.child,t=e.tablepaginationOnChangeForm,i=e.dataDetail,n=e.payload,r=e.loading,l=e.userPrivileges;return(0,p.jsx)(p.Fragment,{children:a({tablepaginationOnChangeForm:t,dataDetail:i,payload:n,loading:r,userPrivileges:l})})}}]),t}(i.PureComponent),h=t(72606),f=t(38626),v=function(e){(0,m.Z)(t,e);var a=(0,g.Z)(t);function t(){return(0,c.Z)(this,t),a.apply(this,arguments)}return(0,u.Z)(t,[{key:"render",value:function(){var e=this.props,a=e.tablepaginationDeleteData,t=e.deleteServiceName,i=e.redirectAfterDelete,n=e.history,r=e.deletePayload,l=e.loading;return console.log("modalmodalmodalmodalmodal",this.props),(0,p.jsx)("div",{className:"modal fade",id:"modal-danger",children:(0,p.jsx)("div",{className:"modal-dialog",children:(0,p.jsxs)("div",{className:"modal-content bg-danger",children:[(0,p.jsxs)("div",{className:"modal-header",children:[(0,p.jsx)("h4",{className:"modal-title",children:(0,p.jsx)(h.Z,{id:"label-danger"})}),(0,p.jsx)("button",{type:"button",className:"close","data-dismiss":"modal","aria-label":"Close",children:(0,p.jsx)("span",{"aria-hidden":"true",children:"\xd7"})})]}),(0,p.jsx)("div",{className:"modal-body",children:(0,p.jsx)("p",{children:(0,p.jsx)(h.Z,{id:"label-delete-confirmation"})})}),(0,p.jsxs)("div",{className:"modal-footer justify-content-between",children:[l&&(0,p.jsx)(f.Z,{loading:!0,type:"rpmerah"}),!l&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("button",{id:"buttonCloseModal",type:"button",className:"btn btn-outline-light","data-dismiss":"modal",children:(0,p.jsx)(h.Z,{id:"label.cancel"})}),(0,p.jsx)("button",{type:"button",className:"btn btn-outline-light",onClick:function(){return a({deletePayload:r,serviceName:t,redirectAfterDelete:i,history:n})},children:(0,p.jsx)(h.Z,{id:"label.delete"})})]})]})]})})})}}]),t}(i.PureComponent),y=(0,n.$j)((function(e,a){return{deletePayload:e.tablepagination.deletePayload,loading:(e.tablepagination.loading||{})[a.deleteServiceName]}}),(function(e){return{tablepaginationDeleteData:function(a){return e(s.ZP.tablepaginationDeleteData(a))}}}))((0,l.ZP)(v));function D(e){var a=e.history,t=e.children,n=e.userPrivileges,r=e.errors,l=e.upsertServiceName,o=e.detailServiceName,s=e.deleteServiceName,c=e.dataDetail,u=e.child,m=e.fetchData,g=e.id,b=e.tablepaginationOnChangeForm,h=e.tablepaginationDeleteData,f=e.tablepaginationResetForm,v=e.payload,D=e.loading,N=e.updatePageUrl,j=e.createPageUrl,F=e.redirectAfterDelete,P=e.needToSave,S=e.activeForm,x=e.fileArray,Z=e.buttonAction,C=e.myUserId,A=e.myMerchantId;i.useEffect((function(){g&&m({id:g})}),[m,g]);var R=i.Children.map(t,(function(e){return i.isValidElement(e)?i.cloneElement(e,{tablepaginationOnChangeForm:b,tablepaginationResetForm:f,dataDetail:c,payload:v,loading:D,userPrivileges:n,childFunc:u,upsertServiceName:l,detailServiceName:o,id:g,needToSave:P,activeForm:S,fileArray:x,myUserId:C,myMerchantId:A}):e}));return(0,p.jsxs)(p.Fragment,{children:[!d().isEmpty(r)&&(0,p.jsx)("div",{class:"alert alert-danger",role:"alert",children:(0,p.jsx)("ul",{children:r.map((function(e,a){return(0,p.jsx)("li",{children:e.message},a)}))})}),R,Z&&Z({dataDetail:c,id:g,deleteServiceName:s}),!Z&&(0,p.jsxs)(p.Fragment,{children:[g&&s&&(0,p.jsx)("button",{style:{width:100},type:"button",className:"btn bg-gradient-danger","data-toggle":"modal","data-target":"#modal-danger",children:"Hapus"}),N&&(0,p.jsx)("button",{style:{width:100,marginLeft:5},onClick:function(){return a.push(N)},type:"button",className:"btn bg-gradient-primary",children:"Ubah"}),g&&j&&(0,p.jsx)("button",{style:{width:100,marginLeft:5},onClick:function(){return a.push(j)},type:"button",className:"btn bg-gradient-info",children:"Buat"})]}),(0,p.jsx)(y,{tablepaginationDeleteData:h,deleteServiceName:s,redirectAfterDelete:F,history:a,id:g}),(0,p.jsx)("br",{}),(0,p.jsx)("br",{})]})}var N=(0,n.$j)((function(e,a){var t=(e.tablepagination.errors||{})[a.detailServiceName],i=(e.tablepagination.loading||{})[a.detailServiceName],n=(e.tablepagination.dataDetail||{})[a.detailServiceName],r=(e.tablepagination.payload||{})[a.upsertServiceName];return{fileArray:(e.tablepagination.fileArray||{})[a.upsertServiceName]||{},isReloading:e.tablepagination.reloadDetail[a.detailServiceName],currentFileArray:e.tablepagination.currentFileArray,loading:i,errors:t,payload:r,needToSave:e.tablepagination.needToSave,activeForm:e.tablepagination.activeForm,dataDetail:n||{},userPrivileges:e.myprofile.user_privileges,myUserId:e.myprofile.user_id,myMerchantId:(e.myprofile.merchant||{}).id}}),(function(e){return{tablepaginationSetReloadDetail:function(a){return e(s.ZP.setReloadDetail(a))},tablepaginationSetloading:function(a){return e(s.ZP.tablepaginationSetloading(a))},tablepaginationOnChangeForm:function(a){return e(s.ZP.tablepaginationOnChangeForm(a))},tablepaginationSubmitForm:function(a){return e(s.ZP.tablepaginationSubmitForm(a))},tablepaginationFetchDataDetail:function(a){return e(s.ZP.tablepaginationFetchDataDetail(a))},tablepaginationResetForm:function(a){return e(s.ZP.tablepaginationResetForm(a))},tablepaginationDeleteData:function(a){return e(s.ZP.tablepaginationDeleteData(a))}}}))((0,l.ZP)((function(e){var a=(0,r.k6)(),t=e.childFunc,n=e.tablepaginationOnChangeForm,l=e.id,o=e.dataDetail,d=e.tablepaginationFetchDataDetail,s=e.tablepaginationResetForm,c=e.tablepaginationDeleteData,u=e.payload,m=e.errors,g=e.loading,h=e.userPrivileges,f=e.children,v=e.serviceName,y=e.isReloading,N=e.detailServiceName,j=e.upsertServiceName,F=e.fields,P=e.updatePageUrl,S=e.createPageUrl,x=e.redirectAfterDelete,Z=e.deleteServiceName,C=e.needToSave,A=e.activeForm,R=e.fileArray,U=e.apiVersion,k=e.buttonAction,I=e.myUserId,w=e.myMerchantId,O=e.preProcessPatchData,E=e.tablepaginationSetReloadDetail,M=i.useCallback((function(e){var a=e.id,t={serviceName:N,id:a,fields:F,apiVersion:U};O&&(t.preProcessPatchData=O),d(t)}),[d,N,F,y]);return(0,i.useEffect)((function(){return function(){}}),[s,j,y]),(0,i.useEffect)((function(){E({isReload:!1,serviceName:N})}),[]),(0,p.jsxs)(D,{activeForm:A,needToSave:C,history:a,upsertServiceName:j,detailServiceName:N,deleteServiceName:Z,userPrivileges:h,errors:m,serviceName:v,payload:u||{},tablepaginationResetForm:s,tablepaginationOnChangeForm:n,tablepaginationDeleteData:c,loading:g,dataDetail:o||{},childFunc:t,fetchData:M,id:l,updatePageUrl:P,createPageUrl:S,redirectAfterDelete:x,fileArray:R,apiVersion:U,buttonAction:k,myUserId:I,myMerchantId:w,children:[f&&f,!f&&t&&(0,p.jsx)(b,{})]})})))}}]);
//# sourceMappingURL=7534.8035dae3.chunk.js.map