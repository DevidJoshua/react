"use strict";(self.webpackChunkprismatech_webapp=self.webpackChunkprismatech_webapp||[]).push([[4085],{35326:function(e,a,t){t.d(a,{AJ:function(){return c},O_:function(){return v},PI:function(){return y},PS:function(){return s},Pu:function(){return x},XU:function(){return b},Yo:function(){return h},_W:function(){return m},dV:function(){return f},ny:function(){return g},oj:function(){return p},uX:function(){return u},wo:function(){return k}});t(72791);var l=t(91523),n=t(16585),r=t(80184),i=n.Z.basePath,d="pgateway",o="/pgateway/detail",c="/"+d,s=function(e){return"/".concat(d,"/upsert").concat(e?"/"+e:"")},u=function(){return"/".concat(d)},f="Buat Pgateway Baru",p="Pgateway",m="Detail Pgateway",g="Form Pgateway",h="getDetailPgateway",y="upsertPgateway",v="getAllPgateways",k="deletePgateway",b="_id,backendCallbackUrl,frontendCallbackUrl,description,title,pgcode,keyid,mid,secretkey,configs,created_at,updated_at,created_by{full_name},updated_by{full_name}",x=function(e){return[{Header:" ",accessor:"_id",Cell:function(e){return(0,r.jsxs)("div",{className:"btn-group",children:[(0,r.jsx)("button",{type:"button",className:"btn btn-default dropdown-toggle dropdown-icon","data-toggle":"dropdown",children:(0,r.jsx)("span",{className:"sr-only",children:"Toggle Dropdown"})}),(0,r.jsx)("div",{className:"dropdown-menu",role:"menu",children:(0,r.jsx)(l.rU,{className:"dropdown-item",to:"".concat(i).concat(o,"/").concat(e.cell.value),children:"Detail"})})]})}},{Header:"Title",accessor:"title"},{Header:"pgcode",accessor:"pgcode"},{Header:"keyid",accessor:"keyid"},{Header:"mid",accessor:"mid"},{Header:"secretkey",accessor:"secretkey"},{Header:"configs",accessor:"configs"}]};a.ZP={redirectAfterCreate:o,redirectAfterDelete:c,detailPageUrl:function(e){return"/".concat(d,"/detail/").concat(e)},upsertPageUrl:s,createNewButtonLabel:f,createPageTitle:"Buat Pgateway",listallPageTitle:p,detailPageTitle:m,detailService:h,listallService:v,deleteService:k,upsertService:y,fields:b,getColumns:x,listallPageUrl:u}},64085:function(e,a,t){t.r(a);var l=t(72791),n=t(9571),r=t(76514),i=t(78881),d=t(1851),o=t(16585),c=t(35326),s=t(80184),u=function(e){var a=e.tablepaginationOnChangeForm,t=e.dataDetail,i=e.payload,d=e.upsertServiceName,o=e.id,c=e.tablepaginationResetForm,u=e.formTitle;return l.useEffect((function(){var e={};o&&(e._id=o),c({isInitialReset:!0,serviceName:d,defaultFormValue:e})}),[c,d,o]),console.log("payloadpayloadpayload===>",i.title),console.log("payloadpayloadpayload===>",t.title),(0,s.jsx)("div",{className:"row",children:(0,s.jsx)("div",{className:"col-sm-6",children:(0,s.jsxs)(n.As,{formTitle:u,children:[(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{htmlFor:"title",children:"Judul PGateway"}),(0,s.jsx)("input",{type:"text",className:"form-control",id:"title",placeholder:"Masukkan judul",value:"undefined"!==typeof i.title?i.title:t.title||"",onChange:function(e){return a({serviceName:d,fieldName:"title",fieldValue:e.target.value})}})]}),(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{htmlFor:"pgcode",children:"pgcode"}),(0,s.jsx)("input",{type:"text",className:"form-control",id:"pgcode",placeholder:"",value:"undefined"!==typeof i.pgcode?i.pgcode:t.pgcode||"",onChange:function(e){return a({serviceName:d,fieldName:"pgcode",fieldValue:e.target.value})}})]}),(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{htmlFor:"keyid",children:"keyid"}),(0,s.jsx)("input",{type:"text",className:"form-control",id:"keyid",placeholder:"",value:"undefined"!==typeof i.keyid?i.keyid:t.keyid||"",onChange:function(e){return a({serviceName:d,fieldName:"keyid",fieldValue:e.target.value})}})]}),(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{htmlFor:"mid",children:"mid"}),(0,s.jsx)("input",{type:"text",className:"form-control",id:"mid",placeholder:"",value:"undefined"!==typeof i.mid?i.mid:t.mid||"",onChange:function(e){return a({serviceName:d,fieldName:"mid",fieldValue:e.target.value})}})]}),(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{htmlFor:"secretkey",children:"secretkey"}),(0,s.jsx)("input",{type:"text",className:"form-control",id:"secretkey",placeholder:"",value:"undefined"!==typeof i.secretkey?i.secretkey:t.secretkey||"",onChange:function(e){return a({serviceName:d,fieldName:"secretkey",fieldValue:e.target.value})}})]}),(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{htmlFor:"backendCallbackUrl",children:"backendCallbackUrl"}),(0,s.jsx)("input",{type:"text",className:"form-control",id:"backendCallbackUrl",placeholder:"",value:"undefined"!==typeof i.backendCallbackUrl?i.backendCallbackUrl:t.backendCallbackUrl||"",onChange:function(e){return a({serviceName:d,fieldName:"backendCallbackUrl",fieldValue:e.target.value})}})]}),(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{htmlFor:"frontendCallbackUrl",children:"frontendCallbackUrl"}),(0,s.jsx)("input",{type:"text",className:"form-control",id:"frontendCallbackUrl",placeholder:"",value:"undefined"!==typeof i.frontendCallbackUrl?i.frontendCallbackUrl:t.frontendCallbackUrl||"",onChange:function(e){return a({serviceName:d,fieldName:"frontendCallbackUrl",fieldValue:e.target.value})}})]}),(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{htmlFor:"configs",children:"configs"}),(0,s.jsx)(r.B,{placeholder:"Konfigurasi dalam bentuk json string",forProcess:"undefined"!==typeof o?"update":"create",dataId:o,defaultValue:"undefined"!==typeof i.configs?i.configs:t.configs,onChange:function(e){return a({serviceName:d,fieldName:"configs",fieldValue:e})},idElement:"configs"})]}),(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{htmlFor:"description",children:"description"}),(0,s.jsx)(r.B,{forProcess:"undefined"!==typeof o?"update":"create",dataId:o,defaultValue:"undefined"!==typeof i.description?i.description:t.description,onChange:function(e){return a({serviceName:d,fieldName:"description",fieldValue:e})},idElement:"description"})]})]})})})};a.default=(0,d.ZP)((function(e){console.log("raysaaaaaaaa");var a=e.match;return(0,s.jsx)(i.Z,{pageTitle:c.ny,breadcrumb:[{title:"Beranda",link:o.Z.appHomePage},{title:c.oj,link:(0,c.uX)()},{title:c.ny,link:null,isActive:!0}],contentHeaderTitle:c.ny,isNeedLoggedin:!0,children:(0,s.jsx)("div",{className:"row",children:(0,s.jsx)("div",{className:"col-md-12",children:(0,s.jsx)(n.F,{detailServiceName:c.Yo,upsertServiceName:c.PI,fields:c.XU,id:a.params._id,formTitle:c.ny,redirectAfterDelete:c.AJ,withoutWrapper:!0,children:(0,s.jsx)(u,{formTitle:c.ny})})})})})}))},76514:function(e,a,t){t.d(a,{B:function(){return d}});var l=t(72791),n=t(16585),r=t(85545),i=t(80184);var d=function(e){var a=e.placeholder,t=e.textEditor,d=e.defaultValue,o=e.initValue,c=e.onChange,s=e.idElement,u=e.dataId;return(0,l.useEffect)((function(){if(console.log("valuevaluevalue initValue=>",o),console.log("valuevaluevalue id=>",u),t){"undefined"!==typeof u&&"undefined"!==typeof d&&(console.log("valuevaluevalue reloadddd=>",d),window.activateEditorV2({idElement:s,hostBackend:n.Z.hostBackend,at:(0,r.hP)(),cb:function(e){c(e)},isReset:false,defaultValue:d})),"undefined"===typeof u&&window.activateEditorV2({idElement:s,hostBackend:n.Z.hostBackend,at:(0,r.hP)(),cb:function(e){c(e)},isReset:false,defaultValue:d})}}),[d,u,s,c,t,o]),"undefined"===typeof u||u?(0,i.jsx)("div",{className:"row",children:(0,i.jsx)("div",{className:"col-12",children:(0,i.jsxs)("div",{style:{position:"relative"},children:[t&&(0,i.jsx)("div",{style:{backgroundColor:"black",position:"absolute",width:"100%",height:"100%",top:0},children:(0,i.jsx)("center",{children:(0,i.jsx)("span",{style:{color:"green",fontSize:30,marginTop:200},children:"Gambar sedang diupload..."})})}),(0,i.jsx)("div",{id:"texareaWrapper",style:{width:"100%",height:"100%",backgroundColor:"black",opacity:1},children:(0,i.jsx)("textarea",{className:"textarea",id:s,placeholder:a||"Isi keterangan",value:d,style:{width:"100%"},onChange:function(e){return c(e.target.value)}})})]})})}):null}}}]);
//# sourceMappingURL=4085.e072c782.chunk.js.map