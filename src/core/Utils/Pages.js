// import React from 'react'
import loadable from '@loadable/component'
// --- import list page entity ---
import _ from 'lodash'

import { pages } from '../../manifest'
// import { merge } from 'ramda'
// import PageHome from '../Pages/Home/PageHome'
import LoginPageContainer from '../Pages/Login/PageLogin'
// const LoginPageContainer = loadable(() => import('../Pages/Login/PageLogin'))
// import PageCheckStatusPayment from '../Pages/CheckStatusPayment/PageCheckStatusPayment'
// const PageCheckStatusPayment = loadable(() => import('../Pages/CheckStatusPayment/PageCheckStatusPayment'))
// import ForgetPassword from '../Pages/ForgetPassword/ForgetPassword'
const ForgetPassword = loadable(() => import('../Pages/ForgetPassword/ForgetPassword'))
// import MyAccount from '../Pages/MyAccount/PageMyAccount'
const MyAccount = loadable(() => import('../Pages/MyAccount/PageMyAccount'))
// import MyProfile from '../Pages/MyProfile/PageMyProfile'
const MyProfile = loadable(() => import('../Pages/MyProfile/PageMyProfile'))
// import PageSignup from '../Pages/Signup/PageSignup'
const PageSignup = loadable(() => import('../Pages/Signup/PageSignup'))
const PageSignupAdmin = loadable(() => import('../Pages/Signup/PageSignupAdmin'))
// import PageUser from '../Pages/User/PageUser'
const PageUser = loadable(() => import('../Pages/User/PageUser'))
// import PageDetailUser from '../Pages/User/PageDetailUser'
const PageDetailUser = loadable(() => import('../Pages/User/PageDetailUser'))
// role
// import PageListRole from '../Pages/Role/PageRole'
const PageListRole = loadable(() => import('../Pages/Role/PageRole'))
// import PageDetailRole from '../Pages/Role/DetailRole'
const PageDetailRole = loadable(() => import('../Pages/Role/DetailRole'))
// import PageUpdateRole from '../Pages/Role/PageUpdateRole'
const PageUpdateRole = loadable(() => import('../Pages/Role/PageUpdateRole'))
// import PageCreateRole from '../Pages/Role/PageCreateRole'
// const PageCreateRole = loadable(() => import('../Pages/Role/PageCreateRole'))

// privilege
// import PageListPrivilege from '../Pages/Privilege/PageCreatePrivilege'
// import PageCreatePrivilege from '../Pages/Privilege/PageCreatePrivilege'
// const PageCreatePrivilege = loadable(() => import('../Pages/Privilege/PageCreatePrivilege'))
// import PageUpdatePrivilege from '../Pages/Privilege/PageUpdatePrivilege'
const PageUpdatePrivilege = loadable(() => import('../Pages/Privilege/PageUpdatePrivilege'))
// import PageDetailPrivilege from '../Pages/Privilege/PageDetailPrivilege'
const PageDetailPrivilege = loadable(() => import('../Pages/Privilege/PageDetailPrivilege'))
// import PageListPrivilege from '../Pages/Privilege/PageDetailPrivilege'
const PageListPrivilege = loadable(() => import('../Pages/Privilege/PageList'))

// // Toko Product
// import PageListProduct from '../Pages/Product/PageList'
// import PageCreateProduct from '../Pages/Product/PageCreate'
// import PageDetailProduct from '../Pages/Product/PageDetail'
// import PageUpdateProduct from '../Pages/Product/PageUpdate'

