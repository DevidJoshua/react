"use strict";(self.webpackChunkprismatech_webapp=self.webpackChunkprismatech_webapp||[]).push([[1296],{58087:function(e,a,n){n.d(a,{AJ:function(){return s},O_:function(){return y},PI:function(){return b},PS:function(){return u},Pu:function(){return x},XU:function(){return k},Yo:function(){return g},_W:function(){return _},dV:function(){return p},ny:function(){return f},oj:function(){return h},uX:function(){return m},wo:function(){return v}});n(72791);var t=n(91523),r=(n(763),n(16585)),i=n(85545),o=n(80184),l=r.Z.basePath,c="merchant",d="/merchant/detail",s="/"+c,u=function(e){return"/".concat(c,"/upsert").concat(e?"/"+e:"")},m=function(){return"/".concat(c)},p="Buat Merchant Baru",h="Merchant",_="Detail Merchant",f="Form Merchant",g="getDetailMerchant",b="upsertMerchant",y="getAllMerchants",v="deleteMerchant",k="_id,merchant_name,merchant_code,merchant_debitin_id,merchant_plink_id,merchant_email,merchant_phone_number,frontend_callback_url,backend_callback_url,active_date,is_active,client_token,is_parent,address,merchant_type,merchant_picture,contact_name,contact_phone_number,payment_method_config,created_at,updated_at,created_by{full_name},updated_by{full_name},merchant_key{key_encrypt,key_id},merchant_paymentmethod{payment_method_code,configs}",x=function(e){return[{Header:" ",accessor:"_id",Cell:function(e){return(0,o.jsxs)("div",{className:"btn-group",children:[(0,o.jsx)("button",{type:"button",className:"btn btn-default dropdown-toggle dropdown-icon","data-toggle":"dropdown",children:(0,o.jsx)("span",{className:"sr-only",children:"Toggle Dropdown"})}),(0,o.jsx)("div",{className:"dropdown-menu",role:"menu",children:(0,o.jsx)(t.rU,{className:"dropdown-item",to:"".concat(l).concat(d,"/").concat(e.cell.value),children:"Detail"})})]})}},{Header:"Merchant Name",accessor:function(e){return(0,i.Mp)(e.merchant_name)}},{Header:"Code",accessor:function(e){return(0,i.Mp)(e.merchant_code)}},{Header:"Partner Id",accessor:function(e){return(0,i.Mp)(e.merchant_plink_id)}},{Header:"Merchant Email",accessor:function(e){return(0,i.Mp)(e.merchant_email)}},{Header:"Merchant Phone Number",accessor:function(e){return(0,i.Mp)(e.merchant_phone_number)}},{Header:"Contact Name",accessor:function(e){return(0,i.Mp)(e.contact_name)}},{Header:"Contact Phone Number",accessor:function(e){return(0,i.Mp)(e.contact_phone_number)}}]}},91296:function(e,a,n){n.r(a);var t=n(1413),r=n(72791),i=n(9571),o=n(78881),l=n(1851),c=n(60364),d=n(72426),s=n.n(d),u=n(64554),m=n(61889),p=n(10703),h=n(33915),_=n(67438),f=n(23939),g=n(48550),b=n(16585),y=n(58087),v=(n(34925),n(80184)),k=function(e){var a=e.upsertServiceName,n=e.tablepaginationOnChangeForm,t=e.payload,r=e.name,i=e.label,o=e.dataDetail;return(0,v.jsx)(v.Fragment,{children:(0,v.jsx)(g.Z,{size:"small",id:r,label:i,value:"undefined"!==typeof t[r]?t[r]:o[r]||"",onChange:function(e){return n({serviceName:a,fieldName:r,fieldValue:e.target.value})}})})},x=function(e){var a=e.tablepaginationOnChangeForm,n=e.dataDetail,i=e.payload,o=e.upsertServiceName,l=e.id,c=e.tablepaginationResetForm,d=(e.formTitle,e.userPrivileges);return r.useEffect((function(){var e={};l&&(e._id=l),c({apiVersion:2,isInitialReset:!0,serviceName:o,defaultFormValue:e})}),[c,o,l]),console.log("payloadpayloadpayload===>",i.title),console.log("payloadpayloadpayload===>",n.title),(0,v.jsx)(h.Z,{dateAdapter:_.Z,children:(0,v.jsxs)(u.Z,{component:"form",sx:{"& .MuiTextField-root":{m:1,width:"25ch"}},noValidate:!0,autoComplete:"off",children:[(0,v.jsx)(k,{upsertServiceName:o,dataDetail:n,payload:i,tablepaginationOnChangeForm:a,name:"frontend_callback_url",label:"Frontend Callback Url"}),(0,v.jsx)(k,{upsertServiceName:o,dataDetail:n,payload:i,tablepaginationOnChangeForm:a,name:"backend_callback_url",label:"Backend Callback Url"}),(0,v.jsx)(k,{upsertServiceName:o,dataDetail:n,payload:i,tablepaginationOnChangeForm:a,name:"address",label:"Address"}),(0,v.jsx)(k,{upsertServiceName:o,dataDetail:n,payload:i,tablepaginationOnChangeForm:a,name:"merchant_picture",label:"Merchant Picture"}),(0,v.jsx)(k,{upsertServiceName:o,dataDetail:n,payload:i,tablepaginationOnChangeForm:a,name:"contact_name",label:"Contact Name"}),(0,v.jsx)(k,{upsertServiceName:o,dataDetail:n,payload:i,tablepaginationOnChangeForm:a,name:"contact_phone_number",label:"Contact Phone Number"}),d.includes("13")&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(k,{upsertServiceName:o,dataDetail:n,payload:i,tablepaginationOnChangeForm:a,name:"merchant_name",label:"Merchant Name"}),(0,v.jsx)(k,{upsertServiceName:o,dataDetail:n,payload:i,tablepaginationOnChangeForm:a,name:"merchant_code",label:"Merchant Code"}),(0,v.jsx)(k,{upsertServiceName:o,dataDetail:n,payload:i,tablepaginationOnChangeForm:a,name:"merchant_debitin_id",label:"Merchant Debitin Id"}),(0,v.jsx)(k,{upsertServiceName:o,dataDetail:n,payload:i,tablepaginationOnChangeForm:a,name:"merchant_plink_id",label:"Merchant Plink Id"}),(0,v.jsx)(k,{upsertServiceName:o,dataDetail:n,payload:i,tablepaginationOnChangeForm:a,name:"merchant_phone_number",label:"Merchant Phone Number"}),(0,v.jsx)(k,{upsertServiceName:o,dataDetail:n,payload:i,tablepaginationOnChangeForm:a,name:"merchant_email",label:"Merchant Email"}),(0,v.jsx)(f.Z,{label:"Active Date",value:"undefined"!==typeof i.active_date?i.active_date:n.active_date||"",inputFormat:"yyyy-MM-dd HH:mm:ss.SSS",onChange:function(e){var n=s()(e);a({serviceName:o,fieldName:"active_date",fieldValue:n.isValid()?s()(n).format("YYYY-MM-DD HH:mm:ss.SSS ZZ"):""})},renderInput:function(e){return(0,v.jsx)(g.Z,(0,t.Z)({size:"small"},e))}}),(0,v.jsx)(k,{upsertServiceName:o,dataDetail:n,payload:i,tablepaginationOnChangeForm:a,name:"is_active",label:"Is Active"}),(0,v.jsx)(k,{upsertServiceName:o,dataDetail:n,payload:i,tablepaginationOnChangeForm:a,name:"client_token",label:"Client Token"}),(0,v.jsx)(k,{upsertServiceName:o,dataDetail:n,payload:i,tablepaginationOnChangeForm:a,name:"is_parent",label:"Is Parent"}),(0,v.jsx)(k,{upsertServiceName:o,dataDetail:n,payload:i,tablepaginationOnChangeForm:a,name:"merchant_type",label:"Merchant Type"}),(0,v.jsx)(k,{upsertServiceName:o,dataDetail:n,payload:i,tablepaginationOnChangeForm:a,name:"payment_method_config",label:"Payment Method Config"})]})]})})};a.default=(0,c.$j)((function(e,a){return{userPrivileges:e.myprofile.user_privileges,merchant:e.myprofile.merchant}}))((0,l.ZP)((function(e){console.log("raysaaaaaaaa");var a=e.match,n=e.userPrivileges;return(0,v.jsx)(o.Z,{pageTitle:y.ny,breadcrumb:[{title:"Beranda",link:b.Z.appHomePage},{title:y.oj,link:(0,y.uX)()},{title:y.ny,link:null,isActive:!0}],contentHeaderTitle:y.ny,isNeedLoggedin:!0,children:(0,v.jsx)(u.Z,{sx:{flexGrow:1},children:(0,v.jsx)(m.ZP,{container:!0,spacing:1,children:(0,v.jsx)(m.ZP,{container:!0,item:!0,spacing:3,children:(0,v.jsx)(m.ZP,{item:!0,xs:12,children:(0,v.jsx)(p.Z,{variant:"outlined",children:(0,v.jsx)("div",{style:{padding:10},children:(0,v.jsx)(i.F,{detailServiceName:y.Yo,upsertServiceName:y.PI,fields:y.XU,id:a.params._id,formTitle:y.ny,redirectAfterDelete:y.AJ,withoutWrapper:!0,children:(0,v.jsx)(x,{userPrivileges:n,formTitle:y.ny})})})})})})})})})})))},34925:function(e,a,n){n.d(a,{AJ:function(){return s},O_:function(){return y},PI:function(){return g},PS:function(){return u},Pu:function(){return x},XU:function(){return k},Yo:function(){return b},_W:function(){return _},dV:function(){return p},ny:function(){return f},oj:function(){return h},uX:function(){return m},wo:function(){return v}});n(72791);var t=n(91523),r=n(16585),i=n(80184),o=r.Z.basePath,l=r.Z.appName,c="tokoonline",d="/tokoonline/detail",s="/"+c,u=function(e){return"/".concat(c,"/upsert").concat(e?"/"+e:"")},m=function(){return"/".concat(c)},p="Buat Baru",h="Daftar Toko",_="Toko Detail",f="Form "+l,g="upsertTokoTokoOnline",b="getDetailTokoTokoOnline",y="getAllTokoTokoOnlines",v="deleteTokoTokoOnline",k="_id,name,pgateway_id{_id,title,keyid,mid,secretkey,configs},template,image_ids{_id, filename, filenameorigin, file_type},logo{_id, filename, filenameorigin, file_type},address,email,template,plink_merchant_secret_key,province,city,subcity,slug,plink_merchant_id,plink_merchant_key_id,status,website,facebook,instagram,youtube,description,created_at,updated_at,owner{_id,full_name,email},created_by{full_name},updated_by{full_name}",x=function(e){return[{Header:" ",accessor:"_id",Cell:function(e){return(0,i.jsxs)("div",{className:"btn-group",children:[(0,i.jsx)("button",{type:"button",className:"btn btn-default dropdown-toggle dropdown-icon","data-toggle":"dropdown",children:(0,i.jsx)("span",{className:"sr-only",children:"Toggle Dropdown"})}),(0,i.jsx)("div",{className:"dropdown-menu",role:"menu",children:(0,i.jsx)(t.rU,{className:"dropdown-item",to:"".concat(o).concat(d,"/").concat(e.cell.value),children:"Detail"})})]})}},{Header:"Nama",accessor:"name"},{Header:"website",accessor:"website"},{Header:"facebook",accessor:"facebook"},{Header:"instagram",accessor:"instagram"},{Header:"youtube",accessor:"youtube"},{Header:"status",accessor:"status"},{Header:"Pemilik",accessor:"owner.full_name"}]};a.ZP={redirectAfterCreate:d,redirectAfterDelete:s,detailPageUrl:function(e){return"/".concat(c,"/detail/").concat(e)},upsertPageUrl:u,createNewButtonLabel:p,createPageTitle:"Buat Baru",listallPageTitle:h,detailPageTitle:_,upsertPageTitle:f,createService:"createTokoTokoOnline",detailService:b,upsertService:g,listallService:y,deleteService:v,fields:k,getColumns:x,listallPageUrl:m}}}]);
//# sourceMappingURL=1296.2c759283.chunk.js.map