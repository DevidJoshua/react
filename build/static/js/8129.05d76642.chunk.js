"use strict";(self.webpackChunkprismatech_webapp=self.webpackChunkprismatech_webapp||[]).push([[8129],{78129:function(e,a,i){i.r(a);var t=i(4942),l=i(72791),n=i(9571),r=i(78881),d=i(70712),s=i(16585),o=i(48550),c=(i(72426),i(41429),i(763)),m=i.n(c),u=i(85545),p=i(10703),f=i(80184),h=function(e){var a,i=e.tablepaginationOnChangeForm,n=e.dataDetail,r=e.payload,s=e.upsertServiceName,c=e.id,p=e.tablepaginationResetForm,h=(n.idCode,n.additionalData1,n.amount),v=(n.totalAmount,n.otherBills),g=n.description,x=n.expiredDateTime;l.useEffect((function(){var e={};c&&(e.id=c),p({redirectAfterUpsert:d.dO,isInitialReset:!0,apiVersion:3,serviceName:s,defaultFormValue:e})}),[p,s,c]),null!=v&&(v=v.length>0&&void 0!==v[0].billAmount?v[0].billAmount:0);r.amount,r.biayaAdm;return(0,f.jsx)("div",{className:"row",children:(0,f.jsxs)("div",{className:"col-sm-12",children:[(0,f.jsx)("div",{className:"form-group",children:(0,f.jsx)("div",{className:"input-group",children:!m().isUndefined(x)&&(0,f.jsx)(o.Z,(a={clearable:!0,ampm:!1,id:"datetime-local",label:"Atur Tanggal Kadaluarsa",type:"datetime-local"},(0,t.Z)(a,"ampm",!1),(0,t.Z)(a,"format","DD-MM-YYYY"),(0,t.Z)(a,"onChange",(function(e){i({serviceName:s,fieldName:"zone",fieldValue:Intl.DateTimeFormat().resolvedOptions().timeZone}),i({serviceName:s,fieldName:"expiredDateTime",fieldValue:new Date(e.target.value).getTime()})})),(0,t.Z)(a,"type","datetime-local"),(0,t.Z)(a,"defaultValue",(0,u.Qc)(x)),(0,t.Z)(a,"sx",{width:250}),(0,t.Z)(a,"InputLabelProps",{shrink:!0}),a))})}),(0,f.jsxs)("div",{className:"form-group",children:[(0,f.jsx)("label",{htmlFor:"title",children:"Keterangan"}),(0,f.jsx)("textarea",{type:"text",defaultValue:r.description||g,className:"form-control",id:"title",placeholder:" ",onChange:function(e){return i({serviceName:s,fieldName:"description",fieldValue:e.target.value})}})]})]})})};a.default=function(e){var a=e.match;return console.log("page update payyment link"),(0,f.jsx)(r.Z,{pageTitle:d.OR,breadcrumb:[{title:"Beranda",link:s.Z.appHomePage},{title:d.oj,link:(0,d.uX)()},{title:d.ny,link:null,isActive:!0}],contentHeaderTitle:d.OR,isNeedLoggedin:!0,children:(0,f.jsx)(p.Z,{variant:"outlined",children:(0,f.jsx)("div",{style:{padding:10},children:(0,f.jsx)(n.F,{withoutWrapper:!0,detailServiceName:d.Yo,upsertServiceName:d.PI,fields:d.XU,apiVersion:3,id:a.params._id,formTitle:d.ny,redirectAfterDelete:d.AJ,children:(0,f.jsx)(h,{})})})})})}}}]);
//# sourceMappingURL=8129.05d76642.chunk.js.map