// Tag
// import PageListTag from '../Pages/Tag/PageList'
const PageListTag = loadable(() => import('../Pages/Tag/PageList'))
// import PageCreateTag from '../Pages/Tag/PageCreate'
// const PageCreateTag = loadable(() => import('../Pages/Tag/PageCreate'))
// import PageDetailTag from '../Pages/Tag/PageDetail'
const PageDetailTag = loadable(() => import('../Pages/Tag/PageDetail'))
// import PageUpdateTag from '../Pages/Tag/PageUpdate'
const PageUpdateTag = loadable(() => import('../Pages/Tag/PageUpdate'))
const PageChangePassword = loadable(() => import('../Pages/ForgetPassword/ChangePassword'))
const createPage = ({ entity, entityTitle, ListAllComp, CreateComp, DetailComp, UpdateComp, params, privName }) => ({
  ['/' + entity]: { route: '/' + entity, path: `/${entity}${params && params[2] ? '/' + params[2] : ''}${params && params[1] ? '/' + params[1] : ''}`, title: entityTitle, component: ListAllComp, privName: privName ? privName + 'a' : null },
  // ['/' + entity + '/create']: { route: '/' + entity + '/create', path: `/${entity}/create${params && params[2] ? '/' + params[2] : ''}${params && params[1] ? '/' + params[1] : ''}`, title: 'Buat ' + entityTitle + '', component: CreateComp },
  ['/' + entity + '/detail']: { route: '/' + entity + '/detail', path: `/${entity}/detail${params && params[2] ? '/' + params[2] : ''}${params && params[1] ? '/' + params[1] : ''}${params && params[0] ? '/' + params[0] : ''}`, title: '' + entityTitle, component: DetailComp, privName: privName ? privName + 'b' : null },
  ['/' + entity + '/upsert']: { route: '/' + entity + '/upsert', path: `/${entity}/upsert${params && params[2] ? '/' + params[2] : ''}${params && params[1] ? '/' + params[1] : ''}${params && params[0] ? '/' + params[0] : ''}`, title: '' + entityTitle, component: UpdateComp, privName: privName ? privName + 'c' : null }
})

const externalPages = () => {
  let x = {}
  pages.forEach(v => {
    if (v.entity === undefined) x = { ...x, ...v }
    else x = { ...x, ...createPage(v) }
  })
  return x
}

