"use strict";(self.webpackChunkprismatech_webapp=self.webpackChunkprismatech_webapp||[]).push([[1735],{81735:function(e,n,r){r.r(n),r.d(n,{default:function(){return ee}});var t=r(29439),i=r(1413),o=r(4942),a=r(72791),s=r(64554),l=r(87112),c=r(24518),u=r(80911),d=r(23786),h=r(90493),p=r(94721),m=r(15021),g=r(57064),x=r(49900),Z=r(9953),j=r(47630),f=r(13967),w=r(13400),b=r(31009),v=r(38996),P=r(60173),C=r(21686),k=r(72606),D=r(1851),y=r(79271),M=r(68535),I=r(85172),U=r(76278),S=r(92955),L=r(763),F=r.n(L),A=r(80184);var T=r(60364),H=r(71579),E=(0,T.$j)((function(e,n){return{userMerchants:e.myprofile.user_merchants,merchant:e.myprofile.merchant}}),(function(e){return{myprofileChangeMerchant:function(n){return e(H.ZP.myprofileChangeMerchant(n))}}}))((0,D.ZP)((function(e){var n=e.userMerchants,r=e.merchant,i=e.myprofileChangeMerchant,o=a.useState(null),s=(0,t.Z)(o,2),l=s[0],c=s[1],p=a.useState(F().findIndex(n,{id:r.id})),m=(0,t.Z)(p,2),Z=m[0],j=m[1];return(0,A.jsxs)("div",{children:[(0,A.jsx)(h.Z,{component:"nav","aria-label":"Device settings",children:(0,A.jsxs)(U.Z,{"aria-haspopup":"true","aria-controls":"lock-menu","aria-label":"when device is locked",onClick:function(e){c(e.currentTarget)},children:[(0,A.jsx)(g.Z,{children:(0,A.jsx)(S.Z,{color:"menuDrawerIcon"})}),(0,A.jsx)(x.Z,{primary:(n||[]).length>0?"Merchant:":"Merchant: -",secondary:(n[Z]||{}).merchant_name})]})}),(n||[]).length>0&&(0,A.jsx)(u.Z,{id:"lock-menu",anchorEl:l,keepMounted:!0,open:Boolean(l),onClose:function(){c(null)},children:(n||[]).map((function(e,r){return(0,A.jsx)(d.Z,{selected:r===Z,onClick:function(e){return function(e,r){j(r),c(null),i({merchant:n[r]})}(0,r)},children:e.merchant_name},e.id)}))})]})}))),z=r(57830),_=r(16585),B=r(85545),R=r(54638),N=r(22885),q=r(81131),O=r(56125),W=r(66809),X=r(74568),K=_.Z.basePath;var Q=(0,D.ZP)((function(e){var n=e.title,r=e.submenu,i=e.homePageUrl,o=e.setHomePageUrl,s=e.userMerchantCode,l=e.userPrivileges,c=e.routeActive,u=e.appPatch,d=e.icon,p=e.toggleDrawerFlag,Z=(0,y.k6)(),j=a.useState(!1),f=(0,t.Z)(j,2),w=f[0],b=f[1];return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(W.Z,{title:n,disableHoverListener:p,disableFocusListener:p,disableTouchListener:p,children:(0,A.jsxs)(m.ZP,{button:!0,onClick:function(){b(!w)},children:[(0,A.jsxs)(g.Z,{children:[d&&d,!d&&(0,A.jsx)(C.Z,{color:"menuDrawerIcon"})]}),(0,A.jsx)(x.Z,{primary:n}),w?(0,A.jsx)(N.Z,{}):(0,A.jsx)(q.Z,{})]})}),(0,A.jsx)(O.Z,{in:w,timeout:"auto",unmountOnExit:!0,children:(0,A.jsx)(h.Z,{component:"div",disablePadding:!0,children:r.map((function(e,r){var t=(0,z.fx)(e.route)||{},a=(t.path||"").replace(":merchantId",s||"*"),d="".concat(K).concat(a);return l.includes(t.privName||a)?(i||o({homePageUrl:a}),(0,A.jsx)(W.Z,{title:t.title||e.title,disableHoverListener:p,disableFocusListener:p,disableTouchListener:p,children:(0,A.jsxs)(m.ZP,{button:!0,sx:{pl:4},selected:(c||"").startsWith(d),onClick:function(){u({routeActive:d,pageTitle:n}),Z.push(d)},children:[(0,A.jsx)(g.Z,{children:(0,A.jsx)(X.Z,{fontSize:"small",color:"menuDrawerIcon"})}),(0,A.jsx)(x.Z,{primary:(0,A.jsx)(k.Z,{id:t.title||e.title})})]},r)},r)):null}))})})]})})),$=_.Z.basePath,G=function(e){return{width:240,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen}),overflowX:"hidden"}},J=function(e){return(0,o.Z)({transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),overflowX:"hidden",width:"calc(".concat(e.spacing(7)," + 1px)")},e.breakpoints.up("sm"),{width:"calc(".concat(e.spacing(9)," + 1px)")})},V=(0,j.ZP)(Z.ZP,{shouldForwardProp:function(e){return"open"!==e}})((function(e){var n=e.theme,r=e.open;return(0,i.Z)((0,i.Z)({width:240,flexShrink:0,whiteSpace:"nowrap",boxSizing:"border-box"},r&&(0,i.Z)((0,i.Z)({},G(n)),{},{"& .MuiDrawer-paper":G(n)})),!r&&(0,i.Z)((0,i.Z)({},J(n)),{},{"& .MuiDrawer-paper":J(n)}))})),Y=(0,j.ZP)("div")((function(e){var n=e.theme;return(0,i.Z)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:n.spacing(0,1)},n.mixins.toolbar)}));var ee=(0,D.ZP)((function(e){e.isMerchantExists;var n=e.toggleDrawerFlag,r=e.setToggleDrawer,i=e.sidemenu,o=e.userPrivileges,Z=e.setHomePageUrl,j=e.homePageUrl,D=e.routeActive,U=e.appPatch,S=e.userMerchantCode,L=(e.currentMerchant,(0,y.k6)()),F=function(){r({toggleDrawer:!n})},T=function(e){return function(n){("keydown"!==n.type||"Tab"!==n.key&&"Shift"!==n.key)&&r({toggleDrawer:e})}},H=a.useState(null),N=(0,t.Z)(H,2),q=N[0],O=N[1],X=a.useState((0,B.L_)()),K=(0,t.Z)(X,2),G=K[0],J=K[1],ee=Boolean(q),ne=function(e){O(e.currentTarget)},re=function(e,n){O(null),n&&(J(n),(0,B.EQ)(n),window.location.href="production"===n?_.Z.reactAppBaseUrlProduction:_.Z.reactAppBaseUrlStaging)},te=(0,f.Z)(),ie=i.map((function(e,r){return!e.submenu&&e.route?function(e){var n=e.route,r=e.title,t=(e.liClass,e.icon),i=e.toggleDrawerFlag,a=(0,z.fx)(n)||{},s=a.path||"",l="".concat($).concat(s);return o.includes(a.privName||s)?(j||Z({homePageUrl:s}),console.log("test"),(0,A.jsx)(W.Z,{title:r,disableHoverListener:i,disableFocusListener:i,disableTouchListener:i,children:(0,A.jsxs)(m.ZP,{button:!0,onClick:function(){U({routeActive:l,pageTitle:r}),L.push(l)},selected:(D||"").startsWith(l),children:[(0,A.jsx)(g.Z,{children:t||(0,A.jsx)(C.Z,{})}),(0,A.jsx)(x.Z,{primary:(0,A.jsx)(k.Z,{id:a.title||r})})]},n)})):null}({route:e.route,title:e.title,liClass:e.iconClassName||"nav-icon fas fa-tachometer-alt",icon:e.icon,toggleDrawerFlag:n}):o.includes(e.userPrivilegeCode)?(0,A.jsx)(Q,{toggleDrawerFlag:n,title:e.title,submenu:e.submenu,homePageUrl:j,setHomePageUrl:Z,userMerchantCode:S,userPrivileges:o,routeActive:D,appPatch:U,icon:e.icon},r):null}));return a.useEffect((function(){r({toggleDrawer:!1})}),[]),(0,A.jsxs)(A.Fragment,{children:[P.tq&&(0,A.jsxs)(l.Z,{id:"plink-drawer",anchor:"left",open:n,onClose:T(!1),onOpen:T(!0),children:[(0,A.jsxs)(Y,{children:[(0,A.jsx)("img",{style:{height:30},src:R.Z.LogoRp}),(0,A.jsx)(c.Z,{style:{width:120,fontSize:"13px",color:"white"},id:"basic-button","aria-controls":ee?"basic-menu":void 0,"aria-haspopup":"true","aria-expanded":ee?"true":void 0,onClick:ne,size:"small",endIcon:(0,A.jsx)(I.Z,{}),children:G}),(0,A.jsxs)(u.Z,{id:"basic-menu",anchorEl:q,open:ee,onClose:function(e){return re(0,null)},MenuListProps:{"aria-labelledby":"basic-button"},children:[(0,A.jsx)(d.Z,{onClick:function(e){return re(0,"staging")},children:"Staging"}),(0,A.jsx)(d.Z,{onClick:function(e){return re(0,"production")},children:"Production"})]}),(0,A.jsx)(w.Z,{onClick:F,children:"rtl"===te.direction?(0,A.jsx)(v.Z,{color:"menuDrawerIcon"}):(0,A.jsx)(b.Z,{color:"menuDrawerIcon"})})]}),(0,A.jsx)(p.Z,{color:"menuDrawerIcon"}),o.includes("6")&&(0,A.jsx)(E,{}),(0,A.jsx)(p.Z,{color:"menuDrawerIcon"}),(0,A.jsx)(s.Z,{role:"presentation",onKeyDown:T(!1),children:(0,A.jsxs)(h.Z,{children:[ie,o.includes("main-menu-user-management")&&(0,A.jsx)(Q,{icon:(0,A.jsx)(M.Z,{color:"menuDrawerIcon"}),title:"User Management",submenu:[{route:"/user",title:"User"},{route:"/role",title:"Role"},{route:"/privilege",title:"Privilege"}],homePageUrl:j,setHomePageUrl:Z,userMerchantCode:S,userPrivileges:o,routeActive:D,appPatch:U})]})})]}),!P.tq&&(0,A.jsxs)(V,{id:"plink-drawer",anchor:"left",variant:"permanent",open:n,onClose:T(!1),children:[(0,A.jsxs)(Y,{children:[(0,A.jsx)("img",{style:{height:30},src:R.Z.LogoRp}),(0,A.jsx)(c.Z,{style:{width:120,fontSize:"13px",color:"white"},id:"basic-button","aria-controls":ee?"basic-menu":void 0,"aria-haspopup":"true","aria-expanded":ee?"true":void 0,onClick:o.includes("admin")?null:ne,size:"small",endIcon:o.includes("admin")?null:(0,A.jsx)(I.Z,{}),children:o.includes("admin")?"Admin":G}),(0,A.jsxs)(u.Z,{id:"basic-menu",anchorEl:q,open:ee,onClose:function(e){return re(0,null)},MenuListProps:{"aria-labelledby":"basic-button"},children:[(0,A.jsx)(d.Z,{onClick:function(e){return re(0,"staging")},children:"Staging"}),(0,A.jsx)(d.Z,{onClick:function(e){return re(0,"production")},children:"Production"})]}),(0,A.jsx)(w.Z,{onClick:F,children:"rtl"===te.direction?(0,A.jsx)(v.Z,{color:"menuDrawerIcon"}):(0,A.jsx)(b.Z,{color:"menuDrawerIcon"})})]}),(0,A.jsx)(p.Z,{color:"menuDrawerIcon"}),o.includes("6")&&(0,A.jsx)(E,{}),(0,A.jsx)(p.Z,{color:"menuDrawerIcon"}),(0,A.jsx)(s.Z,{children:(0,A.jsxs)(h.Z,{children:[ie,o.includes("main-menu-user-management")&&(0,A.jsx)(Q,{icon:(0,A.jsx)(M.Z,{color:"menuDrawerIcon"}),title:"User Management",submenu:[{route:"/user",title:"User"},{route:"/role",title:"Role"},{route:"/privilege",title:"Privilege"}],homePageUrl:j,setHomePageUrl:Z,userMerchantCode:S,userPrivileges:o,routeActive:D,appPatch:U})]})})]})]})}))}}]);
//# sourceMappingURL=1735.59093eb3.chunk.js.map