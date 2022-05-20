"use strict";(self.webpackChunkprismatech_webapp=self.webpackChunkprismatech_webapp||[]).push([[4561],{46901:function(e,t,a){a.d(t,{AJ:function(){return u},O_:function(){return v},PI:function(){return y},PS:function(){return p},Pu:function(){return P},XU:function(){return x},Yo:function(){return g},_W:function(){return _},dV:function(){return h},ny:function(){return b},oj:function(){return f},uX:function(){return m},wo:function(){return j}});a(72791);var n=a(91523),r=a(72426),i=a.n(r),s=a(16585),c=a(80184),o=s.Z.basePath,l="purchaseorder",d="/"+l+"/detail",u="/"+l,p=function(e){return"/".concat(l,"/upsert").concat(e?"/"+e:"")},m=function(){return"/".concat(l)},h="Buat Pesanan Baru",f="Data Pembelian",_="Data Detail Pembelian",b="Form PurchaseOrder",y="upsertTokoPo",g="getDetailTokoPo",v="getAllTokoPos",j="deleteTokoPo",x="_id,payment_link_id,payment_status,pg_trx_id,total_weight,shipping_currier_vendor,shipping_postal_code, isneed_shipping, payment_method, payment_method_id{_id,title,description},notes,postal_fee_type,action,create_from,payment_date,shipping_currier,payment_page_url,full_name,phone_number,unique_code,invoice_code,email,session_id,device_id,shipping_subcity,shipping_city,shipping_province,shipping_address,total_product_amount,total_amount,shipping_amount,cart_id{_id, notes, count, amount, toko_id{_id, name, address, province, city, subcity}, product_id{_id, price, isneed_shipping, weight, name}},toko_id{_id, name, address, province, city, subcity},created_at,updated_at,created_by{full_name},updated_by{full_name}",P=function(e,t){return[{Header:"Act",accessor:"_id",Cell:function(e){return(0,c.jsxs)("div",{className:"btn-group",children:[(0,c.jsx)("button",{type:"button",className:"btn btn-default dropdown-toggle dropdown-icon","data-toggle":"dropdown",children:(0,c.jsx)("span",{className:"sr-only",children:"Toggle Dropdown"})}),(0,c.jsx)("div",{className:"dropdown-menu",role:"menu",children:(0,c.jsx)(n.rU,{className:"dropdown-item",to:"".concat(o).concat(d,"/").concat(e.cell.value),children:"Detail"})})]})}},{Header:"Status",accessor:function(e){return{paymentProcess:"proses pembayaran",checkoutProcess:"proses checkout",doPayment:"Pembayaran Selesai",paymentSuccess:"Pembayaran Selesai",paymentFailed:"Pembayaran Selesai"}[e.action]||"-"}},{Header:"PG Ref No.",accessor:"pg_trx_id"},{Header:"Status Pembayaran",accessor:"payment_status"},{Header:"Payment Method",accessor:"payment_method"},{Header:"Nama",accessor:"full_name"},{Header:"No Invoice",accessor:"invoice_code"},{Header:"Toko",accessor:"toko_id.name"},{Header:"Total Pembayaran",accessor:function(e){return t.formatNumber(e.total_amount,{style:"currency",currency:s.Z.currency,minimumFractionDigits:0,maximumFractionDigits:0})}},{Header:"Tanggal Transaksi",accessor:"updated_at",Cell:function(e){var t=i()(e.cell.value);return t=t&&t.isValid()?t.format("YYYY-MM-DD HH:mm:ss"):"",(0,c.jsx)("span",{children:"".concat(t)})}},{Header:"Tanggal Pembayaran",accessor:"payment_date",Cell:function(e){var t=i()(e.cell.value);return t=t&&t.isValid()?t.format("YYYY-MM-DD HH:mm:ss"):"",(0,c.jsx)("span",{children:"".concat(t)})}},{Header:"Link Pembayaran",accessor:function(e){return e.session_id?(0,c.jsxs)("button",{type:"button",onClick:function(t){var a=document.createElement("textarea");document.body.appendChild(a),a.value="".concat(s.Z.hostBackend,"/payment/").concat(e.payment_link_id),a.select(),document.execCommand("copy"),document.body.removeChild(a),alert("Copied the text: "+a.value)},className:"btn btn-outline-primary",children:[(0,c.jsx)("i",{className:"fa fa-copy"})," Link Pembayaran"]}):null}}]}},24561:function(e,t,a){a.r(t),a.d(t,{default:function(){return v}});var n=a(72791),r=a(1851),i=a(763),s=a.n(i),c=a(9571),o=a(11480),l=a(78881),d=a(46901),u=a(80184),p="tokocart",m={redirectAfterCreate:"/tokocart/detail",redirectAfterDelete:"/tokocart",detailPageUrl:function(e){return"/".concat(p,"/detail/").concat(e)},upsertPageUrl:function(e){return"/".concat(p,"/upsert").concat(e?"/"+e:"")},createNewButtonLabel:"Create New TokoCart",createPageTitle:"Create New TokoCart",listallPageTitle:"Daftar Produk",detailPageTitle:"TokoCart Detail",detailService:"getDetailTokoCart",listallService:"getAllTokoCarts",deleteService:"deleteTokoCart",upsertService:"upsertTokoCart",fields:"_id, count, notes, amount, product_id{name, code, price}, device_id, session_id",getColumns:function(e){return[{Header:"Nama Produk",accessor:function(e){return(0,u.jsxs)(u.Fragment,{children:[e.product_id&&(0,u.jsx)("span",{children:(e.product_id||{}).name}),!e.product_id&&(0,u.jsx)("span",{className:"badge bg-danger",children:"Produk telah dihapus"})]})}},{Header:"Kode Produk",accessor:function(e){return(0,u.jsx)("span",{children:(e.product_id||{}).code})}},{Header:"Harga (Rp)",accessor:function(e){return(0,u.jsx)("span",{children:(e.product_id||{}).price})}},{Header:"Qty",accessor:"count"},{Header:"Amount",accessor:"amount"},{Header:"Catatan",accessor:"notes"}]},listallPageUrl:function(){return"/".concat(p)},listallBySessionIdService:"getAllTokoCartsBySessionId"},h=a(72426),f=a.n(h),_=a(16585);function b(e,t,a){var n=t[a[0]],r="";return r=!s().isEmpty(n)&&Array.isArray(n)?n.map((function(e){return e?e[a[1]]:"-"})).join(", "):s().isEmpty(n)||"object"!==typeof n?n:n[a[1]],(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("dt",{children:e}),(0,u.jsx)("dd",{children:r||"-"})]})}var y=n.memo((function(e){var t=e.history,a=e.match,n=e.dataDetail;return console.log("propspropsprops=>",e),(0,u.jsx)(c.iA,{listallServiceName:m.listallBySessionIdService,fields:m.fields,columns:m.getColumns({history:t,tokoId:a.params._id}),cardTitle:m.listallPageTitle,whereCondition:{session_id:n.session_id,status:"*"}})})),g=function(e){var t=e.dataDetail,a=e.history,n=e.match,r=e.intl,i=f()(t.created_at||0);i=i&&i.isValid()?i.format("YYYY-MM-DD HH:mm:ss"):"";var s=f()(t.updated_at||0);return s=s&&s.isValid()?s.format("YYYY-MM-DD HH:mm:ss"):"",(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("div",{className:"row",children:[(0,u.jsxs)("div",{className:"col-md-6",children:[(0,u.jsx)("div",{className:"row",children:(0,u.jsx)("div",{className:"col-md-12",children:(0,u.jsxs)("div",{className:"card",children:[(0,u.jsxs)("div",{className:"card-header","data-card-widget":"collapse",children:[(0,u.jsx)("h3",{className:"card-title",children:"Total Pembayaran"}),(0,u.jsx)("div",{className:"card-tools",children:(0,u.jsx)("button",{type:"button",className:"btn btn-tool myCardWidget","data-card-widget":"collapse",children:(0,u.jsx)("i",{className:"fas fa-minus"})})})]}),(0,u.jsx)("div",{className:"card-body",children:(0,u.jsxs)("dl",{children:[(0,u.jsx)("dt",{children:"Total Harga Product"}),(0,u.jsx)("dd",{children:r.formatNumber(t.total_product_amount,{style:"currency",currency:_.Z.currency,minimumFractionDigits:0,maximumFractionDigits:0})}),b("Kode Unik",t,["unique_code"]),(0,u.jsx)("dt",{children:"Ongkos Kirim"}),(0,u.jsx)("dd",{children:r.formatNumber(t.shipping_amount,{style:"currency",currency:_.Z.currency,minimumFractionDigits:0,maximumFractionDigits:0})}),(0,u.jsx)("dt",{children:"Total Pembayaran"}),(0,u.jsx)("dd",{children:r.formatNumber(t.total_amount,{style:"currency",currency:_.Z.currency,minimumFractionDigits:0,maximumFractionDigits:0})}),{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_TAPTALK_SECRET:"06c17097010c84bc9d4422859f1d89e30d6c4384604f427c2981753a4c283db9",REACT_APP_BACKEND_BASE_URL:"",REACT_APP_BASE_URL:"",REACT_APP_BASE_URL_PRODUCTION:"https://dashboard.plink.co.id",REACT_APP_BASE_URL_STAGING:"https://dashboard-staging.plink.co.id",REACT_APP_PAY_DONATION_LINK_URL:"https://secure2-dev.plink.co.id",REACT_APP_DEV_HOST_PROXY:"https://dashboard-staging.plink.co.id",REACT_APP_PAYMENT_LINK_REDIRECTION_ENDPOINT:"/paymentpage/web/payment-page/payment-step1",REACT_APP_HOMEPAGE_PATH:"/dashboard-ecomm",REACT_APP_APP_NAME:"PLINKLite Dev",REACT_APP_GRAPHQL_PATH:"/fmpkcxgwv4zuecddsnk65htcrvnt9ae4jc3h58b4",REACT_APP_COPYRIGH:"\xa9 2020 PT. Prismalink International",REACT_APP_CURRENCY:"IDR",REACT_APP_HMACKEY:"QsXtEtYmuPdBUFvtS4DSsmm52v6MaMvWf7Er7Eth"}.REACT_APP_SHOW_FORMFIELD_PAYMENTMETHOD&&b("Metode Pembayaran",t,["payment_method_id","title"]),(0,u.jsx)("dt",{children:"Link Pembayaran"}),(0,u.jsxs)("dd",{children:[_.Z.hostBackend,"/payment/",t.session_id]}),(0,u.jsx)("dd",{children:(0,u.jsxs)("button",{type:"button",onClick:function(e){var a=document.createElement("textarea");document.body.appendChild(a),a.value="".concat(_.Z.hostBackend,"/payment/").concat(t.session_id),a.select(),document.execCommand("copy"),document.body.removeChild(a),alert("Copied the text: "+a.value)},className:"btn btn-outline-primary",children:[(0,u.jsx)("i",{className:"fa fa-copy"})," Copy Link Pembayaran"]})})]})})]})})}),(0,u.jsx)("div",{className:"row",children:(0,u.jsx)("div",{className:"col-md-12",children:(0,u.jsxs)("div",{className:"card",children:[(0,u.jsxs)("div",{className:"card-header","data-card-widget":"collapse",children:[(0,u.jsx)("h3",{className:"card-title",children:"Data Pembeli"}),(0,u.jsx)("div",{className:"card-tools",children:(0,u.jsx)("button",{type:"button",className:"btn btn-tool myCardWidget","data-card-widget":"collapse",children:(0,u.jsx)("i",{className:"fas fa-minus"})})})]}),(0,u.jsx)("div",{className:"card-body",children:(0,u.jsxs)("dl",{children:[(0,u.jsx)("dt",{children:"Nama"}),(0,u.jsx)("dd",{children:t.full_name||"-"}),(0,u.jsx)("dt",{children:"Nomor Telepon"}),(0,u.jsx)("dd",{children:t.phone_number||"-"}),(0,u.jsx)("dt",{children:"Email"}),(0,u.jsx)("dd",{children:t.email||"-"})]})})]})})})]}),(0,u.jsx)("div",{className:"col-md-6",children:(0,u.jsx)("div",{className:"row",children:(0,u.jsx)("div",{className:"col-md-12",children:(0,u.jsxs)("div",{className:"card",children:[(0,u.jsxs)("div",{className:"card-header","data-card-widget":"collapse",children:[(0,u.jsx)("h3",{className:"card-title",children:"Alamat Pengiriman"}),(0,u.jsx)("div",{className:"card-tools",children:(0,u.jsx)("button",{type:"button",className:"btn btn-tool myCardWidget","data-card-widget":"collapse",children:(0,u.jsx)("i",{className:"fas fa-minus"})})})]}),(0,u.jsx)("div",{className:"card-body",children:(0,u.jsxs)("dl",{children:["auto"===t.postal_fee_type&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("dt",{children:"Provinsi"}),(0,u.jsx)("dd",{children:(0,u.jsx)(o.eZ,{defaultValue:t.shipping_province,forProcess:"display"})}),(0,u.jsx)("dt",{children:"Kota/Kabupaten"}),(0,u.jsx)("dd",{children:(0,u.jsx)(o.hx,{defaultValue:t.shipping_city,provinceId:t.shipping_province,forProcess:"display"})}),(0,u.jsx)("dt",{children:"Kecamatan"}),(0,u.jsx)("dd",{children:(0,u.jsx)(o.Kp,{defaultValue:t.shipping_subcity,cityId:t.shipping_city,forProcess:"display"})}),(0,u.jsx)("dt",{children:"Kurir Vendor"}),(0,u.jsx)("dd",{children:(0,u.jsx)(o.Sg,{defaultValue:t.shipping_currier_vendor,subcityId:t.shipping_subcity,forProcess:"display"})}),(0,u.jsx)("dt",{children:"Kurir"}),(0,u.jsx)("dd",{children:(0,u.jsx)(o.w0,{defaultValue:t.shipping_currier,currierVendorId:t.shipping_currier_vendor,tokoSubcity:t.toko_id.subcity,shippingSubcity:t.shipping_subcity,weight:t.total_weight,forProcess:"display"})})]}),b("Kode Pos",t,["shipping_postal_code"]),b("Alamat",t,["shipping_address"]),(0,u.jsx)("dt",{children:"Catatan"}),(0,u.jsx)("dd",{children:t.notes||"-"})]})})]})})})})]}),(0,u.jsx)("div",{className:"row",children:(0,u.jsx)("div",{className:"col-md-12",children:(0,u.jsx)(y,{history:a,match:n,dataDetail:t})})})]})};var v=(0,r.ZP)((function(e){var t=e.match,a=e.history,n=e.intl;return(0,u.jsx)(l.Z,{pageTitle:d._W,breadcrumb:[{title:"Home",link:_.Z.appHomePage},{title:"Daftar Pembelian",link:"/purchaseorder"},{title:d._W,link:null,isActive:!0}],contentHeaderTitle:d._W,isNeedLoggedin:!0,children:(0,u.jsx)("div",{className:"row",children:(0,u.jsx)("div",{className:"col-md-12",children:(0,u.jsx)(c.F,{detailServiceName:d.Yo,deleteServiceName:d.wo,fields:d.XU,id:t.params._id,formTitle:d._W,redirectAfterDelete:d.AJ,updatePageUrl:(0,d.PS)(t.params._id),createPageUrl:(0,d.PS)(),withoutWrapper:!0,children:(0,u.jsx)(g,{history:a,match:t,intl:n})})})})})}))},11480:function(e,t,a){a.d(t,{hx:function(){return u},w0:function(){return h},Sg:function(){return m},eZ:function(){return d},Kp:function(){return p}});var n=a(29439),r=a(72791),i=a(763),s=a.n(i),c=a(16585),o=a(38626),l=a(80184);var d=function(e){var t=e.defaultValue,a=e.onChange,i=e.disabled,d=e.forProcess,u=e.withLabel,p=r.useState(!1),m=(0,n.Z)(p,2),h=m[0],f=m[1],_=r.useState(null),b=(0,n.Z)(_,2),y=b[0],g=b[1],v=r.useState([]),j=(0,n.Z)(v,2),x=j[0],P=j[1],k=function(e){f(!0),fetch(c.Z.hostBackend+"/api/v1/fetchdata-province",{method:"GET",headers:{key:"a6d84c88b9fc6cbdf502972c57885da1"}}).then((function(e){return e.json()})).then((function(e){var t=null;if(e&&!e.error||(t="Gagal load data. Klik untuk reload"),f(!1),g(t),e.list_data)return P((e.list_data||[]).map((function(e){return{province_id:e.province_code,province:e.province_name}})));P(((e||{}).rajaongkir||{}).results||[])})).catch((function(e){return g("Gagal load data. Klik untuk reload")})).finally((function(){e&&f(!1)}))};(0,r.useEffect)((function(){var e=!0;return 0===x.length&&k(e),function(){e=!1}}),[t,d,x.length]);var N=function(){return h?(0,l.jsx)(o.Z,{loading:!0,type:"rpmerah"}):y?(0,l.jsx)("button",{onClick:function(e){return k()},type:"button",className:"btn bg-gradient-danger btn-xs",children:y}):"display"===d?(0,l.jsx)("span",{children:(s().find(x,{province_id:t})||{}).province||"-"}):(0,l.jsxs)("select",{name:"province",value:t,id:"province",className:"custom-select",onChange:function(e){return a(e.target.value)},disabled:i,children:[(0,l.jsx)("option",{value:"-",children:"pilih"}),x.map((function(e,t){return(0,l.jsx)("option",{value:e.province_id,children:e.province},t)}))]})};return!h&&x.length<=0&&!y?"display"===d?"-":null:u?(0,l.jsxs)("div",{className:"form-group",children:[(0,l.jsx)("label",{htmlFor:"province",children:"Provinsi"}),N()]}):N()};var u=function(e){var t=e.defaultValue,a=e.onChange,i=e.provinceId,d=e.disabled,u=e.forProcess,p=e.withLabel,m=r.useState(!1),h=(0,n.Z)(m,2),f=h[0],_=h[1],b=r.useState(""),y=(0,n.Z)(b,2),g=y[0],v=y[1],j=r.useState(null),x=(0,n.Z)(j,2),P=x[0],k=x[1],N=r.useState([]),C=(0,n.Z)(N,2),T=C[0],A=C[1],S=(0,r.useCallback)((function(e){_(!0),v(i),Promise.all([fetch(c.Z.hostBackend+"/api/v1/fetchdata-city?province="+i,{method:"GET",headers:{key:"a6d84c88b9fc6cbdf502972c57885da1"}}).then((function(e){return e.json()})).then((function(e){var t=null;if(e&&!e.error||(t="Gagal load data. Klik untuk reload"),k(t),e.list_data)return A((e.list_data||[]).map((function(e){return{city_id:e.city_code,city_name:e.city_name}})));A(((e||{}).rajaongkir||{}).results||[])})).catch((function(e){return k("Gagal load data. Klik untuk reload")})).finally((function(){return _(!1)}))]).then((function(){})).catch((function(e){return console.error(e)}))}),[i]);(0,r.useEffect)((function(){var e=new AbortController;return"display"===u&&s().isEmpty(t)||i&&i!==g&&S(),function(){return e.abort()}}),[i,u,t,S,g]);var E=function(){return f?(0,l.jsx)(o.Z,{loading:!0,type:"rpmerah"}):P?(0,l.jsx)("button",{onClick:function(e){return S()},type:"button",className:"btn bg-gradient-danger btn-xs",children:P}):"display"===u?(0,l.jsx)("span",{children:(s().find(T,{city_id:t})||{}).city_name||"-"}):(0,l.jsxs)("select",{name:"city",value:t,id:"city",className:"custom-select",onChange:function(e){return a(e.target.value)},disabled:d,children:[(0,l.jsx)("option",{value:"-",children:"pilih"}),T.map((function(e,t){return(0,l.jsx)("option",{value:e.city_id,children:e.city_name},t)}))]})};return!f&&T.length<=0&&!P?"display"===u?"-":null:p?(0,l.jsxs)("div",{className:"form-group",children:[(0,l.jsx)("label",{htmlFor:"city",children:"Kota/Kabupaten"}),E()]}):E()};var p=function(e){var t=e.defaultValue,a=e.onChange,i=e.cityId,d=e.disabled,u=e.forProcess,p=e.withLabel,m=r.useState(!1),h=(0,n.Z)(m,2),f=h[0],_=h[1],b=r.useState(""),y=(0,n.Z)(b,2),g=y[0],v=y[1],j=r.useState(null),x=(0,n.Z)(j,2),P=x[0],k=x[1],N=r.useState([]),C=(0,n.Z)(N,2),T=C[0],A=C[1],S=(0,r.useCallback)((function(){_(!0),v(i),Promise.all([fetch(c.Z.hostBackend+"/api/v1/fetchdata-subcity?city="+i,{method:"GET",headers:{key:"a6d84c88b9fc6cbdf502972c57885da1"}}).then((function(e){return e.json()})).then((function(e){var t=null;if(e&&!e.error||(t="Gagal load data. Klik untuk reload"),k(t),_(!1),e.list_data)return A((e.list_data||[]).map((function(e){return{subdistrict_id:e.subcity_code,subdistrict_name:e.subcity_name}})));A(((e||{}).rajaongkir||{}).results||[])})).catch((function(e){return k("Gagal load data. Klik untuk reload")})).finally((function(){return _(!1)}))]).then((function(){})).catch((function(e){return console.error(e)}))}),[i]);(0,r.useEffect)((function(){var e=new AbortController;return"display"===u&&s().isEmpty(t)||i&&i!==g&&S(),function(){return e.abort()}}),[i,t,S,u,g]);var E=function(){return f?(0,l.jsx)(o.Z,{loading:!0,type:"rpmerah"}):P?(0,l.jsx)("button",{onClick:function(e){return S()},type:"button",className:"btn bg-gradient-danger btn-xs",children:P}):"display"===u?(0,l.jsx)("span",{children:(s().find(T,{subdistrict_id:t})||{}).subdistrict_name||"-"}):(0,l.jsxs)("select",{name:"subcity",value:t,id:"subcity",className:"custom-select",onChange:function(e){return a(e.target.value)},disabled:d,children:[(0,l.jsx)("option",{value:"-",children:"pilih"}),T.map((function(e,t){return(0,l.jsx)("option",{value:e.subdistrict_id,children:e.subdistrict_name},t)}))]})};return!f&&T.length<=0&&!P?"display"===u?"-":null:p?(0,l.jsxs)("div",{className:"form-group",children:[(0,l.jsx)("label",{htmlFor:"subcity",children:"Kecamatan"}),E()]}):E()};var m=function(e){var t=e.defaultValue,a=e.onChange,i=e.subcityId,c=e.disabled,d=e.forProcess,u=e.withLabel,p=r.useState(!1),m=(0,n.Z)(p,2),h=m[0],f=m[1],_=r.useState(""),b=(0,n.Z)(_,2),y=b[0],g=b[1],v=r.useState(null),j=(0,n.Z)(v,1)[0],x=r.useState([]),P=(0,n.Z)(x,2),k=P[0],N=P[1],C=(0,r.useCallback)((function(){f(!0),g(i),console.log("subcityIdsubcityIdsubcityIdsubcityId=>",i),N("undefined"!==typeof i&&""!==i?[{value:"jne",label:"jne"},{value:"jnt",label:"jnt"},{value:"tiki",label:"tiki"},{value:"sicepat",label:"sicepat"},{value:"wahana",label:"wahana"},{value:"ninja",label:"ninja"},{value:"pos",label:"pos"}]:[]),f(!1)}),[i]);(0,r.useEffect)((function(){var e=new AbortController;return"display"===d&&s().isEmpty(t)||i&&i!==y&&C(),function(){return e.abort()}}),[i,t,C,d,y]);var T=function(){return h?(0,l.jsx)(o.Z,{loading:!0,type:"rpmerah"}):j?(0,l.jsx)("button",{onClick:function(e){return C()},type:"button",className:"btn bg-gradient-danger btn-xs",children:j}):"display"===d?(0,l.jsx)("span",{children:(s().find(k,{value:t})||{}).label||"-"}):(0,l.jsxs)("select",{name:"shipping_currier_vendor",value:t,id:"shipping_currier_vendor",className:"custom-select",onChange:function(e){return a(e.target.value)},disabled:c,children:[(0,l.jsx)("option",{value:"-",children:"pilih"}),k.map((function(e,t){return(0,l.jsx)("option",{value:e.value,children:e.label},t)}))]})};return!h&&k.length<=0&&!j?"display"===d?"-":null:u?(0,l.jsxs)("div",{className:"form-group",children:[(0,l.jsx)("label",{htmlFor:"shipping_currier_vendor",children:"Kurir Vendor"}),T()]}):T()};var h=function(e){var t=e.tokoSubcity,a=e.shippingSubcity,i=e.weight,d=e.defaultValue,u=e.onChange,p=e.currierVendorId,m=e.disabled,h=e.forProcess,f=e.withLabel,_=r.useState(!1),b=(0,n.Z)(_,2),y=b[0],g=b[1],v=r.useState(""),j=(0,n.Z)(v,2),x=j[0],P=j[1],k=r.useState(null),N=(0,n.Z)(k,2),C=N[0],T=N[1],A=r.useState([]),S=(0,n.Z)(A,2),E=S[0],w=S[1],D=(0,r.useCallback)((function(){if(g(!0),P(p),"undefined"!==typeof p&&""!==p){var e={origin:t,originType:"subdistrict",destinationType:"subdistrict",destination:a,weight:parseFloat(i),courier:p};console.log("bodybody=>",e),Promise.all([fetch(c.Z.hostBackend+"/api/v1/fetchdata-cost",{method:"POST",headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},body:JSON.stringify(e)}).then((function(e){return e.json()})).then((function(e){e&&!e.error||T("Gagal load data. Klik untuk reload");var t=null,a=(((e||{}).rajaongkir||{}).status||{}).code,n=(((e||{}).rajaongkir||{}).status||{}).description;200!==a&&(t=(n||"").includes("Weight harus lebih besar dari 0")?"Berat barang tidak boleh kurang dari 1 Gram.":n),t?(T(t),alert(t)):T(null),g(!1);var r=(((e||{}).rajaongkir||{}).results[0]||{}).costs;w(r.map((function(e){return{value:e.service,label:e.service,origin:e}})))})).catch((function(e){return T("Gagal load data. Klik untuk reload")})).finally((function(){return g(!1)}))]).then((function(){})).catch((function(e){return console.error(e)}))}else w([]),g(!1)}),[p,a,t,i]);(0,r.useEffect)((function(){var e=new AbortController;return"display"===h&&s().isEmpty(d)||p&&p!==x&&D(),function(){return e.abort()}}),[p,d,D,h,x]);var H=function(){return y?(0,l.jsx)(o.Z,{loading:!0,type:"rpmerah"}):C?(0,l.jsx)("button",{onClick:function(e){return D()},type:"button",className:"btn bg-gradient-danger btn-xs",children:C}):"display"===h?(0,l.jsx)("span",{children:(s().find(E,{value:d})||{}).label||"-"}):(0,l.jsxs)("select",{name:"shipping_currier",value:d,id:"shipping_currier",className:"custom-select",onChange:function(e){return u(e.target.value,E)},disabled:m,children:[(0,l.jsx)("option",{value:"-",children:"pilih"}),E.map((function(e,t){return(0,l.jsx)("option",{value:e.value,children:e.label},t)}))]})};return!y&&E.length<=0&&!C?"display"===h?"-":null:f?(0,l.jsxs)("div",{className:"form-group",children:[(0,l.jsx)("label",{htmlFor:"shipping_currier",children:"Kurir"}),H()]}):H()}}}]);
//# sourceMappingURL=4561.9ca8367c.chunk.js.map