import loadable from '@loadable/component'

// import CardWrapper from '../components/CardWrapper'

export const DetailCon = loadable(() => import('./DetailCon'))
export const TableCon = loadable(() => import('./TableCon'))
export const FilterTableCon = loadable(() => import('./FilterTableCon'))
// export const CardWrapperCon = CardWrapper

export { default as CardWrapperCon } from './CardWrapperCon'
export { default as SearchFieldCon } from './SearchFieldCon'
