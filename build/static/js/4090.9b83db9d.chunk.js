"use strict";(self.webpackChunkprismatech_webapp=self.webpackChunkprismatech_webapp||[]).push([[4090],{40519:function(e,t,r){r.d(t,{AJ:function(){return u},O_:function(){return b},PI:function(){return x},PS:function(){return m},Pu:function(){return w},XU:function(){return P},Yo:function(){return _},_W:function(){return g},dV:function(){return h},ny:function(){return j},oj:function(){return p},uX:function(){return f},wo:function(){return v}});r(72791);var n=r(91523),a=r(763),i=r.n(a),l=r(16585),d=r(80184),c=l.Z.basePath,o="category",s="/category/detail",u="/"+o,m=function(e){return"/".concat(o,"/upsert").concat(e?"/"+e:"")},f=function(){return"/".concat(o)},h="Buat Kategori Baru",p="Kategori",g="Detail Kategori",j="Form Category",_="getDetailCategory",x="upsertCategory",b="getAllCategorys",v="deleteCategory",P="_id,title,toko_id{_id, name},parent_id{_id, title},created_at,updated_at,created_by{full_name},updated_by{full_name}",w=function(e){return[{Header:" ",accessor:"_id",Cell:function(e){return(0,d.jsxs)("div",{className:"btn-group",children:[(0,d.jsx)("button",{type:"button",className:"btn btn-default dropdown-toggle dropdown-icon","data-toggle":"dropdown",children:(0,d.jsx)("span",{className:"sr-only",children:"Toggle Dropdown"})}),(0,d.jsx)("div",{className:"dropdown-menu",role:"menu",children:(0,d.jsx)(n.rU,{className:"dropdown-item",to:"".concat(c).concat(s,"/").concat(e.cell.value),children:"Detail"})})]})}},{Header:"Kategori",accessor:"title"},{Header:"Induk",accessor:"parent_id.title"},{Header:"Toko",accessor:"toko_id",Cell:function(e){var t=(i().map(e.cell.value||[],(function(e,t){return e.name}))||[]).join(", ");return(0,d.jsx)("span",{children:"".concat(t)})}}]};t.ZP={redirectAfterCreate:s,redirectAfterDelete:u,detailPageUrl:function(e){return"/".concat(o,"/detail/").concat(e)},upsertPageUrl:m,createNewButtonLabel:h,createPageTitle:"Buat Kategori",listallPageTitle:p,detailPageTitle:g,detailService:_,listallService:b,deleteService:v,upsertService:x,fields:P,getColumns:w,listallPageUrl:f}},14090:function(e,t,r){r.r(t);r(72791);var n=r(1851),a=r(763),i=r.n(a),l=r(9571),d=r(78881),c=r(40519),o=r(72426),s=r.n(o),u=r(16585),m=r(80184),f=function(e){var t=e.dataDetail,r=e.formTitle,n=s()(t.created_at||0);n=n&&n.isValid()?n.format("YYYY-MM-DD HH:mm:ss"):"";var a=s()(t.updated_at||0);return a=a&&a.isValid()?a.format("YYYY-MM-DD HH:mm:ss"):"",(0,m.jsx)(m.Fragment,{children:(0,m.jsx)("div",{className:"row",children:(0,m.jsx)("div",{className:"col-sm-6",children:(0,m.jsx)(l.As,{formTitle:r,children:(0,m.jsxs)("dl",{children:[(0,m.jsx)("dt",{children:"Judul"}),(0,m.jsx)("dd",{children:t.title}),(0,m.jsx)("dt",{children:"Toko Online"}),(0,m.jsx)("dd",{children:(i().map(t.toko_id||[],(function(e,t){return e.name}))||[]).join(", ")}),(0,m.jsx)("dt",{children:"Kategori Induk"}),(0,m.jsx)("dd",{children:(t.parent_id||{}).title||"-"}),(0,m.jsx)("dt",{children:"Diperbaharui Oleh"}),(0,m.jsx)("dd",{children:(t.updated_by||{}).full_name||""}),(0,m.jsx)("dt",{children:"Dibuat Oleh"}),(0,m.jsx)("dd",{children:(t.created_by||{}).full_name||""}),(0,m.jsx)("dt",{children:"Tanggal Pembuatan"}),(0,m.jsx)("dd",{children:n}),(0,m.jsx)("dt",{children:"Tanggal Diperbaharui"}),(0,m.jsx)("dd",{children:a})]})})})})})};t.default=(0,n.ZP)((function(e){var t=e.match,r=e.history;return(0,m.jsx)(d.Z,{pageTitle:c._W,breadcrumb:[{title:"Beranda",link:u.Z.appHomePage},{title:c.oj,link:(0,c.uX)()},{title:c._W,link:null,isActive:!0}],contentHeaderTitle:c._W,isNeedLoggedin:!0,children:(0,m.jsx)("div",{className:"row",children:(0,m.jsx)("div",{className:"col-md-12",children:(0,m.jsx)(l.F,{detailServiceName:c.Yo,deleteServiceName:c.wo,fields:c.XU,id:t.params._id,formTitle:c._W,redirectAfterDelete:c.AJ,updatePageUrl:(0,c.PS)(t.params._id),createPageUrl:(0,c.PS)(),withoutWrapper:!0,children:(0,m.jsx)(f,{formTitle:c._W,history:r,match:t})})})})})}))}}]);
//# sourceMappingURL=4090.9b83db9d.chunk.js.map