export const lp = {
  // '/dashboard-ecomm': { route: '/dashboard-ecomm', path: '/dashboard-ecomm', title: 'Plink Market Dashboard', component: PageHome },
  // '/dashboard-lms': { route: '/dashboard-lms', path: '/dashboard-lms', title: 'LMS Dashboard', component: PageHome },
  // '/dashboard-rpay': { route: '/dashboard-rpay', path: '/dashboard-rpay', title: 'RP Dashboard', component: PageHome },
  // '/home': { route: '/home', path: '/home', title: 'Beranda', component: PageHome },
  '/login': { route: '/login', path: '/login', title: 'Login', component: LoginPageContainer, isPublic: true, srcx: 'src/core/Pages' },
  '/signup': { route: '/signup', path: '/signup', title: 'Signup', component: PageSignup, isPublic: true, srcx: 'src/core/Pages' },
  '/signup-admin': { route: '/signup-admin', path: '/signup-admin', title: 'Signup Admin', component: PageSignupAdmin, isPublic: true, srcx: 'src/core/Pages' },
  '/forget-password': { route: '/forget-password', path: '/forget-password', title: 'Forget Password', component: ForgetPassword, isPublic: true, srcx: 'src/core/Pages' },
  '/change-password': { route: '/change-password', path: '/change-password/:token', title: 'Change Password', component: PageChangePassword, isPublic: true, srcx: 'src/core/Pages' },
  '/my-account': { route: '/my-account', path: '/my-account', title: 'Akun Saya', component: MyAccount, srcx: 'src/core/Pages', privName: '2' }, // table privilages kolom name = '2'
  '/my-profile': { route: '/my-profile', path: '/my-profile', title: 'Profil Saya', component: MyProfile, srcx: 'src/core/Pages' },
  '/user': { route: '/user', path: '/user', title: 'User', component: PageUser },
  '/use/detail': { route: '/user/detail', path: '/user/detail/:_id', title: 'User Detail', component: PageDetailUser },
  // '/cek-satus-pembayaran': { route: '/cek-satus-pembayaran', path: '/cek-satus-pembayaran', title: 'Cek Status Pembayaran', component: PageCheckStatusPayment, isPublic: true },
  // lms course
  // ...createPage({ entity: 'course', entityTitle: 'Course', ListAllComp: PageListCourse, CreateComp: PageCreateCourse, UpdateComp: PageUpdateCourse, DetailComp: PageDetailCourse, params: [':_id'] }),
  // lms grading
  // ...createPage({ entity: 'grading', entityTitle: 'Grading', CreateComp: PageCreateGrading, UpdateComp: PageUpdateGrading, DetailComp: PageDetailGrading, params: [':_id', ':course_id'] }),
  // '/published-course': { route: '/published-course', path: '/published-course', component: PagePublishedCourse },
  // lms subject
  // ...createPage({ entity: 'subject', entityTitle: 'Subject', CreateComp: PageCreateSubject, UpdateComp: PageUpdateSubject, DetailComp: PageDetailSubject, params: [':_id', ':course_id'] }),
  // lms subject unit
  // ...createPage({ entity: 'subject-unit', entityTitle: 'Subject Unit', CreateComp: PageCreateSubjectUnit, UpdateComp: PageUpdateSubjectUnit, DetailComp: PageDetailSubjectUnit, params: [':_id', ':subject_id', ':course_id'] }),
  // lms student
  // ...createPage({ entity: 'student', entityTitle: 'Student', ListAllComp: PageListStudent, params: [':_id'] }),
  // tag
  ...createPage({ entity: 'tag', entityTitle: 'Tag', ListAllComp: PageListTag, UpdateComp: PageUpdateTag, DetailComp: PageDetailTag, params: [':_id'] }),
  // toko product
  // ...createPage({ entity: 'product', entityTitle: 'Produk', ListAllComp: PageListProduct, CreateComp: PageCreateProduct, UpdateComp: PageUpdateProduct, DetailComp: PageDetailProduct, params: [':_id'] }),
  // category
  // ...createPage({ entity: 'category', entityTitle: 'Kategori', ListAllComp: PageListCategory, CreateComp: PageCreateCategory, UpdateComp: PageUpdateCategory, DetailComp: PageDetailCategory, params: [':_id'] }),
  // toko online
  // ...createPage({ entity: 'tokoonline', entityTitle: 'Plink Market', ListAllComp: PageListTokoOnline, CreateComp: PageCreateTokoOnline, UpdateComp: PageUpdateTokoOnline, DetailComp: PageDetailTokoOnline, params: [':_id'] }),
  // role
  ...createPage({ entity: 'role', entityTitle: 'Role', ListAllComp: PageListRole, UpdateComp: PageUpdateRole, DetailComp: PageDetailRole, params: [':_id?'] }),
  // privilege
  ...createPage({ entity: 'privilege', entityTitle: 'Privilege', ListAllComp: PageListPrivilege, UpdateComp: PageUpdatePrivilege, DetailComp: PageDetailPrivilege, params: [':_id?'] }),
  // toko team
  // ...createPage({ entity: 'tokoteam', entityTitle: 'Toko Team', ListAllComp: PageListTokoTeam, CreateComp: PageCreateTokoTeam, UpdateComp: PageUpdateTokoTeam, DetailComp: PageDetailTokoTeam, params: [':_id', ':toko_id'] }),
  // toko po
  // ...createPage({ entity: 'purchaseorder', entityTitle: 'Data Pembelian', ListAllComp: PageListTokoPo, DetailComp: PageDetailTokoPo, params: [':_id'] }),
  // toko inventory
  // ...createPage({ entity: 'inventory', entityTitle: 'Inventaris', ListAllComp: PageListTokoInventory, DetailComp: PageDetailTokoInventory, params: [':_id'] }),
  ...externalPages()
}
const authorizedPathList = []
// console.log('lp====>', lp)

export const pageList = _.map(lp, (v) => v)
export const getPage = (pageId) => lp[pageId] || {}
export const setAuthorizedPathList = (path) => authorizedPathList.push(path)
export const getAuthorizedPathList = () => authorizedPathList
