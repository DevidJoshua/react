"use strict";(self.webpackChunkprismatech_webapp=self.webpackChunkprismatech_webapp||[]).push([[116],{58087:function(e,t,n){n.d(t,{AJ:function(){return u},O_:function(){return b},PI:function(){return g},PS:function(){return d},Pu:function(){return N},XU:function(){return _},Yo:function(){return x},_W:function(){return h},dV:function(){return p},ny:function(){return v},oj:function(){return f},uX:function(){return m},wo:function(){return y}});n(72791);var a=n(91523),r=(n(763),n(16585)),o=n(85545),i=n(80184),c=r.Z.basePath,l="merchant",s="/merchant/detail",u="/"+l,d=function(e){return"/".concat(l,"/upsert").concat(e?"/"+e:"")},m=function(){return"/".concat(l)},p="Buat Merchant Baru",f="Merchant",h="Detail Merchant",v="Form Merchant",x="getDetailMerchant",g="upsertMerchant",b="getAllMerchants",y="deleteMerchant",_="_id,merchant_name,merchant_code,merchant_debitin_id,merchant_plink_id,merchant_email,merchant_phone_number,frontend_callback_url,backend_callback_url,active_date,is_active,client_token,is_parent,address,merchant_type,merchant_picture,contact_name,contact_phone_number,payment_method_config,created_at,updated_at,created_by{full_name},updated_by{full_name},merchant_key{key_encrypt,key_id},merchant_paymentmethod{payment_method_code,configs}",N=function(e){return[{Header:" ",accessor:"_id",Cell:function(e){return(0,i.jsxs)("div",{className:"btn-group",children:[(0,i.jsx)("button",{type:"button",className:"btn btn-default dropdown-toggle dropdown-icon","data-toggle":"dropdown",children:(0,i.jsx)("span",{className:"sr-only",children:"Toggle Dropdown"})}),(0,i.jsx)("div",{className:"dropdown-menu",role:"menu",children:(0,i.jsx)(a.rU,{className:"dropdown-item",to:"".concat(c).concat(s,"/").concat(e.cell.value),children:"Detail"})})]})}},{Header:"Merchant Name",accessor:function(e){return(0,o.Mp)(e.merchant_name)}},{Header:"Code",accessor:function(e){return(0,o.Mp)(e.merchant_code)}},{Header:"Partner Id",accessor:function(e){return(0,o.Mp)(e.merchant_plink_id)}},{Header:"Merchant Email",accessor:function(e){return(0,o.Mp)(e.merchant_email)}},{Header:"Merchant Phone Number",accessor:function(e){return(0,o.Mp)(e.merchant_phone_number)}},{Header:"Contact Name",accessor:function(e){return(0,o.Mp)(e.contact_name)}},{Header:"Contact Phone Number",accessor:function(e){return(0,o.Mp)(e.contact_phone_number)}}]}},29867:function(e,t,n){n.d(t,{AJ:function(){return m},O_:function(){return g},PS:function(){return p},Pu:function(){return Z},XU:function(){return y},Yo:function(){return x},_W:function(){return v},a2:function(){return C},oj:function(){return h},uX:function(){return f},wo:function(){return b}});var a=n(1413),r=(n(72791),n(91523)),o=n(763),i=n.n(o),c=n(16585),l=n(85545),s=n(80184),u=c.Z.basePath,d="/report/transaction-detail",m="/report/all-transaction",p=function(e){return"/report/transaction-form".concat(e?"/"+e:"")},f=function(){return"/report/all-transaction"},h="Transaction Report",v="Transaction Detail",x="getDetailPlTransaction",g="getAllPlTransactions",b="deletePlTransaction",y="accountNumber,partnerCode,mercNm,externalId,invoiceNumber,id,pymtMethodCd,paySts,payDt,trxCreationDt,trxAmt,ecommRefNo,payBnkRefNo,mercId,mercCd,mercRefNo,mercNm,pymtMethodCd,pymtMethodNm,coCcyCd",_=[{status:"SETLD",text:"Dibayar",class:"btn-success btn-sm"},{status:"SETTL",text:"Dibayar",class:"btn-success btn-sm"},{status:"PAID",text:"Dibayar",class:"btn-success btn-sm"},{status:"PNDNG",text:"Menunggu Pembayaran",class:"btn-warning btn-sm"},{status:"REJEC",text:"Pembayaran Gagal",class:"btn-danger btn-sm"},{status:"REJCT",text:"Pembayaran Gagal",class:"btn-danger btn-sm"},{status:"CANCL",text:"Pembayaran Dibatalkan",class:"btn-secondary btn-sm"}],N=function(e){var t=_.find((function(t){return t.status===e}));return t?t.class:"btn-default btn-sm"},Z=function(e){return[{Header:"",accessor:"id",Cell:function(e){return(0,s.jsxs)("div",{className:"btn-group",children:[(0,s.jsx)("button",{type:"button",className:"btn btn-default dropdown-toggle dropdown-icon","data-toggle":"dropdown",children:(0,s.jsx)("span",{className:"sr-only",children:"Toggle Dropdown"})}),(0,s.jsx)("div",{className:"dropdown-menu",role:"menu",children:(0,s.jsx)(r.rU,{className:"dropdown-item",to:"".concat(u).concat(d,"/").concat(e.cell.value),children:"Detail"})})]})}},{Header:"Merchant Ref No",accessor:function(e){return(0,l.Mp)(e.mercRefNo)}},{Header:"Plink Ref No",accessor:function(e){return(0,l.Mp)(e.ecommRefNo)}},{Header:"Bank Ref No",accessor:function(e){return(0,l.Mp)(e.payBnkRefNo)}},{Header:"Created Date",accessor:function(e){return(0,l.Mp)(e.trxCreationDt)}},{Header:"Merchant Name",accessor:function(e){return(0,l.Mp)(e.mercNm)}},{Header:"Payment Method",accessor:function(e){return(0,l.Mp)(e.pymtMethodCd)}},{Header:"Bank",accessor:function(e){return(0,l.Mp)(e.partnerCode)}},{Header:"Account No",accessor:function(e){return(0,l.Mp)(e.accountNumber)}},{Header:"Amount",accessor:function(e){return(0,l.Mp)((0,l.vK)(e.trxAmt))}},{Header:"Payment Date",accessor:function(e){return(0,l.Mp)(e.payDt)}},{Header:"Status",accessor:function(e){return(0,s.jsx)("span",{className:N(e.paySts),children:(0,s.jsx)("strong",{children:(0,l.Mp)(e.paySts)})})}}]},C={endPoint:"/api/render/document/pltransactions",fileName:"Data Transaction",exportId:g,buildPayload:function(e,t){var n=i().has(e.tablepagination.pageIndex,t)?e.tablepagination.pageIndex[t]:0,r=i().has(e.tablepagination.pageSize,t)?e.tablepagination.pageSize[t]:0,o=i().has(e.tablepagination.filter,t)?e.tablepagination.filter[t]:0;return{page_index:n,page_size:r,filter:(0,a.Z)({},o)}}}},30116:function(e,t,n){n.r(t),n.d(t,{default:function(){return E}});var a=n(15671),r=n(43144),o=n(60136),i=n(54062),c=n(1413),l=n(72791),s=n(60364),u=n(59513),d=n.n(u),m=n(72426),p=n.n(m),f=n(78881),h=n(9571),v=n(29867),x=n(16585),g=n(88922),b=(n(58087),n(29439)),y=n(1851),_=n(48550),N=n(64554),Z=n(23786),C=n(23939),M=n(33915),j=n(67438),P=n(80184),D=[{value:"",label:"All"},{value:"CC",label:"Credit Card"},{value:"DD",label:"Debitin"},{value:"VA",label:"Virtual Account"},{value:"QR",label:"QRIS"},{value:"PL",label:"Paylater"}],H=[{value:"",label:"All"},{value:"SETLD",label:"Settled"},{value:"PNDNG",label:"Pending"},{value:"CANCL",label:"Cancel"},{value:"REJEC",label:"Reject"}];var k=(0,s.$j)((function(e,t){return{filter:e.tablepagination.filter.getAllPlTransactions||{}}}))((0,y.ZP)((function(e){var t=e.tablepaginationOnChangeFilter,n=e.listallService,a=(e.DatePicker,e.merchant,e.userPrivileges),r=e.filter,o=(0,l.useState)(r.startDate||null),i=(0,b.Z)(o,2),s=i[0],u=i[1],d=(0,l.useState)(r.endDate||null),m=(0,b.Z)(d,2),f=m[0],h=m[1],v=(0,l.useState)(r.pymtMethodCd),x=(0,b.Z)(v,2),g=(x[0],x[1]),y=(0,l.useState)(r.status),k=(0,b.Z)(y,2),S=k[0],w=k[1],T=(0,l.useState)(r.merchant_code),A=(0,b.Z)(T,2),V=A[0],E=A[1],I=(0,l.useState)(r.merchant_ref_no),R=(0,b.Z)(I,2),Y=R[0],z=R[1],O=(0,l.useState)(r.external_id),B=(0,b.Z)(O,2),F=B[0],L=B[1];return(0,P.jsx)(M.Z,{dateAdapter:j.Z,children:(0,P.jsx)(N.Z,{component:"form",sx:{"& .MuiTextField-root":{m:1,width:"25ch"}},noValidate:!0,autoComplete:"off",children:(0,P.jsxs)("div",{children:[(0,P.jsx)(_.Z,{size:"small",id:"outlined-select-payment-method",select:!0,label:"Payment Method",value:r.pymtMethodCd,onChange:function(e){g(e.target.value),t({serviceName:n,fieldName:"pymtMethodCd",fieldValue:e.target.value})},children:D.map((function(e){return(0,P.jsx)(Z.Z,{value:e.value,children:e.label},e.value)}))}),(0,P.jsx)(_.Z,{size:"small",id:"outlined-select-payment-status",select:!0,label:"Payment Status",value:S,onChange:function(e){w(e.target.value),t({serviceName:n,fieldName:"status",fieldValue:e.target.value})},children:H.map((function(e){return(0,P.jsx)(Z.Z,{value:e.value,children:e.label},e.value)}))}),(0,P.jsx)(C.Z,{label:"Start Trx Date",value:s,inputFormat:"yyyy-MM-dd HH:mm:ss",onChange:function(e){var a=p()(e);a.isValid()?u(p()(a).format("YYYY-MM-DD HH:mm:ss")):u(null),t({serviceName:n,fieldName:"startDate",fieldValue:a.isValid()?p()(a).format("YYYY-MM-DD HH:mm:ss.SSS ZZ"):""})},renderInput:function(e){return(0,P.jsx)(_.Z,(0,c.Z)({size:"small"},e))}}),(0,P.jsx)(C.Z,{label:"End Trx Date",value:f,inputFormat:"yyyy-MM-dd HH:mm:ss",onChange:function(e){var a=p()(e);a.isValid()?h(p()(a).format("YYYY-MM-DD HH:mm:ss")):h(null),t({serviceName:n,fieldName:"endDate",fieldValue:a.isValid()?p()(a).format("YYYY-MM-DD HH:mm:ss.SSS ZZ"):""})},renderInput:function(e){return(0,P.jsx)(_.Z,(0,c.Z)({size:"small"},e))}}),a.includes("getAllPlTransactions")&&(0,P.jsx)(_.Z,{size:"small",id:"merchant_code",label:"Merchant Code",value:V,onChange:function(e){E(e.target.value)},onBlur:function(e){V!==e.target.value&&t({serviceName:n,fieldName:"merchant_code",fieldValue:e.target.value})},onKeyDown:function(e){13===(e.keyCode?e.keyCode:e.which)&&t({serviceName:n,fieldName:"merchant_code",fieldValue:e.target.value})}}),(0,P.jsx)(_.Z,{size:"small",id:"merchant-ref-no",label:"Merchant Ref No",value:Y,onChange:function(e){z(e.target.value)},onBlur:function(e){console.log("on blureed"),e.target.value!==Y&&t({serviceName:n,fieldName:"merchant_ref_no",fieldValue:e.target.value})},onKeyDown:function(e){13===(e.keyCode?e.keyCode:e.which)&&t({serviceName:n,fieldName:"merchant_ref_no",fieldValue:e.target.value})}}),(0,P.jsx)(_.Z,{size:"small",id:"no_pesanan",label:"Eksternal Id",value:F,onChange:function(e){L(e.target.value)},onBlur:function(e){e.target.value!==F&&t({serviceName:n,fieldName:"external_id",fieldValue:e.target.value})},onKeyDown:function(e){13===(e.keyCode?e.keyCode:e.which)&&t({serviceName:n,fieldName:"external_id",fieldValue:e.target.value})}})]})})})}))),S=n(61889),w=n(10703),T=n(47630),A=n(85545),V=((0,T.ZP)(w.Z)((function(e){var t=e.theme;return(0,c.Z)((0,c.Z)({},t.typography.body2),{},{padding:t.spacing(1),textAlign:"center",color:t.palette.text.secondary})})),function(e){(0,o.Z)(n,e);var t=(0,i.Z)(n);function n(e){var r;return(0,a.Z)(this,n),(r=t.call(this,e)).state={columns:(0,v.Pu)(e.history)},r}return(0,r.Z)(n,[{key:"render",value:function(){var e={serviceName:v.O_,fields:v.XU},t=this.state.columns,n=this.props,a=n.merchant,r=n.userPrivileges,o=[];if(r.includes("getAllPlTransactions")){for(var i={Header:"Merchant Code",accessor:function(e){return(0,A.Mp)(e.mercCd)}},c=t.length+1,l=0;l<c;l++)2===l?o.push(i):o.push(t[l]);console.log("cols =====>",o)}else[].push("mercCd"),o=t;return(0,P.jsx)(f.Z,{pageTitle:v.oj,breadcrumb:[{title:"Beranda",link:x.Z.appHomePage},{title:v.oj,link:null,isActive:!0}],contentHeaderTitle:v.oj,isNeedLoggedin:!0,children:(0,P.jsx)(N.Z,{sx:{flexGrow:1},children:(0,P.jsxs)(S.ZP,{container:!0,spacing:1,children:[(0,P.jsx)(S.ZP,{container:!0,item:!0,spacing:3,children:(0,P.jsx)(S.ZP,{item:!0,xs:12,children:(0,P.jsx)(w.Z,{variant:"outlined",children:(0,P.jsx)(h.wn,{withoutCardHeader:!0,serviceName:v.O_,child:function(e){return(0,P.jsx)(k,{tablepaginationOnChangeFilter:e,listallService:v.O_,DatePicker:d(),merchant:a,userPrivileges:r})}})})})}),(0,P.jsx)(S.ZP,{container:!0,item:!0,spacing:3,children:(0,P.jsx)(S.ZP,{item:!0,xs:12,children:(0,P.jsx)(w.Z,{variant:"outlined",children:(0,P.jsx)("div",{style:{padding:10},children:(0,P.jsx)(h.iA,{withoutWrapper:!0,listallServiceName:e.serviceName,fields:e.fields,columns:o,cardTitle:v.oj,cardHeader:function(){return(0,P.jsx)(g.Z,{exportOptions:v.a2})},apiVersion:2})})})})})]})})})}}]),n}(l.Component)),E=(0,s.$j)((function(e,t){return{userPrivileges:e.myprofile.user_privileges,merchant:e.myprofile.merchant}}))(V)},88922:function(e,t,n){n.d(t,{Z:function(){return g}});var a=n(1413),r=n(72791),o=n(60364),i=n(29439),c=n(24518),l=n(80911),s=n(23786),u=n(64554),d=n(60627),m=n(73518),p=n(80184),f=function(e){var t=e.exportFileOptions,n=e.onClickExport,a=r.useState(null),o=(0,i.Z)(a,2),f=o[0],h=o[1],v=Boolean(f),x=function(e){h(null)};return(0,p.jsxs)(u.Z,{children:[(0,p.jsx)(c.Z,{id:"fade-button","aria-haspopup":"true",onClick:function(e){h(e.currentTarget)},variant:"outlined",endIcon:(0,p.jsx)(m.Z,{}),children:"Export"}),(0,p.jsx)(l.Z,{id:"fade-menu",MenuListProps:{"aria-labelledby":"fade-button"},anchorEl:f,open:v,onClose:x,TransitionComponent:d.Z,anchorOrigin:{vertical:"top",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"},children:t.map((function(e){return(0,p.jsx)(s.Z,{onClick:function(t){x(),n(e)},children:e})}))})]})},h=n(95583),v=n(763),x=n.n(v),g=(0,o.$j)((function(e,t){var n=t.exportOptions,a=t.additionalRequests,r=n.buildPayload(e,n.exportId,a),o=e.exportdata.exporting,i=e.exportdata.disabled;return{payload:r,exporting:!!x().has(o,n.exportId)&&e.exportdata.exporting[n.exportId],disabled:!!x().has(i,n.exportId)&&e.exportdata.disabled[n.exportId]}}),(function(e){return{fetchExportData:function(t){return e(h.ZP.fetchExportData(t))}}}))((function(e){var t=e.exportOptions,n=e.payload,r=e.fetchExportData;return console.log("payload=======> ",n),(0,p.jsx)(f,(0,a.Z)((0,a.Z)({},e),{},{exportFileOptions:["csv","txt"],onClickExport:function(e){n.filter.formatFile=e,r((0,a.Z)({fileType:e,payload:n},t))}}))}))},73518:function(e,t,n){var a=n(95318);t.Z=void 0;var r=a(n(45649)),o=n(80184),i=(0,r.default)((0,o.jsx)("path",{d:"M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"}),"Download");t.Z=i}}]);
//# sourceMappingURL=116.19cf0cf9.chunk.js.map