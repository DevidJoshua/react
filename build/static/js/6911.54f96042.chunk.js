"use strict";(self.webpackChunkprismatech_webapp=self.webpackChunkprismatech_webapp||[]).push([[6911],{90783:function(e,t,a){a.d(t,{G6:function(){return n},OR:function(){return l},XU:function(){return r}});var i="customeremail",l="label-create_customer_email",n="createCustomerEmail",r="_id,email,batch_id,created_at,updated_at,created_by{full_name},updated_by{full_name}";t.ZP={redirectAfterCreate:"/customeremail/detail",redirectAfterDelete:"/customeremail",detailPageUrl:function(e){return"/".concat(i,"/detail/").concat(e)},updatePageUrl:function(e){return"/".concat(i,"/update/").concat(e)},createPageUrl:function(e){var t=e.batchId;return"/".concat(i,"/create/").concat(t)},createNewButtonLabel:"label-create_customer_email",createPageTitle:l,listallPageTitle:"Email Customer",detailPageTitle:"Detail Email Customer",updatePageTitle:"Update CustomerEmail",createService:n,detailService:"getDetailCustomerEmail",updateService:"updateCustomerEmail",listallService:"getAllCustomerEmails",listallByBatchIdService:"getAllCustomerEmailsByBatchId",deleteService:"deleteCustomerEmail",fields:r,getColumns:function(e){return[{Header:"Email",accessor:"email"}]}}},72725:function(e,t,a){a.d(t,{AJ:function(){return s},O_:function(){return v},PI:function(){return h},PS:function(){return d},Pu:function(){return y},XU:function(){return b},Yo:function(){return g},_W:function(){return f},dV:function(){return u},ny:function(){return p},oj:function(){return m},wo:function(){return _}});a(72791);var i=a(91523),l=a(16585),n=a(80184),r=l.Z.basePath,c="emailbatch",o="/emailbatch/detail",s="/"+c,d=function(e){return"/".concat(c,"/upsert").concat(e?"/"+e:"")},u="Buat Grup Email Customer",m="Email Grup",f="Detail Email Grup",p="Form Grup Email",g="getDetailEmailBatch",h="upsertEmailBatch",v="getAllEmailBatchs",_="deleteEmailBatch",b="_id,customer_email_ids{_id, email},file_ids{_id, filename, filenameorigin, file_type},title,description,created_at,updated_at,created_by{full_name},updated_by{full_name}",y=function(e){return[{Header:"",accessor:"_id",Cell:function(e){return(0,n.jsxs)("div",{className:"btn-group",children:[(0,n.jsx)("button",{type:"button",className:"btn btn-default dropdown-toggle dropdown-icon","data-toggle":"dropdown",children:(0,n.jsx)("span",{className:"sr-only",children:"Toggle Dropdown"})}),(0,n.jsx)("div",{className:"dropdown-menu",role:"menu",children:(0,n.jsx)(i.rU,{className:"dropdown-item",to:"".concat(r).concat(o,"/").concat(e.cell.value),children:"Detail"})})]})}},{Header:"Judul",accessor:"title"},{Header:"Keterangan",accessor:"description"}]};t.ZP={redirectAfterCreate:o,redirectAfterDelete:s,detailPageUrl:function(e){return"/".concat(c,"/detail/").concat(e)},upsertPageUrl:d,createNewButtonLabel:u,createPageTitle:"Buat Grup Email Customer",listallPageTitle:m,detailPageTitle:f,detailService:g,listallService:v,deleteService:_,upsertService:h,fields:b,getColumns:y,listallPageUrl:function(){return"/".concat(c)},upsertPageTitle:p}},66911:function(e,t,a){a.r(t);var i=a(72791),l=a(9571),n=a(76514),r=a(78881),c=a(72725),o=a(481),s=a(90783),d=a(16585),u=a(80184),m=function(e){var t=e.tablepaginationOnChangeForm,a=e.dataDetail,l=e.payload,r=e.upsertServiceName,c=e.id,o=e.tablepaginationResetForm;return i.useEffect((function(){var e={};c&&(e._id=c),o({isInitialReset:!0,serviceName:r,defaultFormValue:e,formSchema:{title:{type:"string",validate:function(e){if(c&&"undefined"!==typeof e&&!e||!c&&!e)return{errorMessage:"Nama grup email harus diisi."}}},insert_email_list:{type:"string",validate:function(e){if("undefined"!==typeof e&&e&&/\r|\n$/.test(e))return{errorMessage:'Delimiter menggunakan "," bukan karakter Enter'}}},remove_email_list:{type:"string",validate:function(e){if("undefined"!==typeof e&&e&&/\r|\n$/.test(e))return{errorMessage:'Delimiter menggunakan "," bukan karakter Enter'}}},onSuccess:function(){t({serviceName:r,batchData:{insert_email_list:"",remove_email_list:""}})}},needToRealoadAfterSubmit:[s.ZP.listallByBatchIdService]})}),[o,r,c,t]),(0,u.jsx)("div",{className:"row",children:(0,u.jsxs)("div",{className:"col-sm-12",children:[(0,u.jsxs)("div",{className:"form-group",children:[(0,u.jsx)("label",{htmlFor:"title",children:"Nama Grup Email"}),(0,u.jsx)("input",{type:"text",className:"form-control",id:"title",placeholder:"",value:"undefined"!==typeof l.title?l.title:a.title,onChange:function(e){return t({serviceName:r,fieldName:"title",fieldValue:e.target.value})}})]}),(0,u.jsxs)("div",{className:"form-group",children:[(0,u.jsx)("label",{htmlFor:"content1",children:"Keterangan"}),(0,u.jsx)(n.B,{forProcess:"undefined"!==typeof c?"update":"create",dataId:c,defaultValue:"undefined"!==typeof l.description?l.description:a.description,onChange:function(e){return t({serviceName:r,fieldName:"description",fieldValue:e})},idElement:"description"})]}),(0,u.jsxs)("div",{className:"form-group",children:[(0,u.jsx)("label",{htmlFor:"insert_email_list",children:"Daftar email yang akan dimasukkan"}),(0,u.jsx)(n.B,{placeholder:"contoh@gmail.com, contoh2@gmail.com",forProcess:"undefined"!==typeof c?"update":"create",dataId:c,defaultValue:l.insert_email_list,onChange:function(e){return t({serviceName:r,fieldName:"insert_email_list",fieldValue:e})},idElement:"insert_email_list"})]}),(0,u.jsxs)("div",{className:"form-group",children:[(0,u.jsx)("label",{htmlFor:"remove_email_list",children:"Daftar email yang akan dikeluarkan"}),(0,u.jsx)(n.B,{placeholder:"contoh@gmail.com, contoh2@gmail.com",forProcess:"undefined"!==typeof c?"update":"create",dataId:c,defaultValue:l.remove_email_list,onChange:function(e){return t({serviceName:r,fieldName:"remove_email_list",fieldValue:e})},idElement:"remove_email_list"})]})]})})};t.default=function(e){var t=e.match,a=e.history;return(0,u.jsx)(r.Z,{pageTitle:c.ny,breadcrumb:[{title:"Beranda",link:d.Z.appHomePage},{title:o.ZP.listallPageTitle,link:o.ZP.listallPageUrl()},{title:c.ny,link:null,isActive:!0}],contentHeaderTitle:c.ny,isNeedLoggedin:!0,children:(0,u.jsx)("div",{className:"row",children:(0,u.jsxs)("div",{className:"col-md-6",children:[(0,u.jsx)(l.F,{detailServiceName:c.Yo,upsertServiceName:c.PI,fields:c.XU,id:t.params._id,formTitle:c.ny,redirectAfterDelete:c.AJ,children:(0,u.jsx)(m,{})}),(0,u.jsx)(l.iA,{listallServiceName:s.ZP.listallByBatchIdService,fields:s.ZP.fields,columns:s.ZP.getColumns(a),cardTitle:s.ZP.listallPageTitle,whereCondition:JSON.stringify({batch_id:t.params._id})})]})})})}},481:function(e,t,a){a.d(t,{AJ:function(){return u},O_:function(){return y},PI:function(){return b},PS:function(){return m},Pu:function(){return x},XU:function(){return j},Yo:function(){return _},_W:function(){return h},dV:function(){return p},ny:function(){return v},oj:function(){return g},uX:function(){return f},wo:function(){return P}});a(72791);var i=a(91523),l=a(72426),n=a.n(l),r=a(16585),c=a(80184),o=r.Z.basePath,s="emailblast",d="/emailblast/detail",u="/"+s,m=function(e){return"/".concat(s,"/upsert").concat(e?"/"+e:"")},f=function(){return"/".concat(s)},p="Buat Email Blast Baru",g="Email Blast",h="Detail Email Blast",v="Form EmailBlast",_="getDetailEmailBlast",b="upsertEmailBlast",y="getAllEmailBlasts",P="deleteEmailBlast",j="_id,email_batch_id{_id,title, customer_email_ids{email}},toko_id{_id,name,email},name,subject,last_sent,content1,created_at,updated_at,created_by{full_name},updated_by{full_name}",x=function(e){return[{Header:"Act",accessor:"_id",Cell:function(e){return(0,c.jsxs)("div",{className:"btn-group",children:[(0,c.jsx)("button",{type:"button",className:"btn btn-default dropdown-toggle dropdown-icon","data-toggle":"dropdown",children:(0,c.jsx)("span",{className:"sr-only",children:"Toggle Dropdown"})}),(0,c.jsx)("div",{className:"dropdown-menu",role:"menu",children:(0,c.jsx)(i.rU,{className:"dropdown-item",to:"".concat(o).concat(d,"/").concat(e.cell.value),children:"Detail"})})]})}},{Header:"Name",accessor:"name"},{Header:"Subject",accessor:"subject"},{Header:"Terakhir Dikirim",accessor:"last_sent",Cell:function(e){if(console.log("asdfadsfdsf"+e.cell.value),!e.cell.value)return"-";var t=n()(e.cell.value);return t=t&&t.isValid()?t.format("YYYY-MM-DD HH:mm:ss"):"",(0,c.jsx)("span",{children:"".concat(t)})}}]};t.ZP={redirectAfterCreate:d,redirectAfterDelete:u,detailPageUrl:function(e){return"/".concat(s,"/detail/").concat(e)},upsertPageUrl:m,createNewButtonLabel:p,createPageTitle:"Buat Email Blast",listallPageTitle:g,detailPageTitle:h,detailService:_,listallService:y,deleteService:P,upsertService:b,fields:j,getColumns:x,listallPageUrl:f}},76514:function(e,t,a){a.d(t,{B:function(){return c}});var i=a(72791),l=a(16585),n=a(85545),r=a(80184);var c=function(e){var t=e.placeholder,a=e.textEditor,c=e.defaultValue,o=e.initValue,s=e.onChange,d=e.idElement,u=e.dataId;return(0,i.useEffect)((function(){if(console.log("valuevaluevalue initValue=>",o),console.log("valuevaluevalue id=>",u),a){"undefined"!==typeof u&&"undefined"!==typeof c&&(console.log("valuevaluevalue reloadddd=>",c),window.activateEditorV2({idElement:d,hostBackend:l.Z.hostBackend,at:(0,n.hP)(),cb:function(e){s(e)},isReset:false,defaultValue:c})),"undefined"===typeof u&&window.activateEditorV2({idElement:d,hostBackend:l.Z.hostBackend,at:(0,n.hP)(),cb:function(e){s(e)},isReset:false,defaultValue:c})}}),[c,u,d,s,a,o]),"undefined"===typeof u||u?(0,r.jsx)("div",{className:"row",children:(0,r.jsx)("div",{className:"col-12",children:(0,r.jsxs)("div",{style:{position:"relative"},children:[a&&(0,r.jsx)("div",{style:{backgroundColor:"black",position:"absolute",width:"100%",height:"100%",top:0},children:(0,r.jsx)("center",{children:(0,r.jsx)("span",{style:{color:"green",fontSize:30,marginTop:200},children:"Gambar sedang diupload..."})})}),(0,r.jsx)("div",{id:"texareaWrapper",style:{width:"100%",height:"100%",backgroundColor:"black",opacity:1},children:(0,r.jsx)("textarea",{className:"textarea",id:d,placeholder:t||"Isi keterangan",value:c,style:{width:"100%"},onChange:function(e){return s(e.target.value)}})})]})})}):null}}}]);
//# sourceMappingURL=6911.54f96042.chunk.js.map