"use strict";(self.webpackChunkprismatech_webapp=self.webpackChunkprismatech_webapp||[]).push([[5861],{35153:function(e,r,t){t.r(r),t.d(r,{default:function(){return k}});var a=t(15671),i=t(43144),n=t(60136),l=t(54062),s=t(72791),c=t(60364),o=t(78881),d=t(9571),u=t(91523),m=t(763),p=t.n(m),v=t(16585),h=t(80184),f=v.Z.basePath,g="privilege",N="/privilege/detail",_=function(e){return"/".concat(g,"/upsert").concat(e?"/"+e:"")},j="Buat Privilege Baru",x="Privilege",b="getAllPrivileges",w={_id:!0,role_id:{_id:!0,title:!0},title:!0,name:!0,description:!0,entity:!0,created_at:!0,updated_at:!0,created_by:{full_name:!0},updated_by:{full_name:!0}},y=function(e){return[{Header:" ",accessor:"_id",Cell:function(e){return(0,h.jsxs)("div",{className:"btn-group",children:[(0,h.jsx)("button",{type:"button",className:"btn btn-default dropdown-toggle dropdown-icon","data-toggle":"dropdown",children:(0,h.jsx)("span",{className:"sr-only",children:"Toggle Dropdown"})}),(0,h.jsx)("div",{className:"dropdown-menu",role:"menu",children:(0,h.jsx)(u.rU,{className:"dropdown-item",to:"".concat(f).concat(N,"/").concat(e.cell.value),children:"Detail"})})]})}},{Header:"Title",accessor:"title"},{Header:"Name",accessor:"name"},{Header:"Description",accessor:"description"},{Header:"Role",accessor:"role_id",Cell:function(e){var r=(p().map(e.cell.value||[],(function(e,r){return e.title}))||[]).join(", ");return(0,h.jsx)("span",{children:"".concat(r)})}}]},H=function(e){(0,n.Z)(t,e);var r=(0,l.Z)(t);function t(e){var i;return(0,a.Z)(this,t),(i=r.call(this,e)).state={columns:y(e.history)},i}return(0,i.Z)(t,[{key:"render",value:function(){var e={serviceName:b,fields:w},r=this.state.columns;return(0,h.jsx)(o.Z,{pageTitle:x,breadcrumb:[{title:"Beranda",link:v.Z.appHomePage},{title:x,link:null,isActive:!0}],contentHeaderTitle:x,isNeedLoggedin:!0,children:(0,h.jsx)("div",{className:"row",children:(0,h.jsxs)("div",{className:"col-md-12",children:[(0,h.jsx)(d.wn,{serviceName:e.serviceName,child:function(r){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return(0,h.jsx)("div",{className:"row",children:(0,h.jsx)("div",{className:"col-sm-6",children:(0,h.jsxs)("div",{className:"form-group",children:[(0,h.jsx)("label",{htmlFor:"string_to_search",children:"Cari"}),(0,h.jsx)("input",{type:"text",className:"form-control",value:t.string_to_search||"",id:"string_to_search",placeholder:"",onChange:function(t){return r({serviceName:e.serviceName,fieldName:"string_to_search",fieldValue:t.target.value})}})]})})})}}),(0,h.jsx)(d.iA,{listallServiceName:e.serviceName,fields:e.fields,columns:r,createHref:_(),createNewButtonLabel:j,cardTitle:x,apiVersion:2})]})})})}}]),t}(s.Component),k=(0,c.$j)((function(e,r){return{userPrivileges:e.myprofile.user_privileges}}))(H)}}]);
//# sourceMappingURL=5861.9df28aea.chunk.js.map