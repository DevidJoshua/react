"use strict";(self.webpackChunkprismatech_webapp=self.webpackChunkprismatech_webapp||[]).push([[4308],{46901:function(e,a,t){t.d(a,{AJ:function(){return u},O_:function(){return b},PI:function(){return g},PS:function(){return m},Pu:function(){return N},XU:function(){return x},Yo:function(){return v},_W:function(){return f},dV:function(){return _},ny:function(){return y},oj:function(){return h},uX:function(){return p},wo:function(){return j}});t(72791);var n=t(91523),r=t(72426),i=t.n(r),s=t(16585),c=t(80184),o=s.Z.basePath,l="purchaseorder",d="/"+l+"/detail",u="/"+l,m=function(e){return"/".concat(l,"/upsert").concat(e?"/"+e:"")},p=function(){return"/".concat(l)},_="Buat Pesanan Baru",h="Data Pembelian",f="Data Detail Pembelian",y="Form PurchaseOrder",g="upsertTokoPo",v="getDetailTokoPo",b="getAllTokoPos",j="deleteTokoPo",x="_id,payment_link_id,payment_status,pg_trx_id,total_weight,shipping_currier_vendor,shipping_postal_code, isneed_shipping, payment_method, payment_method_id{_id,title,description},notes,postal_fee_type,action,create_from,payment_date,shipping_currier,payment_page_url,full_name,phone_number,unique_code,invoice_code,email,session_id,device_id,shipping_subcity,shipping_city,shipping_province,shipping_address,total_product_amount,total_amount,shipping_amount,cart_id{_id, notes, count, amount, toko_id{_id, name, address, province, city, subcity}, product_id{_id, price, isneed_shipping, weight, name}},toko_id{_id, name, address, province, city, subcity},created_at,updated_at,created_by{full_name},updated_by{full_name}",N=function(e,a){return[{Header:"Act",accessor:"_id",Cell:function(e){return(0,c.jsxs)("div",{className:"btn-group",children:[(0,c.jsx)("button",{type:"button",className:"btn btn-default dropdown-toggle dropdown-icon","data-toggle":"dropdown",children:(0,c.jsx)("span",{className:"sr-only",children:"Toggle Dropdown"})}),(0,c.jsx)("div",{className:"dropdown-menu",role:"menu",children:(0,c.jsx)(n.rU,{className:"dropdown-item",to:"".concat(o).concat(d,"/").concat(e.cell.value),children:"Detail"})})]})}},{Header:"Status",accessor:function(e){return{paymentProcess:"proses pembayaran",checkoutProcess:"proses checkout",doPayment:"Pembayaran Selesai",paymentSuccess:"Pembayaran Selesai",paymentFailed:"Pembayaran Selesai"}[e.action]||"-"}},{Header:"PG Ref No.",accessor:"pg_trx_id"},{Header:"Status Pembayaran",accessor:"payment_status"},{Header:"Payment Method",accessor:"payment_method"},{Header:"Nama",accessor:"full_name"},{Header:"No Invoice",accessor:"invoice_code"},{Header:"Toko",accessor:"toko_id.name"},{Header:"Total Pembayaran",accessor:function(e){return a.formatNumber(e.total_amount,{style:"currency",currency:s.Z.currency,minimumFractionDigits:0,maximumFractionDigits:0})}},{Header:"Tanggal Transaksi",accessor:"updated_at",Cell:function(e){var a=i()(e.cell.value);return a=a&&a.isValid()?a.format("YYYY-MM-DD HH:mm:ss"):"",(0,c.jsx)("span",{children:"".concat(a)})}},{Header:"Tanggal Pembayaran",accessor:"payment_date",Cell:function(e){var a=i()(e.cell.value);return a=a&&a.isValid()?a.format("YYYY-MM-DD HH:mm:ss"):"",(0,c.jsx)("span",{children:"".concat(a)})}},{Header:"Link Pembayaran",accessor:function(e){return e.session_id?(0,c.jsxs)("button",{type:"button",onClick:function(a){var t=document.createElement("textarea");document.body.appendChild(t),t.value="".concat(s.Z.hostBackend,"/payment/").concat(e.payment_link_id),t.select(),document.execCommand("copy"),document.body.removeChild(t),alert("Copied the text: "+t.value)},className:"btn btn-outline-primary",children:[(0,c.jsx)("i",{className:"fa fa-copy"})," Link Pembayaran"]}):null}}]}},84308:function(e,a,t){t.r(a);var n,r=t(15671),i=t(43144),s=t(60136),c=t(54062),o=t(30168),l=t(72791),d=t(60364),u=t(1851),m=t(59513),p=t.n(m),_=t(17939),h=t(78881),f=t(9571),y=t(16585),g=t(46901),v=t(80184),b=_.ZP.div(n||(n=(0,o.Z)(["\n  .react-datepicker-wrapper {\n    width: 100%;\n  }\n"]))),j=function(e){(0,s.Z)(t,e);var a=(0,c.Z)(t);function t(e){var n;return(0,r.Z)(this,t),(n=a.call(this,e)).state={columns:(0,g.Pu)(e.history,n.props.intl),startDate:"",endDate:""},n}return(0,i.Z)(t,[{key:"render",value:function(){var e=this,a=this.state,t=a.columns,n=a.startDate,r=a.endDate,i=this.props.lang;return(0,v.jsx)(h.Z,{pageTitle:g.oj,breadcrumb:[{title:"Beranda",link:y.Z.appHomePage},{title:g.oj,link:null,isActive:!0}],contentHeaderTitle:g.oj,isNeedLoggedin:!0,children:(0,v.jsx)("div",{className:"row",children:(0,v.jsxs)("div",{className:"col-md-12",children:[(0,v.jsx)(b,{children:(0,v.jsx)(f.wn,{serviceName:g.O_,child:function(a){return(0,v.jsx)("div",{className:"row",children:(0,v.jsxs)("div",{className:"col-sm-6",children:[(0,v.jsx)("div",{className:"form-group"}),(0,v.jsxs)("div",{className:"row",children:[(0,v.jsx)("div",{className:"col-sm-6",children:(0,v.jsxs)("div",{className:"form-group",children:[(0,v.jsx)("label",{htmlFor:"updated_at",children:"Tanggal Transaksi Mulai"}),(0,v.jsx)(p(),{style:{width:"100%"},locale:i,className:"form-control",selected:n,onChange:function(t){a({serviceName:g.O_,fieldName:"start_date",fieldValue:new Date(t).getTime()}),e.setState({startDate:t})}})]})}),(0,v.jsx)("div",{className:"col-sm-6",children:(0,v.jsxs)("div",{className:"form-group",children:[(0,v.jsx)("label",{htmlFor:"updated_at",children:"Tanggal Transaksi Sampai"}),(0,v.jsx)(p(),{style:{width:"100%"},className:"form-control",selected:r,onChange:function(t){e.setState({endDate:t}),a({serviceName:g.O_,fieldName:"start_date",fieldValue:new Date(t).getTime()})}})]})})]})]})})}})}),(0,v.jsx)(f.iA,{listallServiceName:g.O_,fields:g.XU,columns:t,createHref:(0,g.PS)(),createNewButtonLabel:g.dV,cardTitle:g.oj,withSearchField:!0,widthSearchField:300})]})})})}}]),t}(l.PureComponent);a.default=(0,d.$j)((function(e,a){return{lang:e.app.lang}}))((0,u.ZP)(j))}}]);
//# sourceMappingURL=4308.e058c80f.chunk.js.map