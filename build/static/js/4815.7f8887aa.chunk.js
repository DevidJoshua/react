"use strict";(self.webpackChunkprismatech_webapp=self.webpackChunkprismatech_webapp||[]).push([[4815],{90783:function(e,t,a){a.d(t,{G6:function(){return l},OR:function(){return i},XU:function(){return n}});var r="customeremail",i="label-create_customer_email",l="createCustomerEmail",n="_id,email,batch_id,created_at,updated_at,created_by{full_name},updated_by{full_name}";t.ZP={redirectAfterCreate:"/customeremail/detail",redirectAfterDelete:"/customeremail",detailPageUrl:function(e){return"/".concat(r,"/detail/").concat(e)},updatePageUrl:function(e){return"/".concat(r,"/update/").concat(e)},createPageUrl:function(e){var t=e.batchId;return"/".concat(r,"/create/").concat(t)},createNewButtonLabel:"label-create_customer_email",createPageTitle:i,listallPageTitle:"Email Customer",detailPageTitle:"Detail Email Customer",updatePageTitle:"Update CustomerEmail",createService:l,detailService:"getDetailCustomerEmail",updateService:"updateCustomerEmail",listallService:"getAllCustomerEmails",listallByBatchIdService:"getAllCustomerEmailsByBatchId",deleteService:"deleteCustomerEmail",fields:n,getColumns:function(e){return[{Header:"Email",accessor:"email"}]}}},74815:function(e,t,a){a.r(t);var r=a(72791),i=a(9571),l=a(78881),n=a(90783),c=a(72725),u=a(16585),o=a(80184),s={serviceName:n.G6,fields:n.XU},d=null;t.default=function(e){var t=e.history,a=e.match;return(0,r.useEffect)((function(){d({serviceName:s.serviceName,fieldName:"batch_id",fieldValue:a.params.batch_id||""})})),(0,o.jsx)(l.Z,{pageTitle:n.OR,breadcrumb:[{title:"Beranda",link:u.Z.appHomePage},{title:"Daftar Email Blast",link:"/emailblast"},{title:"Buat Daftar Email Customer",link:null,isActive:!0}],contentHeaderTitle:n.OR,isNeedLoggedin:!0,children:(0,o.jsx)("div",{className:"row",children:(0,o.jsx)("div",{className:"col-md-12",children:(0,o.jsx)(i.Qj,{formTitle:n.OR,paginationConfig:s,redirectAfterCreateToParent:"".concat(c.ZP.redirectAfterCreate,"/").concat(a.params.batch_id),gotoParent:!0,child:function(e){return d=e,(0,o.jsx)("div",{className:"row",children:(0,o.jsx)("div",{className:"col-sm-6",children:(0,o.jsxs)("div",{className:"form-group",children:[(0,o.jsx)("label",{htmlFor:"title",children:"Email"}),(0,o.jsx)("input",{type:"text",className:"form-control",id:"name",placeholder:"Masukkan judul grup email customer",onChange:function(t){return e({serviceName:s.serviceName,fieldName:"email",fieldValue:t.target.value})}})]})})})},footerCard:function(e){var r=e.tablepaginationSubmitForm,i=e.payload;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("button",{style:{width:100},type:"button",className:"btn bg-gradient-warning",onClick:function(e){return t.goBack()},children:"Batal"}),(0,o.jsx)("button",{style:{width:100,marginLeft:5},type:"button",className:"btn bg-gradient-primary",onClick:function(e){return r({fields:s.fields,payload:i,serviceName:s.serviceName,history:t,redirectAfterCreateToParent:"".concat(c.ZP.redirectAfterCreate,"/").concat(a.params.batch_id)})},children:"Kirim"})]})}})})})})}},72725:function(e,t,a){a.d(t,{AJ:function(){return o},O_:function(){return b},PI:function(){return h},PS:function(){return s},Pu:function(){return C},XU:function(){return v},Yo:function(){return g},_W:function(){return f},dV:function(){return d},ny:function(){return p},oj:function(){return m},wo:function(){return _}});a(72791);var r=a(91523),i=a(16585),l=a(80184),n=i.Z.basePath,c="emailbatch",u="/emailbatch/detail",o="/"+c,s=function(e){return"/".concat(c,"/upsert").concat(e?"/"+e:"")},d="Buat Grup Email Customer",m="Email Grup",f="Detail Email Grup",p="Form Grup Email",g="getDetailEmailBatch",h="upsertEmailBatch",b="getAllEmailBatchs",_="deleteEmailBatch",v="_id,customer_email_ids{_id, email},file_ids{_id, filename, filenameorigin, file_type},title,description,created_at,updated_at,created_by{full_name},updated_by{full_name}",C=function(e){return[{Header:"",accessor:"_id",Cell:function(e){return(0,l.jsxs)("div",{className:"btn-group",children:[(0,l.jsx)("button",{type:"button",className:"btn btn-default dropdown-toggle dropdown-icon","data-toggle":"dropdown",children:(0,l.jsx)("span",{className:"sr-only",children:"Toggle Dropdown"})}),(0,l.jsx)("div",{className:"dropdown-menu",role:"menu",children:(0,l.jsx)(r.rU,{className:"dropdown-item",to:"".concat(n).concat(u,"/").concat(e.cell.value),children:"Detail"})})]})}},{Header:"Judul",accessor:"title"},{Header:"Keterangan",accessor:"description"}]};t.ZP={redirectAfterCreate:u,redirectAfterDelete:o,detailPageUrl:function(e){return"/".concat(c,"/detail/").concat(e)},upsertPageUrl:s,createNewButtonLabel:d,createPageTitle:"Buat Grup Email Customer",listallPageTitle:m,detailPageTitle:f,detailService:g,listallService:b,deleteService:_,upsertService:h,fields:v,getColumns:C,listallPageUrl:function(){return"/".concat(c)},upsertPageTitle:p}}}]);
//# sourceMappingURL=4815.7f8887aa.chunk.js.map