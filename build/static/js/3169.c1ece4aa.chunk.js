"use strict";(self.webpackChunkprismatech_webapp=self.webpackChunkprismatech_webapp||[]).push([[3169],{63047:function(e,n,t){t.d(n,{AJ:function(){return f},N_:function(){return g},PI:function(){return j},PS:function(){return v},QE:function(){return M},Vi:function(){return N},XU:function(){return w},Yo:function(){return y},Yx:function(){return C},_W:function(){return k},_k:function(){return A},ny:function(){return x},oj:function(){return h},pi:function(){return _},t4:function(){return S},uX:function(){return b},wo:function(){return H}});t(72791);var r=t(91523),a=t(763),c=t.n(a),o=t(22673),i=t(16585),u=t(85545),d=t(72426),s=t.n(d),l=t(80184),p=i.Z.basePath,m="/account-number-detail",f="/all-bank-account",v=function(e){return"/form-account-number".concat(e?"/"+e:"")},b=function(){return"/all-bank-account"},h="All Bank Accounts",_="Need Approval Bank Accounts",k="Detail Bank Account",x="Form Account",y="getDetailBankAccountById",j="upsertAccountNumber",N="approveBankAccount",g="rejectBankAccount",A="getAllBankAccount",C="getAllNeedApprovalBankAccount",H="deleteBankAccountById",w={_id:!0,bank_code_id:{_id:!0,bank_code:!0},bank_code:!0,bank_name:!0,status:!0,description:!0,account_number:!0,created_at:!0,updated_at:!0,created_by:{_id:!0,full_name:!0,email:!0},validated_by:{_id:!0,full_name:!0,email:!0,updated_at:!0},approved_by:{_id:!0,email:!0,full_name:!0},account_name:!0},M=function(e){return[{Header:" ",accessor:"_id",Cell:function(e){return(0,l.jsxs)("div",{className:"btn-group",children:[(0,l.jsx)("button",{type:"button",className:"btn btn-default dropdown-toggle dropdown-icon","data-toggle":"dropdown",children:(0,l.jsx)("span",{className:"sr-only",children:"Toggle Dropdown"})}),(0,l.jsx)("div",{className:"dropdown-menu",role:"menu",children:(0,l.jsx)(r.rU,{className:"dropdown-item",to:"".concat(p).concat(m,"/").concat(e.cell.value),children:"Detail"})})]})}},{Header:"Account Name",accessor:function(e){return(0,u.Mp)(e.account_name)}},{Header:"Account Number",accessor:function(e){return(0,u.Mp)(e.account_number)}},{Header:"Bank Code",accessor:function(e){return(0,u.Mp)(e.bank_code)}},{Header:"Bank Name",accessor:function(e){return(0,u.Mp)(e.bank_name)}},{Header:"description",accessor:function(e){return(0,u.Mp)(e.description)}},{Header:"Status",accessor:function(e){return(0,u.Mp)(e.status)}},{Header:"created by",accessor:function(e){return(0,l.jsx)("span",{children:(0,u.Mp)((e.created_by||{}).full_name)})}},{Header:"approved by",accessor:"approved_by.full_name"}]},S=function(e){return[{Header:" ",accessor:"_id",Cell:function(e){return(0,l.jsxs)("div",{className:"btn-group",children:[(0,l.jsx)("button",{type:"button",className:"btn btn-default dropdown-toggle dropdown-icon","data-toggle":"dropdown",children:(0,l.jsx)("span",{className:"sr-only",children:"Toggle Dropdown"})}),(0,l.jsx)("div",{className:"dropdown-menu",role:"menu",children:(0,l.jsx)(r.rU,{className:"dropdown-item",to:"".concat(p).concat(m,"/").concat(e.cell.value),children:"Detail"})})]})}},{Header:"Receipt Name",accessor:function(e){return(0,u.Mp)(e.account_name)}},{Header:"Receipt Number",accessor:function(e){return(0,u.Mp)(e.account_number)}},{Header:"Bank Code",accessor:function(e){return(0,u.Mp)(e.bank_code)}},{Header:"Bank Name",accessor:function(e){return(0,u.Mp)(e.bank_name)}},{Header:"Description",accessor:function(e){return(0,u.Mp)(e.description)}},{Header:"Status",accessor:function(e){return(0,u.Mp)(e.status)}},{Header:"Validated by",accessor:function(e){return(0,l.jsx)("span",{children:(0,u.Mp)((e.validated_by||{}).full_name)})}},{Header:"Validated date",accessor:function(e){var n=s()(e.created_at),t=null===e.created_at||void 0===e.created_at?"-":n.format(i.Z.datetimeFormat);return(0,u.Mp)(t)}},{Header:"Created by",accessor:function(e){return(0,l.jsx)("span",{children:(0,u.Mp)(e.created_by||{}).full_name})}},{Header:"Created at",accessor:function(e){var n=s()(e.created_at),t=null===e.created_at||void 0===e.created_at?"-":n.format(i.Z.datetimeFormat);return(0,u.Mp)(t)}},{Header:"Updated at",accessor:function(e){var n=s()(e.updated_at),t=null===e.updated_at||void 0===e.updated_at?"-":n.format(i.Z.datetimeFormat);return(0,u.Mp)(t)}},{Header:"set",accessor:function(e){return c().has(e,"validated_by._id")?(0,l.jsx)(l.Fragment,{children:(0,l.jsx)("div",{className:"form-check",children:(0,l.jsx)(o.X0,{idComparison:e.validated_by._id,transactionId:e._id})})}):(0,l.jsx)(l.Fragment,{})}}]}},13169:function(e,n,t){t.r(n);var r,a=t(15671),c=t(43144),o=t(60136),i=t(54062),u=t(30168),d=t(72791),s=t(60364),l=(t(72426),t(78881)),p=t(81472),m=t(9571),f=t(63047),v=t(16585),b=t(17939),h=t(42220),_=t(80184),k=b.ZP.div(r||(r=(0,u.Z)([""]))),x=function(e){(0,o.Z)(t,e);var n=(0,i.Z)(t);function t(e){var r;return(0,a.Z)(this,t),(r=n.call(this,e)).state={columns:(0,f.t4)(e.history),startDate:e.startDate,endDate:e.endDate},r}return(0,c.Z)(t,[{key:"componentWillMount",value:function(){this.props.resetCheckbox()}},{key:"debounce",value:function(e,n,t){var r;return function(){var a=this,c=arguments,o=function(){r=null,t||e.apply(a,c)},i=t&&!r;clearTimeout(r),r=setTimeout(o,n),i&&e.apply(a,c)}}},{key:"render",value:function(){var e=this,n={serviceName:f.Yx,fields:f.XU},t=this.state.columns;return(0,_.jsx)(l.Z,{pageTitle:f.pi,breadcrumb:[{title:"Beranda",link:v.Z.appHomePage},{title:f.pi,link:null,isActive:!0}],contentHeaderTitle:f.pi,isNeedLoggedin:!0,children:(0,_.jsx)("div",{className:"row",children:(0,_.jsxs)("div",{className:"col-md-12",children:[(0,_.jsx)(k,{children:(0,_.jsx)(m.wn,{withoutCardHeader:!0,serviceName:n.serviceName,child:function(t){return(0,_.jsx)("div",{className:"form-group",children:(0,_.jsx)("div",{className:"d-flex justify-content-start",children:(0,_.jsx)("div",{class:"input-group mb-3 ml-3",style:{width:"40%"},children:(0,_.jsx)("input",{id:"account_number",type:"text",className:"form-control",placeholder:"Search",onChange:function(r){return e.debounce(t({serviceName:n.serviceName,fieldName:["account_number","account_name"],fieldValue:r.target.value}),2e3,!0)}})})})})}})}),(0,_.jsx)(m.iA,{listallServiceName:n.serviceName,fields:n.fields,columns:t,apiVersion:2,cardHeader:function(){return(0,_.jsx)(p.w,{apiver:2,rejectServiceEntity:f.N_,approveServiceEntity:f.Vi})}})]})})})}}]),t}(d.Component);n.default=(0,s.$j)((function(e,n){return{userPrivileges:e.myprofile.user_privileges}}),(function(e){return{resetCheckbox:function(){return e(h.ZP.needapprovalResetCheckbox())}}}))(x)},81472:function(e,n,t){t.d(n,{w:function(){return s}});var r=t(1413),a=(t(72791),t(60364)),c=t(1851),o=t(79271),i=t(42220),u=t(80184),d=function(e){var n=e.needapprovalCheckboxSubmitApprove,t=e.needapprovalCheckboxSubmitReject,r=e.needapprovalCheckbox,a=(e.loadingApprove,e.merchantId),c=e.history,o=e.entity,i=e.apiver,d=e.rejectServiceEntity,s=e.approveServiceEntity;return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("button",{type:"button",style:{marginLeft:5},className:"btn btn-success",onClick:function(){n({apiver:i,approveServiceEntity:s,needapprovalCheckbox:r,merchantId:a,entity:o,history:c})},children:[(0,u.jsx)("i",{className:"fas fa-check-circle"})," Approve"]}),(0,u.jsxs)("button",{type:"button",style:{marginLeft:5},className:"btn btn-danger",onClick:function(){t({apiver:i,rejectServiceEntity:d,needapprovalCheckbox:r,merchantId:a,entity:o,history:c})},children:[(0,u.jsx)("i",{className:"fas fa-window-close"})," Reject "]})]})},s=(0,a.$j)((function(e,n){return{merchantId:e.myprofile.merchant.id,loadingApprove:e.needapproval.loadingApprove,needapprovalCheckbox:e.needapproval.checkbox}}),(function(e){return{needapprovalCheckboxSubmitReject:function(n){return e(i.ZP.needapprovalCheckboxSubmitReject(n))},needapprovalCheckboxSubmitApprove:function(n){return e(i.ZP.needapprovalCheckboxSubmitApprove(n))}}}))((0,c.ZP)((function(e){var n=(0,o.k6)();return(0,u.jsx)(d,(0,r.Z)({history:n},e))})))}}]);
//# sourceMappingURL=3169.c1ece4aa.chunk.js.map