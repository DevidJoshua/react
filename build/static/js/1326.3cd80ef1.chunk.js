"use strict";(self.webpackChunkprismatech_webapp=self.webpackChunkprismatech_webapp||[]).push([[1326],{21326:function(e,a,t){t.r(a);var n=t(4942),i=t(1413),r=t(15671),o=t(43144),l=t(60136),s=t(54062),c=t(72791),d=t(60364),m=t(79271),p=t(72606),u=t(1851),g=t(38626),b=t(11742),f=t(80184),h=function(e){(0,l.Z)(t,e);var a=(0,s.Z)(t);function t(){return(0,r.Z)(this,t),a.apply(this,arguments)}return(0,o.Z)(t,[{key:"render",value:function(){var e=this.props,a=e.tablepaginationOnChangeForm,t=e.payload;return(0,e.child)(a,t)}}]),t}(c.PureComponent),v=c.memo((function(e){console.log("render Create.js");var a=(0,m.k6)(),t=e.paginationConfig,r=e.child,o=e.tablepaginationOnChangeForm,l=e.formTitle,s=e.tablepaginationSubmitForm,d=e.payload,u=e.redirectAfterCreate,b=e.redirectAfterCreateToParent,v=e.footerCard,N=e.tablepaginationResetForm,y=e.onSubmit,C=e.isNeedValidation,j=e.beforeSubmit,x=e.children,F=e.tablepaginationSetloading,Z=e.loading||!1;(0,c.useEffect)((function(){return console.log("useEffect========="),function(){N({serviceName:t.serviceName})}}),[N,t.serviceName]),console.log("Createform=========");var S=c.Children.map(x,(function(e){return c.isValidElement(e)?c.cloneElement(e,{tablepaginationOnChangeForm:o,payload:d}):e}));return(0,f.jsx)(f.Fragment,{children:(0,f.jsx)("form",{id:t.serviceName,onSubmit:function(e){var r=document.getElementById(t.serviceName);e&&e.preventDefault(),C&&(!1===r.checkValidity()&&e.stopPropagation(),r.classList.add("was-validated")),y?y({tablepaginationSubmitForm:s,payload:d}):(F({serviceName:t.serviceName,isLoading:!0}),j?j((function(e){var r=(0,n.Z)({},t.serviceName,(0,i.Z)((0,i.Z)({},d[t.serviceName]),e));s({fields:t.fields,payload:r,serviceName:t.serviceName,history:a,redirectAfterCreate:u,redirectAfterCreateToParent:b})})):s({fields:t.fields,payload:d,serviceName:t.serviceName,history:a,redirectAfterCreate:u,redirectAfterCreateToParent:b}))},noValidate:!0,className:C&&"needs-validation",children:(0,f.jsxs)("div",{className:"card",children:[(0,f.jsxs)("div",{className:"card-header","data-card-widget":"collapse",children:[(0,f.jsx)("h3",{className:"card-title",children:(0,f.jsx)(p.Z,{id:l})}),(0,f.jsx)("div",{className:"card-tools",children:(0,f.jsx)("button",{type:"button",className:"btn btn-tool myCardWidget","data-card-widget":"collapse",children:(0,f.jsx)("i",{className:"fas fa-minus"})})})]}),(0,f.jsxs)("div",{className:"card-body",children:[r&&(0,f.jsx)(h,{child:r,payload:d,tablepaginationOnChangeForm:o}),!r&&S]}),(0,f.jsxs)("div",{className:"card-footer",children:[Z&&(0,f.jsx)(g.Z,{loading:!0,type:"rpmerah"}),!Z&&v&&v({tablepaginationSubmitForm:s,payload:d}),!Z&&!v&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("button",{disabled:Z,style:{width:100},type:"button",className:"btn bg-gradient-warning",onClick:function(e){return a.goBack()},children:"Cancel"}),(0,f.jsx)("button",{disabled:Z,style:{width:100,marginLeft:5},type:"submit",className:"btn bg-gradient-primary",children:"Submit"})]})]})]})})})}));a.default=(0,d.$j)((function(e,a){var t=e.tablepagination.loading[a.paginationConfig.serviceName]||!1;return{payload:e.tablepagination.payload[a.paginationConfig.serviceName]||{},loading:t}}),(function(e){return{tablepaginationSetloading:function(a){return e(b.ZP.tablepaginationSetloading(a))},tablepaginationOnChangeForm:function(a){return e(b.ZP.tablepaginationOnChangeForm(a))},tablepaginationSubmitForm:function(a){return e(b.ZP.tablepaginationSubmitForm(a))},tablepaginationResetForm:function(a){return e(b.ZP.tablepaginationResetForm(a))}}}))((0,u.ZP)(v))}}]);
//# sourceMappingURL=1326.3cd80ef1.chunk.js.map