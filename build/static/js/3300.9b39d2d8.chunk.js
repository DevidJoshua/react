"use strict";(self.webpackChunkprismatech_webapp=self.webpackChunkprismatech_webapp||[]).push([[3300],{43300:function(e,t,n){n.r(t);var a=n(29439),r=n(72791),i=n(60364),o=n(20890),l=n(64554),s=n(61889),c=n(71897),d=n(24518),u=n(2199),h=n(57621),m=n(9585),p=n(39504),v=n(72363),f=n(90493),Z=n(15021),x=n(76278),b=n(57064),g=n(94721),j=n(7169),k=n(77196),y=n(30829),C=n(63466),I=n(68096),S=n(46740),P=n(78881),_=n(16585),z=(n(9571),n(6688),n(94030),n(34606)),w=n(29748),F=n(20792),U=n(53817),L=n(68001),E=n(95518),M=n(11742),H=n(17819),V=n(80184),R={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,p:4};t.default=(0,i.$j)((function(e,t){var n=e.merchantsecretkey.key_id,a=e.myprofile.integration_params.key_id;return a=null===n?a:n,n=null===n?e.myprofile.integration_params.key_id:n,{merchantId:e.myprofile.merchant.id,merchantCode:e.myprofile.merchant.merchant_code,backendCallbackUrl:e.myprofile.integration_params.backend_callback_url,frontendCallbackUrl:e.myprofile.integration_params.frontend_callback_url,keyId:a,keyIdGenerated:n,loadingUpdateCurrentCallbackUrl:e.merchantkey.loadingUpdateCurrentCallbackUrl,isReloading:e.tablepagination.reloadDetail.settingsDevelopment}}),(function(e){return{resetMerchantSecretKey:function(t){return e(w.ZP.resetMerchantSecretKey(t))},tablePaginationSetReload:function(t){return e(M.ZP.setReloadDetail(t))},merchantkeyFetchCurrentMerchantKey:function(t){return e(z.ZP.merchantkeyFetchCurrentMerchantKey(t))},merchantkeyUpdateCurrentCallbackUrl:function(t){return e(z.ZP.merchantkeyUpdateCurrentCallbackUrl(t))}}}))((function(e){var t=e.loadingUpdateCurrentCallbackUrl,n=e.resetMerchantSecretKey,i=e.isReloading,z=e.tablePaginationSetReload,w=e.merchantkeyUpdateCurrentCallbackUrl,M=e.keyId,T=(e.keyIdGenerated,e.backendCallbackUrl),N=e.frontendCallbackUrl,D=e.merchantId,G=e.merchantCode,A=e.merchantkeyFetchCurrentMerchantKey;console.log("props=======>",e);var K=r.useState(!1),O=(0,a.Z)(K,2),B=O[0],W=O[1],q=(0,r.useState)(T),Q=(0,a.Z)(q,2),X=Q[0],Y=Q[1],$=(0,r.useState)(N),J=(0,a.Z)($,2),ee=J[0],te=J[1],ne=(0,r.useState)(M),ae=(0,a.Z)(ne,2),re=(ae[0],ae[1],function(){n({}),Y(T),te(N)}),ie=function(){return W(!1)};return(0,r.useEffect)((function(){A({})}),[i]),(0,r.useEffect)((function(){re()}),[T,N]),(0,r.useEffect)((function(){re(),!t&&B&&ie()}),[t]),(0,r.useEffect)((function(){z({serviceName:"settingsDevelopment",isReload:!1})}),[]),(0,V.jsxs)(P.Z,{pageTitle:"Setting Development",breadcrumb:[{title:"Beranda",link:_.Z.appHomePage},{title:"Setting Development",link:null,isActive:!0}],contentHeaderTitle:"Setting Development",isNeedLoggedin:!0,children:[(0,V.jsx)(l.Z,{sx:{flexGrow:1},children:(0,V.jsx)(s.ZP,{container:!0,spacing:1,children:(0,V.jsx)(s.ZP,{container:!0,item:!0,spacing:3,children:(0,V.jsx)(s.ZP,{item:!0,xs:12,children:(0,V.jsxs)(h.Z,{children:[(0,V.jsx)(m.Z,{title:(0,V.jsx)(o.Z,{variant:"h6",color:"textSecondary",children:"Integration Parameter"})}),(0,V.jsxs)(p.Z,{children:[(0,V.jsx)(l.Z,{sx:{width:"100%",maxWidth:360,bgcolor:"background.paper"},children:(0,V.jsx)("nav",{"aria-label":"main mailbox folders",children:(0,V.jsxs)(f.Z,{children:[(0,V.jsx)(Z.ZP,{disablePadding:!0,children:(0,V.jsxs)(x.Z,{children:[(0,V.jsx)(b.Z,{children:(0,V.jsx)(S.Z,{})}),(0,V.jsx)("a",{target:"_blank",rel:"noopener noreferrer",href:"https://docs.google.com/document/d/1_GTgzzzeFEEl2eiTHSLE4xNE6OAn63b1gTQmvYa7qVE/edit?usp=sharing",children:"Download Integration Document"})]})}),(0,V.jsx)(g.Z,{}),(0,V.jsx)(Z.ZP,{disablePadding:!0,children:(0,V.jsxs)(x.Z,{children:[(0,V.jsx)(b.Z,{children:(0,V.jsx)(j.Z,{})}),(0,V.jsx)("a",{target:"_blank",rel:"noopener noreferrer",href:"https://drive.google.com/file/d/12KeURz8gULCFVmsgnaIwXN6Xr1L_nC_a/view?usp=sharing",children:"Download Postman Collection"})]})}),(0,V.jsx)(Z.ZP,{disablePadding:!0,children:(0,V.jsxs)(x.Z,{children:[(0,V.jsx)(b.Z,{children:(0,V.jsx)(H.Z,{})}),(0,V.jsx)("a",{target:"_blank",rel:"noopener noreferrer",href:"https://docs.google.com/document/d/14cOcHEFLDMy9SkkE_Tg8yeUsjtSFZEUiBZp6joyTMnU/edit?usp=sharing",children:"FAQ"})]})})]})})}),(0,V.jsx)("br",{}),(0,V.jsxs)(l.Z,{component:"form",sx:{"& .MuiTextField-root":{m:1}},noValidate:!0,autoComplete:"off",children:[(0,V.jsxs)(I.Z,{fullWidth:!0,sx:{m:1},children:[(0,V.jsx)(y.Z,{htmlFor:"merchant_id",children:"Merchant Id"}),(0,V.jsx)(k.Z,{size:"small",id:"merchant_id",value:G,startAdornment:(0,V.jsx)(C.Z,{position:"start",children:(0,V.jsx)(E.Z,{})}),label:"Merchant Id",disabled:!0})]}),(0,V.jsxs)(I.Z,{fullWidth:!0,sx:{m:1},children:[(0,V.jsx)(y.Z,{htmlFor:"key_id",children:"Key Id"}),(0,V.jsx)(k.Z,{size:"small",id:"key_id",value:M,startAdornment:(0,V.jsx)(C.Z,{position:"start",children:(0,V.jsx)(U.Z,{})}),label:"Key Id",disabled:!0})]}),(0,V.jsxs)(I.Z,{fullWidth:!0,sx:{m:1},children:[(0,V.jsx)(y.Z,{htmlFor:"backend_callback_url",children:"Backend Callback Url"}),(0,V.jsx)(k.Z,{size:"small",id:"backend_callback_url",value:X,onChange:function(e){return Y(e.target.value)},startAdornment:(0,V.jsx)(C.Z,{position:"start",children:(0,V.jsx)(L.Z,{})}),label:"Backend Callback Url"})]}),(0,V.jsxs)(I.Z,{fullWidth:!0,sx:{m:1},children:[(0,V.jsx)(y.Z,{htmlFor:"frontend_callback_url",children:"Frontend Callback Url"}),(0,V.jsx)(k.Z,{size:"small",id:"frontend_callback_url",value:ee,onChange:function(e){return te(e.target.value)},startAdornment:(0,V.jsx)(C.Z,{position:"start",children:(0,V.jsx)(L.Z,{})}),label:"Frontend Callback Url"})]})]})]}),(0,V.jsxs)(v.Z,{children:[(0,V.jsxs)(u.Z,{disableElevation:!0,variant:"contained",children:[(0,V.jsx)(d.Z,{disabled:T===X&&N===ee,onClick:function(){return W(!0)},children:"Save"}),(0,V.jsx)(d.Z,{disabled:T===X&&N===ee,onClick:function(e){re()},children:"Cancel"})]}),(0,V.jsx)("div",{children:(0,V.jsx)(c.KT,{buttonTriggerLabel:"Generate Secret Key",serviceReference:"settingsDevelopment"})})]})]})})})})}),(0,V.jsx)(F.Z,{open:B,onClose:ie,"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:(0,V.jsxs)(h.Z,{sx:R,children:[(0,V.jsx)(m.Z,{title:"Confirmation"}),(0,V.jsx)(p.Z,{children:(0,V.jsx)(o.Z,{variant:"body2",color:"text.secondary",children:"Apakah anda yakin untuk ganti callback url ?"})}),(0,V.jsxs)(v.Z,{children:[(0,V.jsx)(d.Z,{variant:"contained",onClick:function(){return w({merchantId:""+D,backendCallbackUrl:X,frontendCallbackUrl:ee})},children:"Yes"}),(0,V.jsx)(d.Z,{color:"error",variant:"contained",onClick:ie,children:"No"})]})]})})]})}))},95518:function(e,t,n){var a=n(95318);t.Z=void 0;var r=a(n(45649)),i=n(80184),o=(0,r.default)((0,i.jsx)("path",{d:"M20 10V8h-4V4h-2v4h-4V4H8v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4zm-6 4h-4v-4h4v4z"}),"Grid3x3");t.Z=o},68001:function(e,t,n){var a=n(95318);t.Z=void 0;var r=a(n(45649)),i=n(80184),o=(0,r.default)((0,i.jsx)("path",{d:"M4.5 11h-2V9H1v6h1.5v-2.5h2V15H6V9H4.5v2zm2.5-.5h1.5V15H10v-4.5h1.5V9H7v1.5zm5.5 0H14V15h1.5v-4.5H17V9h-4.5v1.5zm9-1.5H18v6h1.5v-2h2c.8 0 1.5-.7 1.5-1.5v-1c0-.8-.7-1.5-1.5-1.5zm0 2.5h-2v-1h2v1z"}),"Http");t.Z=o},46740:function(e,t,n){var a=n(95318);t.Z=void 0;var r=a(n(45649)),i=n(80184),o=(0,r.default)((0,i.jsx)("path",{d:"M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 11.17-1.41 1.42L6 12l3.59-3.59L11 9.83 8.83 12 11 14.17zm1-9.92c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75zm2.41 11.34L13 14.17 15.17 12 13 9.83l1.41-1.42L18 12l-3.59 3.59z"}),"IntegrationInstructions");t.Z=o},17819:function(e,t,n){var a=n(95318);t.Z=void 0;var r=a(n(45649)),i=n(80184),o=(0,r.default)((0,i.jsx)("path",{d:"M19 2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 16h-2v-2h2v2zm2.07-7.75-.9.92C13.45 11.9 13 12.5 13 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"}),"LiveHelp");t.Z=o},7169:function(e,t,n){var a=n(95318);t.Z=void 0;var r=a(n(45649)),i=n(80184),o=(0,r.default)((0,i.jsx)("path",{d:"M19.8 18.4 14 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H9.04c-.42 0-.65.48-.39.81L10 6.5v4.17L4.2 18.4c-.49.66-.02 1.6.8 1.6h14c.82 0 1.29-.94.8-1.6z"}),"Science");t.Z=o},63466:function(e,t,n){n.d(t,{Z:function(){return k}});var a=n(4942),r=n(63366),i=n(87462),o=n(72791),l=n(28182),s=n(90767),c=n(14036),d=n(20890),u=n(93840),h=n(52930),m=n(47630),p=n(95159);function v(e){return(0,p.Z)("MuiInputAdornment",e)}var f,Z=(0,n(30208).Z)("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]),x=n(31402),b=n(80184),g=["children","className","component","disablePointerEvents","disableTypography","position","variant"],j=(0,m.ZP)("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["position".concat((0,c.Z)(n.position))],!0===n.disablePointerEvents&&t.disablePointerEvents,t[n.variant]]}})((function(e){var t=e.theme,n=e.ownerState;return(0,i.Z)({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:t.palette.action.active},"filled"===n.variant&&(0,a.Z)({},"&.".concat(Z.positionStart,"&:not(.").concat(Z.hiddenLabel,")"),{marginTop:16}),"start"===n.position&&{marginRight:8},"end"===n.position&&{marginLeft:8},!0===n.disablePointerEvents&&{pointerEvents:"none"})})),k=o.forwardRef((function(e,t){var n=(0,x.Z)({props:e,name:"MuiInputAdornment"}),a=n.children,m=n.className,p=n.component,Z=void 0===p?"div":p,k=n.disablePointerEvents,y=void 0!==k&&k,C=n.disableTypography,I=void 0!==C&&C,S=n.position,P=n.variant,_=(0,r.Z)(n,g),z=(0,h.Z)()||{},w=P;P&&z.variant,z&&!w&&(w=z.variant);var F=(0,i.Z)({},n,{hiddenLabel:z.hiddenLabel,size:z.size,disablePointerEvents:y,position:S,variant:w}),U=function(e){var t=e.classes,n=e.disablePointerEvents,a=e.hiddenLabel,r=e.position,i=e.size,o=e.variant,l={root:["root",n&&"disablePointerEvents",r&&"position".concat((0,c.Z)(r)),o,a&&"hiddenLabel",i&&"size".concat((0,c.Z)(i))]};return(0,s.Z)(l,v,t)}(F);return(0,b.jsx)(u.Z.Provider,{value:null,children:(0,b.jsx)(j,(0,i.Z)({as:Z,ownerState:F,className:(0,l.Z)(U.root,m),ref:t},_,{children:"string"!==typeof a||I?(0,b.jsxs)(o.Fragment,{children:["start"===S?f||(f=(0,b.jsx)("span",{className:"notranslate",children:"\u200b"})):null,a]}):(0,b.jsx)(d.Z,{color:"text.secondary",children:a})}))})}))},76278:function(e,t,n){var a=n(4942),r=n(63366),i=n(87462),o=n(72791),l=n(28182),s=n(90767),c=n(12065),d=n(47630),u=n(31402),h=n(95080),m=n(40162),p=n(42071),v=n(66199),f=n(34065),Z=n(80184),x=["alignItems","autoFocus","component","children","dense","disableGutters","divider","focusVisibleClassName","selected"],b=(0,d.ZP)(h.Z,{shouldForwardProp:function(e){return(0,d.FO)(e)||"classes"===e},name:"MuiListItemButton",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,n.dense&&t.dense,"flex-start"===n.alignItems&&t.alignItemsFlexStart,n.divider&&t.divider,!n.disableGutters&&t.gutters]}})((function(e){var t,n=e.theme,r=e.ownerState;return(0,i.Z)((t={display:"flex",flexGrow:1,justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",boxSizing:"border-box",textAlign:"left",paddingTop:8,paddingBottom:8,transition:n.transitions.create("background-color",{duration:n.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:n.palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},(0,a.Z)(t,"&.".concat(f.Z.selected),(0,a.Z)({backgroundColor:(0,c.Fq)(n.palette.primary.main,n.palette.action.selectedOpacity)},"&.".concat(f.Z.focusVisible),{backgroundColor:(0,c.Fq)(n.palette.primary.main,n.palette.action.selectedOpacity+n.palette.action.focusOpacity)})),(0,a.Z)(t,"&.".concat(f.Z.selected,":hover"),{backgroundColor:(0,c.Fq)(n.palette.primary.main,n.palette.action.selectedOpacity+n.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:(0,c.Fq)(n.palette.primary.main,n.palette.action.selectedOpacity)}}),(0,a.Z)(t,"&.".concat(f.Z.focusVisible),{backgroundColor:n.palette.action.focus}),(0,a.Z)(t,"&.".concat(f.Z.disabled),{opacity:n.palette.action.disabledOpacity}),t),r.divider&&{borderBottom:"1px solid ".concat(n.palette.divider),backgroundClip:"padding-box"},"flex-start"===r.alignItems&&{alignItems:"flex-start"},!r.disableGutters&&{paddingLeft:16,paddingRight:16},r.dense&&{paddingTop:4,paddingBottom:4})})),g=o.forwardRef((function(e,t){var n=(0,u.Z)({props:e,name:"MuiListItemButton"}),a=n.alignItems,c=void 0===a?"center":a,d=n.autoFocus,h=void 0!==d&&d,g=n.component,j=void 0===g?"div":g,k=n.children,y=n.dense,C=void 0!==y&&y,I=n.disableGutters,S=void 0!==I&&I,P=n.divider,_=void 0!==P&&P,z=n.focusVisibleClassName,w=n.selected,F=void 0!==w&&w,U=(0,r.Z)(n,x),L=o.useContext(v.Z),E={dense:C||L.dense||!1,alignItems:c,disableGutters:S},M=o.useRef(null);(0,m.Z)((function(){h&&M.current&&M.current.focus()}),[h]);var H=(0,i.Z)({},n,{alignItems:c,dense:E.dense,disableGutters:S,divider:_,selected:F}),V=function(e){var t=e.alignItems,n=e.classes,a=e.dense,r=e.disabled,o={root:["root",a&&"dense",!e.disableGutters&&"gutters",e.divider&&"divider",r&&"disabled","flex-start"===t&&"alignItemsFlexStart",e.selected&&"selected"]},l=(0,s.Z)(o,f.t,n);return(0,i.Z)({},n,l)}(H),R=(0,p.Z)(M,t);return(0,Z.jsx)(v.Z.Provider,{value:E,children:(0,Z.jsx)(b,(0,i.Z)({ref:R,component:j,focusVisibleClassName:(0,l.Z)(V.focusVisible,z),ownerState:H},U,{classes:V,children:k}))})}));t.Z=g},57064:function(e,t,n){var a=n(63366),r=n(87462),i=n(72791),o=n(28182),l=n(90767),s=n(47630),c=n(31402),d=n(96014),u=n(66199),h=n(80184),m=["className"],p=(0,s.ZP)("div",{name:"MuiListItemIcon",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,"flex-start"===n.alignItems&&t.alignItemsFlexStart]}})((function(e){var t=e.theme,n=e.ownerState;return(0,r.Z)({minWidth:56,color:t.palette.action.active,flexShrink:0,display:"inline-flex"},"flex-start"===n.alignItems&&{marginTop:8})})),v=i.forwardRef((function(e,t){var n=(0,c.Z)({props:e,name:"MuiListItemIcon"}),s=n.className,v=(0,a.Z)(n,m),f=i.useContext(u.Z),Z=(0,r.Z)({},n,{alignItems:f.alignItems}),x=function(e){var t=e.alignItems,n=e.classes,a={root:["root","flex-start"===t&&"alignItemsFlexStart"]};return(0,l.Z)(a,d.f,n)}(Z);return(0,h.jsx)(p,(0,r.Z)({className:(0,o.Z)(x.root,s),ownerState:Z,ref:t},v))}));t.Z=v}}]);
//# sourceMappingURL=3300.9b39d2d8.chunk.js.map