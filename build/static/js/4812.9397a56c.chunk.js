"use strict";(self.webpackChunkprismatech_webapp=self.webpackChunkprismatech_webapp||[]).push([[4812],{55699:function(e,t,a){a.d(t,{AJ:function(){return c},O_:function(){return f},Pu:function(){return h},XU:function(){return b},Yo:function(){return m},_W:function(){return p},dV:function(){return u},oj:function(){return l},wo:function(){return _},yG:function(){return s}});a(72791);var n=a(91523),r=a(80184),i="TokoProductVariation",o="tokoproductvariation",d="TokoProductVariation",c="/"+o,s=function(e){return"/".concat(o,"/update/").concat(e)},u="Create New "+i,l="Data Inventaris",p="Data Detail Inventaris",m="getDetail"+d,f="getAllTokoProductVariations",_="delete"+d,b="_id,sku,product_id{_id,name,product_availability,preorder_policy,code,image_id{filename,file_type}},inventories{_id,quantity,created_at,updated_at,created_by{full_name},updated_by{full_name}},created_at,updated_at,created_by{full_name},updated_by{full_name}",h=function(e){e.history;var t=e.stateParams,a=e.formUpdateStock,i=e.submitUpdateStock,o=e.productUpdatePageUrl;return[{Header:" ",accessor:function(e){return(0,r.jsxs)("div",{className:"btn-group",children:[(0,r.jsx)("button",{type:"button",className:"btn btn-default dropdown-toggle dropdown-icon","data-toggle":"dropdown",children:(0,r.jsx)("span",{className:"sr-only",children:"Toggle Dropdown"})}),(0,r.jsx)("div",{className:"dropdown-menu",role:"menu",children:(0,r.jsx)(n.rU,{className:"dropdown-item",to:"".concat(o(e.product_id._id)),children:"Ubah Produk"})})]})}},{Header:"Kode Produk",accessor:"product_id.code"},{Header:"Nama Produk",accessor:"product_id.name"},{Header:"Status produk jika stok habis",accessor:function(e){var t=(e.product_id||{}).preorder_policy;return"unavailable"===t?"Habis":t}},{Header:"Ubah Stok",accessor:function(e){return a({dataDetail:e,stateParams:t,submitUpdateStock:i})}}]}},64812:function(e,t,a){a.r(t);a(72791);var n=a(60364),r=a(1851),i=a(763),o=a.n(i),d=a(40374),c=a(9571),s=a(48298),u=a(78881),l=a(55699),p=a(72426),m=a.n(p),f=a(16585),_=a(80184);function b(e,t,a,n){var r=(0,s.Z)([t.serviceName,n[0]],a),i="";return i=!o().isEmpty(r)&&Array.isArray(r)?r.map((function(e){return e?e[n[1]]:"-"})).join(", "):o().isEmpty(r)||"object"!==typeof r?r:r[n[1]],(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)("dt",{children:e}),(0,_.jsx)("dd",{children:i||"-"})]})}t.default=(0,n.$j)((function(e,t){return{dataDetail:e.tablepagination.dataDetail}}),(function(e){return{appPatch:function(t){return e(d.ZP.appPatch(t))}}}))((0,r.ZP)((function(e){var t=e.match,a=e.history,n=e.dataDetail,r={serviceName:l.Yo,serviceDeleteName:l.wo,fields:l.XU},i=(n[l.Yo]||{}).session_id;return console.log("sessionId====>",i),console.log("dataDetail======>",n[l.Yo]),(0,_.jsx)(u.Z,{pageTitle:l._W,breadcrumb:[{title:"Beranda",link:f.Z.appHomePage},{title:l._W,link:null,isActive:!0}],contentHeaderTitle:l._W,isNeedLoggedin:!0,children:(0,_.jsx)("div",{className:"row",children:(0,_.jsx)("div",{className:"col-md-12",children:(0,_.jsx)(c.F,{id:t.params._id,updateHref:(0,l.yG)(t.params._id),formTitle:l._W,paginationConfig:r,child:function(e){var t=m()((0,s.Z)([r.serviceName,"created_at"],e));t=t&&t.isValid()?t.format("YYYY-MM-DD HH:mm:ss"):"";var a=m()((0,s.Z)([r.serviceName,"updated_at"],e));return a=a&&a.isValid()?a.format("YYYY-MM-DD HH:mm:ss"):"",(0,_.jsx)("dl",{children:b("Nama Produk",r,e,["product_id","name"])})},footerCard:function(e){return(0,_.jsx)(_.Fragment,{children:(0,_.jsx)("button",{style:{width:100,marginLeft:5},onClick:function(e){return a.goBack()},type:"button",className:"btn bg-gradient-warning",children:"Back"})})},modalFooter:function(e,n){return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)("button",{id:"buttonCloseModal",type:"button",className:"btn btn-outline-light","data-dismiss":"modal",children:"Cancel"}),(0,_.jsx)("button",{type:"button",className:"btn btn-outline-light",onClick:function(){return n({id:t.params._id,serviceName:r.serviceDeleteName,redirectAfterDelete:l.AJ,history:a})},children:"Delete"})]})}})})})})})))}}]);
//# sourceMappingURL=4812.9397a56c.chunk.js.map