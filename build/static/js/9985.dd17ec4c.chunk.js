"use strict";(self.webpackChunkprismatech_webapp=self.webpackChunkprismatech_webapp||[]).push([[9985],{19985:function(n,e,i){i.r(e);var t=i(4942),a=i(1413),o=i(29439),r=i(72791),s=i(60364),l=(i(763),i(54270)),d=i(18178),c=i(16585),u=i(85545),p=i(43401),h=i(61889),m=i(10703),g=i(20890),v=i(64554),f=i(48550),Z=i(63466),b=i(24518),x=i(15725),j=i(40501),P=i(44281),k=i(45083),y=i(39709),L=i(80184),E=c.Z.basePath;e.default=(0,s.$j)((function(n,e){return{loading:n.signup.loading,isLoggedIn:p.pE.isLoggedIn(n.login),userPrivileges:n.myprofile.user_privileges}}),(function(n){return{signupRequest:function(e){return n(d.ZP.signupRequest(e))},loginCheckLogin:function(e){return n(p.ZP.loginCheckLogin(e))}}}))((function(n){var e=n.signupRequest,i=n.history,s=n.loading,d=n.loginCheckLogin,p=(0,x.y)(),w=r.useState({history:i,email:"",full_name:"",business_name:""}),z=(0,o.Z)(w,2),S=z[0],C=z[1],I=r.useState({email:"",full_name:"",business_name:""}),_=(0,o.Z)(I,2);_[0],_[1],r.useEffect((function(){d({})}),[]);var R=function(n,e){C((0,a.Z)((0,a.Z)({},S),{},(0,t.Z)({},e,n.target.value)))};return!0===(0,u.jl)(n.isLoggedIn)&&n.userPrivileges.length>0?window.open("".concat(E).concat(c.Z.appHomePage),"_self",!0):(console.log("return component"),(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)(l.Z,{children:(0,L.jsx)("title",{children:"Plink Dashboard"})}),(0,L.jsx)(h.ZP,{className:p.root,container:!0,children:(0,L.jsxs)(m.Z,{elevation:8,className:p.paperBox,children:[(0,L.jsx)(g.Z,{className:p.pageTitle,fontWeight:"fontWeightBold",variant:"h4",children:"Signup"}),(0,L.jsxs)(v.Z,{container:!0,className:p.boxRegister,children:[(0,L.jsx)(f.Z,{disabled:s,onChange:function(n){return R(n,"email")},label:"Email",placeholder:"JohnDuke@gmail.com",margin:"normal",variant:"outlined",InputProps:{startAdornment:(0,L.jsxs)(Z.Z,{position:"start",children:[" ",(0,L.jsx)(P.Z,{})," "]})}}),(0,L.jsx)(f.Z,{disabled:s,onChange:function(n){return R(n,"full_name")},label:"Nama Lengkap",placeholder:"John Duke",margin:"normal",variant:"outlined",InputProps:{startAdornment:(0,L.jsxs)(Z.Z,{position:"start",children:[" ",(0,L.jsx)(j.Z,{}),"  "]})}}),(0,L.jsx)(f.Z,{disabled:s,onChange:function(n){return R(n,"business_name")},label:"Nama Bisnis",placeholder:"Toko kelontong",margin:"normal",variant:"outlined",InputProps:{startAdornment:(0,L.jsxs)(Z.Z,{position:"start",children:[" ",(0,L.jsx)(k.Z,{})," "]})}}),(0,L.jsx)(y.Z,{style:{marginTop:"2rem",marginBottom:"0.5rem"},variant:"contained",loading:s,fullwidth:!0,onClick:function(){e(S)},disabled:""===S.full_name||""===S.email||""===S.business_name,children:"Submit"}),(0,L.jsx)(g.Z,{align:"center",children:"OR"}),(0,L.jsx)(b.Z,{style:{marginTop:"0.5rem"},variant:"outlined",fullwidth:!0,onClick:function(){i.push("/login")},children:"Login "})]})]})})]}))}))},15725:function(n,e,i){i.d(e,{y:function(){return o}});var t=i(70478),a=i(50427),o=(0,t.Z)((function(n){return{root:{height:"100vh",backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(to right, #26D0CE, #1A2980)"},paperBox:{},boxRegister:{display:"flex",flexDirection:"column",padding:"2rem"},pageTitle:{fontWeight:800,paddingTop:"3rem",paddingLeft:"2rem",color:a.Z[900]}}}))},44281:function(n,e,i){var t=i(95318);e.Z=void 0;var a=t(i(45649)),o=i(80184),r=(0,a.default)((0,o.jsx)("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"}),"Email");e.Z=r},40501:function(n,e,i){var t=i(95318);e.Z=void 0;var a=t(i(45649)),o=i(80184),r=(0,a.default)((0,o.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");e.Z=r},45083:function(n,e,i){var t=i(95318);e.Z=void 0;var a=t(i(45649)),o=i(80184),r=(0,a.default)((0,o.jsx)("path",{d:"M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"}),"Store");e.Z=r},63466:function(n,e,i){i.d(e,{Z:function(){return P}});var t=i(4942),a=i(63366),o=i(87462),r=i(72791),s=i(28182),l=i(90767),d=i(14036),c=i(20890),u=i(93840),p=i(52930),h=i(47630),m=i(95159);function g(n){return(0,m.Z)("MuiInputAdornment",n)}var v,f=(0,i(30208).Z)("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]),Z=i(31402),b=i(80184),x=["children","className","component","disablePointerEvents","disableTypography","position","variant"],j=(0,h.ZP)("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:function(n,e){var i=n.ownerState;return[e.root,e["position".concat((0,d.Z)(i.position))],!0===i.disablePointerEvents&&e.disablePointerEvents,e[i.variant]]}})((function(n){var e=n.theme,i=n.ownerState;return(0,o.Z)({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:e.palette.action.active},"filled"===i.variant&&(0,t.Z)({},"&.".concat(f.positionStart,"&:not(.").concat(f.hiddenLabel,")"),{marginTop:16}),"start"===i.position&&{marginRight:8},"end"===i.position&&{marginLeft:8},!0===i.disablePointerEvents&&{pointerEvents:"none"})})),P=r.forwardRef((function(n,e){var i=(0,Z.Z)({props:n,name:"MuiInputAdornment"}),t=i.children,h=i.className,m=i.component,f=void 0===m?"div":m,P=i.disablePointerEvents,k=void 0!==P&&P,y=i.disableTypography,L=void 0!==y&&y,E=i.position,w=i.variant,z=(0,a.Z)(i,x),S=(0,p.Z)()||{},C=w;w&&S.variant,S&&!C&&(C=S.variant);var I=(0,o.Z)({},i,{hiddenLabel:S.hiddenLabel,size:S.size,disablePointerEvents:k,position:E,variant:C}),_=function(n){var e=n.classes,i=n.disablePointerEvents,t=n.hiddenLabel,a=n.position,o=n.size,r=n.variant,s={root:["root",i&&"disablePointerEvents",a&&"position".concat((0,d.Z)(a)),r,t&&"hiddenLabel",o&&"size".concat((0,d.Z)(o))]};return(0,l.Z)(s,g,e)}(I);return(0,b.jsx)(u.Z.Provider,{value:null,children:(0,b.jsx)(j,(0,o.Z)({as:f,ownerState:I,className:(0,s.Z)(_.root,h),ref:e},z,{children:"string"!==typeof t||L?(0,b.jsxs)(r.Fragment,{children:["start"===E?v||(v=(0,b.jsx)("span",{className:"notranslate",children:"\u200b"})):null,t]}):(0,b.jsx)(c.Z,{color:"text.secondary",children:t})}))})}))}}]);
//# sourceMappingURL=9985.dd17ec4c.chunk.js.map