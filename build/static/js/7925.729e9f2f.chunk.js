"use strict";(self.webpackChunkprismatech_webapp=self.webpackChunkprismatech_webapp||[]).push([[7925],{66605:function(e,t,a){a.d(t,{AJ:function(){return s},G9:function(){return u},O_:function(){return w},Pg:function(){return N},Pu:function(){return j},UU:function(){return m},XU:function(){return T},Yo:function(){return x},_W:function(){return h},dV:function(){return g},oj:function(){return v},r4:function(){return f},wo:function(){return b},x6:function(){return _},yG:function(){return p}});a(72791);var n=a(91523),r=a(72426),c=a.n(r),i=a(16585),l=a(80184),o=i.Z.basePath,d="tag",u="/tag/detail",s="/tag",m=function(e){return"/".concat(d,"/detail/").concat(e)},p=function(e){return"/".concat(d,"/update/").concat(e)},f=function(){return"/".concat(d,"/create")},g="Create New Tag",v="Tags",h="Tag Detail",_="Update Tag",x="getDetailTag",N="updateTag",w="getAllTags",b="deleteTag",T="_id,name,created_at,updated_at,created_by{full_name},updated_by{full_name}",j=function(e){return[{Header:"Act",accessor:"_id",Cell:function(e){return(0,l.jsxs)("div",{className:"btn-group",children:[(0,l.jsx)("button",{type:"button",className:"btn btn-default dropdown-toggle dropdown-icon","data-toggle":"dropdown",children:(0,l.jsx)("span",{className:"sr-only",children:"Toggle Dropdown"})}),(0,l.jsx)("div",{className:"dropdown-menu",role:"menu",children:(0,l.jsx)(n.rU,{className:"dropdown-item",to:"".concat(o).concat(u,"/").concat(e.cell.value),children:"Detail"})})]})}},{Header:"name",accessor:"name"},{Header:"created_at",accessor:"created_at",Cell:function(e){var t=c()(e.cell.value);return t=t&&t.isValid()?t.format("YYYY-MM-DD HH:mm:ss"):"",(0,l.jsx)("span",{children:"".concat(t)})}},{Header:"updated_at",accessor:"updated_at",Cell:function(e){var t=c()(e.cell.value);return t=t&&t.isValid()?t.format("YYYY-MM-DD HH:mm:ss"):"",(0,l.jsx)("span",{children:"".concat(t)})}},{Header:"created by",accessor:"created_by.full_name"},{Header:"updated by",accessor:"updated_by.full_name"}]};t.ZP={redirectAfterCreate:u,redirectAfterDelete:s,detailPageUrl:m,updatePageUrl:p,createPageUrl:f,createNewButtonLabel:g,createPageTitle:"Create New Tag",listallPageTitle:v,detailPageTitle:h,updatePageTitle:_,createService:"createTag",detailService:x,updateService:N,listallService:w,deleteService:b,fields:T,getColumns:j}},27925:function(e,t,a){a.r(t);var n=a(15671),r=a(43144),c=a(60136),i=a(54062),l=a(72791),o=a(9571),d=a(78881),u=a(1851),s=a(48298),m=a(16585),p=a(57830),f=a(66605),g=a(80184),v={serviceName:f.Yo,updateServiceName:f.Pg,fields:f.XU},h=function(e){(0,c.Z)(a,e);var t=(0,i.Z)(a);function a(e){var r;return(0,n.Z)(this,a),(r=t.call(this,e)).state={},r}return(0,r.Z)(a,[{key:"componentDidMount",value:function(){var e=this.props.appPatch,t=(p.lp[window.location.pathname]||{}).title;e(t?{routeActive:window.location.pathname,pageTitle:t}:{routeActive:window.location.pathname,pageTitle:f.x6})}},{key:"render",value:function(){var e=this.props.match;return(0,g.jsx)(d.Z,{pageTitle:f.x6,breadcrumb:[{title:"Home",link:m.Z.appHomePage},{title:f._W,link:(0,f.UU)(e.params._id),isActive:!0},{title:f.x6,link:null,isActive:!0}],contentHeaderTitle:f.x6,isNeedLoggedin:!0,children:(0,g.jsx)("div",{className:"row",children:(0,g.jsx)("div",{className:"col-md-12",children:(0,g.jsx)(o.BN,{id:e.params._id,cancelHref:(0,f.UU)(e.params._id),formTitle:f.x6,paginationConfig:v,redirectAfterCreate:f.G9,child:function(e,t,a){return(0,g.jsx)("div",{className:"row",children:(0,g.jsx)("div",{className:"col-sm-6",children:(0,g.jsxs)("div",{className:"form-group",children:[(0,g.jsx)("label",{htmlFor:"name",children:"name"}),(0,g.jsx)("input",{type:"text",className:"form-control",id:"name",placeholder:"Enter name",value:(0,s.Z)([v.serviceName,"name"],a)||(0,s.Z)([v.serviceName,"name"],t)||"",onChange:function(t){return e({serviceName:v.serviceName,fieldName:"name",fieldValue:t.target.value})}})]})})})}})})})})}}]),a}(l.Component);t.default=(0,u.ZP)(h)}}]);
//# sourceMappingURL=7925.729e9f2f.chunk.js.map