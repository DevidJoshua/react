"use strict";(self.webpackChunkprismatech_webapp=self.webpackChunkprismatech_webapp||[]).push([[9911],{63047:function(e,n,t){t.d(n,{AJ:function(){return f},N_:function(){return N},PI:function(){return k},PS:function(){return _},QE:function(){return P},Vi:function(){return y},XU:function(){return D},Yo:function(){return v},Yx:function(){return H},_W:function(){return x},_k:function(){return A},ny:function(){return g},oj:function(){return b},pi:function(){return j},t4:function(){return M},uX:function(){return h},wo:function(){return w}});t(72791);var a=t(91523),r=t(763),c=t.n(r),d=t(22673),o=t(16585),i=t(85545),u=t(72426),s=t.n(u),l=t(80184),m=o.Z.basePath,p="/account-number-detail",f="/all-bank-account",_=function(e){return"/form-account-number".concat(e?"/"+e:"")},h=function(){return"/all-bank-account"},b="All Bank Accounts",j="Need Approval Bank Accounts",x="Detail Bank Account",g="Form Account",v="getDetailBankAccountById",k="upsertAccountNumber",y="approveBankAccount",N="rejectBankAccount",A="getAllBankAccount",H="getAllNeedApprovalBankAccount",w="deleteBankAccountById",D={_id:!0,bank_code_id:{_id:!0,bank_code:!0},bank_code:!0,bank_name:!0,status:!0,description:!0,account_number:!0,created_at:!0,updated_at:!0,created_by:{_id:!0,full_name:!0,email:!0},validated_by:{_id:!0,full_name:!0,email:!0,updated_at:!0},approved_by:{_id:!0,email:!0,full_name:!0},account_name:!0},P=function(e){return[{Header:" ",accessor:"_id",Cell:function(e){return(0,l.jsxs)("div",{className:"btn-group",children:[(0,l.jsx)("button",{type:"button",className:"btn btn-default dropdown-toggle dropdown-icon","data-toggle":"dropdown",children:(0,l.jsx)("span",{className:"sr-only",children:"Toggle Dropdown"})}),(0,l.jsx)("div",{className:"dropdown-menu",role:"menu",children:(0,l.jsx)(a.rU,{className:"dropdown-item",to:"".concat(m).concat(p,"/").concat(e.cell.value),children:"Detail"})})]})}},{Header:"Account Name",accessor:function(e){return(0,i.Mp)(e.account_name)}},{Header:"Account Number",accessor:function(e){return(0,i.Mp)(e.account_number)}},{Header:"Bank Code",accessor:function(e){return(0,i.Mp)(e.bank_code)}},{Header:"Bank Name",accessor:function(e){return(0,i.Mp)(e.bank_name)}},{Header:"description",accessor:function(e){return(0,i.Mp)(e.description)}},{Header:"Status",accessor:function(e){return(0,i.Mp)(e.status)}},{Header:"created by",accessor:function(e){return(0,l.jsx)("span",{children:(0,i.Mp)((e.created_by||{}).full_name)})}},{Header:"approved by",accessor:"approved_by.full_name"}]},M=function(e){return[{Header:" ",accessor:"_id",Cell:function(e){return(0,l.jsxs)("div",{className:"btn-group",children:[(0,l.jsx)("button",{type:"button",className:"btn btn-default dropdown-toggle dropdown-icon","data-toggle":"dropdown",children:(0,l.jsx)("span",{className:"sr-only",children:"Toggle Dropdown"})}),(0,l.jsx)("div",{className:"dropdown-menu",role:"menu",children:(0,l.jsx)(a.rU,{className:"dropdown-item",to:"".concat(m).concat(p,"/").concat(e.cell.value),children:"Detail"})})]})}},{Header:"Receipt Name",accessor:function(e){return(0,i.Mp)(e.account_name)}},{Header:"Receipt Number",accessor:function(e){return(0,i.Mp)(e.account_number)}},{Header:"Bank Code",accessor:function(e){return(0,i.Mp)(e.bank_code)}},{Header:"Bank Name",accessor:function(e){return(0,i.Mp)(e.bank_name)}},{Header:"Description",accessor:function(e){return(0,i.Mp)(e.description)}},{Header:"Status",accessor:function(e){return(0,i.Mp)(e.status)}},{Header:"Validated by",accessor:function(e){return(0,l.jsx)("span",{children:(0,i.Mp)((e.validated_by||{}).full_name)})}},{Header:"Validated date",accessor:function(e){var n=s()(e.created_at),t=null===e.created_at||void 0===e.created_at?"-":n.format(o.Z.datetimeFormat);return(0,i.Mp)(t)}},{Header:"Created by",accessor:function(e){return(0,l.jsx)("span",{children:(0,i.Mp)(e.created_by||{}).full_name})}},{Header:"Created at",accessor:function(e){var n=s()(e.created_at),t=null===e.created_at||void 0===e.created_at?"-":n.format(o.Z.datetimeFormat);return(0,i.Mp)(t)}},{Header:"Updated at",accessor:function(e){var n=s()(e.updated_at),t=null===e.updated_at||void 0===e.updated_at?"-":n.format(o.Z.datetimeFormat);return(0,i.Mp)(t)}},{Header:"set",accessor:function(e){return c().has(e,"validated_by._id")?(0,l.jsx)(l.Fragment,{children:(0,l.jsx)("div",{className:"form-check",children:(0,l.jsx)(d.X0,{idComparison:e.validated_by._id,transactionId:e._id})})}):(0,l.jsx)(l.Fragment,{})}}]}},49911:function(e,n,t){t.r(n);var a=t(72791),r=t(1851),c=t(763),d=t.n(c),o=t(9571),i=t(78881),u=t(63047),s=t(6688),l=t(72426),m=t.n(l),p=t(16585),f=(t(94030),t(784)),_=t(79271),h=t(60364),b=t(11742),j=t(48298),x=t(80184),g=function(e){var n=e.dataDetail,t=e.formTitle,r=(e.match,e.id),c=m()(n.created_at||0);c=c&&null!==n.created_at?c.format("YYYY-MM-DD HH:mm:ss"):"-";var i=m()(n.updated_at||0);i=i&&null!==n.updated_at?i.format("YYYY-MM-DD HH:mm:ss"):"-";s.ZP.listallService,s.ZP.fields;var u=(0,_.k6)();return a.useEffect((function(){(d().isUndefined(r)||d().isNull(r))&&u.push("/all-bank-account")}),[]),console.log("bank name",n),(0,x.jsx)(x.Fragment,{children:(0,x.jsx)("div",{className:"row",children:(0,x.jsx)("div",{className:"col-sm-10",children:(0,x.jsx)(o.As,{formTitle:t,children:(0,x.jsxs)("dl",{children:[(0,x.jsx)("dt",{children:"Account number"}),(0,x.jsx)("dd",{children:n.account_number}),(0,x.jsx)("dt",{children:"Account Name"}),(0,x.jsx)("dd",{children:n.account_name}),(0,x.jsx)("dt",{children:"Status"}),(0,x.jsx)("dd",{children:n.status}),(0,x.jsx)("hr",{}),(0,x.jsx)("dt",{children:"Keterangan"}),(0,x.jsx)("dd",{children:n.description}),(0,x.jsx)("hr",{}),(0,x.jsx)("dt",{children:"Bank Code"}),(0,x.jsx)("dd",{children:(0,j.Z)(["bank_code_id","bank_code"],n)||"-"}),(0,x.jsx)("dt",{children:"Nama Bank"}),(0,x.jsx)("dd",{children:n.bank_name||"-"}),(0,x.jsx)("hr",{}),(0,x.jsx)("dt",{children:"Dibuat oleh"}),(0,x.jsx)("dd",{children:(0,j.Z)(["created_by","full_name"],n)||"-"}),(0,x.jsx)("dt",{children:"Tanggal Pembuatan"}),(0,x.jsx)("dd",{children:c}),(0,x.jsx)("dt",{children:"Tanggal Diperbaharui"}),(0,x.jsx)("dd",{children:i})]})})})})})};n.default=(0,r.ZP)((function(e){var n=e.match,t=e.history;console.log("detaill>>>>>>>",n);var r=n.params._id,c=String((0,h.v9)((function(e){return e.myprofile.merchant.id}))),d=(0,h.v9)((function(e){return e.myprofile.user_id})),s=(0,h.I0)();return a.useEffect((function(){s(b.ZP.setDeletePayload({id:r,merchant_id:c,user_id:d}))}),[]),(0,x.jsx)(i.Z,{pageTitle:u._W,breadcrumb:[{title:"Beranda",link:p.Z.appHomePage},{title:u.oj,link:(0,u.uX)()},{title:u._W,link:null,isActive:!0}],contentHeaderTitle:u._W,isNeedLoggedin:!0,children:(0,x.jsx)("div",{className:"row",children:(0,x.jsx)("div",{className:"col-md-12",children:(0,x.jsx)(o.F,{detailServiceName:u.Yo,deleteServiceName:u.wo,fields:u.XU,id:n.params._id,formTitle:u._W,redirectAfterDelete:u.AJ,updatePageUrl:(0,u.PS)(n.params._id),createPageUrl:(0,u.PS)(),withoutWrapper:!0,apiVersion:2,buttonAction:function(e){var a=e.dataDetail;return(0,x.jsx)(f.k,{history:t,id:n.params._id,dataDetail:a,deleteService:u.wo,upsertPageUrl:u.PS})},children:(0,x.jsx)(g,{formTitle:u._W,history:t,match:n})})})})})}))},784:function(e,n,t){t.d(n,{k:function(){return s},w:function(){return u}});var a=t(1413),r=(t(72791),t(60364)),c=t(1851),d=t(79271),o=t(80184),i=function(e){e.needapprovalCheckboxSubmitApprove,e.needapprovalCheckboxSubmitReject,e.needapprovalCheckbox,e.loadingApprove,e.merchantId;var n=e.history;return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("button",{type:"button",className:"btn btn-warning",onClick:function(){return n.push("/form-account-number")},children:[(0,o.jsx)("i",{className:"fas fa-plus"})," Create New "]})})},u=(0,r.$j)((function(e,n){return{}}),(function(e){return{}}))((0,c.ZP)((function(e){var n=(0,d.k6)();return(0,o.jsx)(i,(0,a.Z)({history:n},e))}))),s=(0,r.$j)((function(e,n){return{merchantId:e.myprofile.merchant.id,userId:e.myprofile.user_id}}),(function(e){return{}}))((0,c.ZP)((function(e){var n=e.history,t=e.id,a=e.dataDetail,r=(e.merchantId,e.deleteService),c=e.upsertPageUrl,d=e.userId;return(0,o.jsxs)(o.Fragment,{children:[a&&("NEED_APPROVAL"===a.status||"REJECTED"===a.status)&&(a.created_by||{})._id===d&&r&&(0,o.jsx)("button",{style:{width:100},type:"button",className:"btn bg-gradient-danger","data-toggle":"modal","data-target":"#modal-danger",children:"Hapus"}),a&&("NEED_APPROVAL"===a.status||"REJECTED"===a.status)&&(a.created_by||{})._id===d&&c(t)&&(0,o.jsx)("button",{style:{width:100,marginLeft:5},onClick:function(){return n.push(c(t))},type:"button",className:"btn bg-gradient-primary",children:"Ubah"}),a&&c()&&(0,o.jsx)("button",{style:{width:100,marginLeft:5},onClick:function(){return n.push(c())},type:"button",className:"btn bg-gradient-info",children:"Buat"})]})})))}}]);
//# sourceMappingURL=9911.1d408ae3.chunk.js.map