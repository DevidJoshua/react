import loadable from '@loadable/component'
import Card from './CardWrapper'
export const MultiselectCheckboxDisplay = loadable(() => import('./MultiselectCheckboxDisplay'))
export const MultiselectCheckbox = loadable(() => import('./MultiselectCheckbox'))
export const Multiselect = loadable(() => import('./Multiselect'))
export const Combobox = loadable(() => import('./Combobox'))
export const Create = loadable(() => import('./Create'))
export const Detail = loadable(() => import('./Detail'))
export const Update = loadable(() => import('./Update'))
export const Filter = loadable(() => import('./Filter'))
export const Table = loadable(() => import('./Table'))
export const FilteringTable = loadable(() => import('./FilteringTable'))
export const TableViewTable = loadable(() => import('./TableViewTable'))
export const Chart = loadable(() => import('./Chart'))
export const CardWrapper = Card
export { default as OverlaySpin } from './OverlaySpin'
export { default as SearchField } from './SearchField'

// export default {
//   MultiselectCheckboxDisplay,
//   MultiselectCheckbox,
//   Multiselect,
//   Combobox,
//   Create,
//   Detail,
//   Update,
//   Filter,
//   Table
// }

// export { default as MultiselectCheckboxDisplay } from MultiselectCheckboxDisplay
// export { default as MultiselectCheckbox } from './MultiselectCheckbox'
// export { default as Multiselect } from './Multiselect'
// export { default as Combobox } from './Combobox'
// export { default as Create } from './Create'
// export { default as Detail } from './Detail'
// export { default as Update } from './Update'
// export { default as Filter } from './Filter'
// export { default as Table } from './Table'
