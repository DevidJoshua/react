"use strict";(self.webpackChunkprismatech_webapp=self.webpackChunkprismatech_webapp||[]).push([[8970],{58087:function(e,n,r){r.d(n,{AJ:function(){return h},O_:function(){return b},PI:function(){return f},PS:function(){return o},Pu:function(){return P},XU:function(){return g},Yo:function(){return p},_W:function(){return j},dV:function(){return u},ny:function(){return x},oj:function(){return _},uX:function(){return m},wo:function(){return M}});r(72791);var t=r(91523),c=(r(763),r(16585)),d=r(85545),a=r(80184),i=c.Z.basePath,l="merchant",s="/merchant/detail",h="/"+l,o=function(e){return"/".concat(l,"/upsert").concat(e?"/"+e:"")},m=function(){return"/".concat(l)},u="Buat Merchant Baru",_="Merchant",j="Detail Merchant",x="Form Merchant",p="getDetailMerchant",f="upsertMerchant",b="getAllMerchants",M="deleteMerchant",g="_id,merchant_name,merchant_code,merchant_debitin_id,merchant_plink_id,merchant_email,merchant_phone_number,frontend_callback_url,backend_callback_url,active_date,is_active,client_token,is_parent,address,merchant_type,merchant_picture,contact_name,contact_phone_number,payment_method_config,created_at,updated_at,created_by{full_name},updated_by{full_name},merchant_key{key_encrypt,key_id},merchant_paymentmethod{payment_method_code,configs}",P=function(e){return[{Header:" ",accessor:"_id",Cell:function(e){return(0,a.jsxs)("div",{className:"btn-group",children:[(0,a.jsx)("button",{type:"button",className:"btn btn-default dropdown-toggle dropdown-icon","data-toggle":"dropdown",children:(0,a.jsx)("span",{className:"sr-only",children:"Toggle Dropdown"})}),(0,a.jsx)("div",{className:"dropdown-menu",role:"menu",children:(0,a.jsx)(t.rU,{className:"dropdown-item",to:"".concat(i).concat(s,"/").concat(e.cell.value),children:"Detail"})})]})}},{Header:"Merchant Name",accessor:function(e){return(0,d.Mp)(e.merchant_name)}},{Header:"Code",accessor:function(e){return(0,d.Mp)(e.merchant_code)}},{Header:"Partner Id",accessor:function(e){return(0,d.Mp)(e.merchant_plink_id)}},{Header:"Merchant Email",accessor:function(e){return(0,d.Mp)(e.merchant_email)}},{Header:"Merchant Phone Number",accessor:function(e){return(0,d.Mp)(e.merchant_phone_number)}},{Header:"Contact Name",accessor:function(e){return(0,d.Mp)(e.contact_name)}},{Header:"Contact Phone Number",accessor:function(e){return(0,d.Mp)(e.contact_phone_number)}}]}},78970:function(e,n,r){r.r(n);r(72791);var t=r(1851),c=(r(763),r(60364)),d=r(9571),a=r(78881),i=r(58087),l=r(54700),s=r(6688),h=r(72426),o=r.n(h),m=r(16585),u=r(94030),_=r(61889),j=(r(71897),r(80184)),x=function(e){var n=e.dataDetail,r=(e.formTitle,e.match),t=e.userPrivileges,c=o()(n.created_at||0);c=c&&c.isValid()?c.format("YYYY-MM-DD HH:mm:ss"):"";var a=o()(n.updated_at||0);return a=a&&a.isValid()?a.format("YYYY-MM-DD HH:mm:ss"):"",(0,j.jsx)(j.Fragment,{children:(0,j.jsxs)("div",{className:"row",children:[(0,j.jsxs)("div",{className:"col-sm-6",children:[(0,j.jsx)(d.As,{formTitle:"Merchant Integration Parameter",children:(0,j.jsxs)("dl",{children:[(0,j.jsx)("dt",{children:"Merchant Name"}),(0,j.jsx)("dd",{children:n.merchant_name}),(0,j.jsx)("dt",{children:"Merchant Code"}),(0,j.jsx)("dd",{children:n.merchant_code}),(0,j.jsx)("dt",{children:"Merchant Email"}),(0,j.jsx)("dd",{children:n.merchant_email}),(0,j.jsx)("dt",{children:"Merchant Phone Number"}),(0,j.jsx)("dd",{children:n.merchant_phone_number}),(0,j.jsx)("dt",{children:"Merchant Frontend Callback Url"}),(0,j.jsx)("dd",{children:n.frontend_callback_url}),(0,j.jsx)("dt",{children:"Merchant Backend Callback Url"}),(0,j.jsx)("dd",{children:n.backend_callback_url}),(0,j.jsx)("dt",{children:"Active Date"}),(0,j.jsx)("dd",{children:n.active_date}),(0,j.jsx)("dt",{children:"Is Active"}),(0,j.jsx)("dd",{children:n.is_active}),(0,j.jsx)("dt",{children:"Merchant Address"}),(0,j.jsx)("dd",{children:n.address}),(0,j.jsx)("dt",{children:"Merchant Picture"}),(0,j.jsx)("dd",{children:n.merchant_picture}),(0,j.jsx)("dt",{children:"Contact Name"}),(0,j.jsx)("dd",{children:n.contact_name}),(0,j.jsx)("dt",{children:"Contact Phone Number"}),(0,j.jsx)("dd",{children:n.contact_phone_number})]})}),t.includes("13")&&(0,j.jsx)(d.As,{formTitle:"Merchant Info",children:(0,j.jsxs)("dl",{children:[(0,j.jsx)("dt",{children:"Debitin Merchant Id"}),(0,j.jsx)("dd",{children:n.merchant_debitin_id}),(0,j.jsx)("dt",{children:"Merchant Id"}),(0,j.jsx)("dd",{children:n._id}),(0,j.jsx)("dt",{children:"Plink Merchant Id / Partner Id"}),(0,j.jsx)("dd",{children:n.merchant_plink_id}),(0,j.jsx)("dt",{children:"Client Token"}),(0,j.jsx)("dd",{children:n.client_token}),(0,j.jsx)("dt",{children:"Is Merchant Parent"}),(0,j.jsx)("dd",{children:n.is_parent}),(0,j.jsx)("dt",{children:"Merchant Type"}),(0,j.jsx)("dd",{children:n.merchant_type}),(0,j.jsx)("dt",{children:"Payment Method Config"}),(0,j.jsx)("dd",{children:n.payment_method_config}),(0,j.jsx)("dt",{children:"Diperbaharui Oleh"}),(0,j.jsx)("dd",{children:(n.updated_by||{}).full_name||""}),(0,j.jsx)("dt",{children:"Dibuat Oleh"}),(0,j.jsx)("dd",{children:(n.created_by||{}).full_name||""}),(0,j.jsx)("dt",{children:"Tanggal Pembuatan"}),(0,j.jsx)("dd",{children:c}),(0,j.jsx)("dt",{children:"Tanggal Diperbaharui"}),(0,j.jsx)("dd",{children:a})]})})]}),(0,j.jsx)("div",{className:"col-sm-6",children:(0,j.jsxs)("div",{className:"row",children:[(0,j.jsx)("div",{className:"col-sm-12",children:(0,j.jsx)(d.iA,{listallServiceName:s.ZP.listallService,fields:s.ZP.fields,columns:s.ZP.getColumns(e.history),cardHeader:function(){return(0,j.jsx)("div",{className:"row",children:(0,j.jsx)(_.ZP,{container:!0,spacing:2,children:(0,j.jsx)(_.ZP,{item:!0,children:(0,j.jsx)(u.qc,{merchantId:r.params._id,buttonTriggerLabel:"Create New Key"})})})})},cardTitle:s.ZP.listallPageTitle,withSearchField:!0,widthSearchField:300,apiVersion:2,whereCondition:{merchant_id:r.params._id}})}),t.includes("13")&&(0,j.jsx)("div",{className:"col-sm-12",children:(0,j.jsx)(d.As,{formTitle:"Payment Method",children:(n.merchant_paymentmethod||[]).map((function(e,n){return(0,j.jsxs)("dl",{children:[(0,j.jsx)("dt",{children:"Payment Method Code"}),(0,j.jsx)("dd",{children:e.payment_method_code}),(0,j.jsx)("dt",{children:"Configs"}),(0,j.jsx)("dd",{children:e.configs})]},n)}))})}),t.includes("13")&&(0,j.jsx)("div",{className:"col-sm-12",children:(0,j.jsx)(l.AS,{})})]})})]})})};n.default=(0,c.$j)((function(e,n){return{userPrivileges:e.myprofile.user_privileges,merchant:e.myprofile.merchant}}))((0,t.ZP)((function(e){var n=e.match,r=e.history,t=e.userPrivileges;return(0,j.jsx)(a.Z,{pageTitle:i._W,breadcrumb:[{title:"Beranda",link:m.Z.appHomePage},{title:i.oj,link:(0,i.uX)()},{title:i._W,link:null,isActive:!0}],contentHeaderTitle:i._W,isNeedLoggedin:!0,children:(0,j.jsx)("div",{className:"row",children:(0,j.jsx)("div",{className:"col-md-12",children:(0,j.jsx)(d.F,{detailServiceName:i.Yo,deleteServiceName:i.wo,fields:i.XU,id:n.params._id,formTitle:i._W,redirectAfterDelete:i.AJ,updatePageUrl:(0,i.PS)(n.params._id),createPageUrl:(0,i.PS)(),withoutWrapper:!0,children:(0,j.jsx)(x,{userPrivileges:t,formTitle:i._W,history:r,match:n})})})})})})))}}]);
//# sourceMappingURL=8970.acfd0bb0.chunk.js.map