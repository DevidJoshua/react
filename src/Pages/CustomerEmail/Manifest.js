const entityName = 'CustomerEmail'
const entity = 'customeremail'
const serviceEntity = 'CustomerEmail'

export const redirectAfterCreate = '/' + entity + '/detail'
export const redirectAfterDelete = '/' + entity
export const detailPageUrl = (id) => (`/${entity}/detail/${id}`)
export const updatePageUrl = (id) => (`/${entity}/update/${id}`)
export const createPageUrl = ({ batchId }) => (`/${entity}/create/${batchId}`)
export const createNewButtonLabel = 'label-create_customer_email'
export const createPageTitle = 'label-create_customer_email'
export const listallPageTitle = 'Email Customer'
export const detailPageTitle = 'Detail Email Customer'
export const updatePageTitle = 'Update ' + entityName
export const createService = 'create' + serviceEntity
export const detailService = 'getDetail' + serviceEntity
export const updateService = 'update' + serviceEntity
export const listallService = 'getAll' + serviceEntity + 's'
export const listallByBatchIdService = 'getAll' + serviceEntity + 'sByBatchId'
export const deleteService = 'delete' + serviceEntity
export const fields = '_id,email,batch_id,created_at,updated_at,created_by{full_name},updated_by{full_name}'
export const getColumns = (history) => [
  // {
  //   Header: 'Act',
  //   accessor: '_id',
  //   Cell: p => (
  //     <div className='btn-group'>
  //       <button type='button' className='btn btn-default dropdown-toggle dropdown-icon' data-toggle='dropdown'>
  //         <span className='sr-only'>Toggle Dropdown</span>
  //       </button>
  //       <div className='dropdown-menu' role='menu'>
  //         <Link className='dropdown-item' to={`${basePath}${redirectAfterCreate}/${p.cell.value}`}>Detail</Link>
  //       </div>
  //     </div>)
  // },
  { Header: 'Email', accessor: 'email' }
]
export default {
  redirectAfterCreate,
  redirectAfterDelete,
  detailPageUrl,
  updatePageUrl,
  createPageUrl,
  createNewButtonLabel,
  createPageTitle,
  listallPageTitle,
  detailPageTitle,
  updatePageTitle,
  createService,
  detailService,
  updateService,
  listallService,
  listallByBatchIdService,
  deleteService,
  fields,
  getColumns
}
