import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Images } from '../../Themes'
import { getSession } from '../../Utils/Utils'
import ContentWrapper from '../../Components/Layout/ContentWrapper'
import AppConfig from '../../Config/AppConfig'

class PageMerchantMyprofile extends Component {
  componentDidMount () {
    const merchant_id = getSession('merchant_id')
    console.log('merchant id di page profile>>>>>', merchant_id)
    // this.props.fetchRelateInstitution({ merchant_id })
  }

  render () {
    const { profile } = this.props
    return (
      <ContentWrapper
        pageTitle='Profil Saya'
        breadcrumb={[{ title: 'Beranda', link: AppConfig.appHomePage }, { title: 'Profil Saya', link: null, isActive: true }]}
        contentHeaderTitle='Profil Saya'
        isNeedLoggedin
      >
        <div className='row'>
          <div className='col-md-4'>
            <div className='card card-primary'>
              <div className='card-body'>
                <strong className='float-right'>
                  {/* <i className="fas fa-pencil-alt mr-1"/> */}
                </strong>
                {/* <div className='text-center'>
                  <img alt='-' className='profile-user-img img-fluid img-circle' src={Images.LogoRp} />
                </div> */}
                <h3 className='profile-username text-center'>{profile.full_name}</h3>
                <div className='card-body'>
                  {/* <div style={{ width: '100%' }}>
                    <strong>
                      <i className="fas fa-store mr-1"/>
                                Bisnis Saya
                    </strong>
                    <strong className='float-right'>
                      <i className="fas fa-pencil-alt mr-1"/>
                    </strong>
                  </div> */}
                  <p className='text-muted'>
                    {profile.business_name}
                  </p>
                  <hr />

                  <div style={{ width: '100%' }}>
                    <strong>
                      {/* <i className="fas fa-envelope mr-1"/> */}
                                Email
                    </strong>
                    <strong className='float-right'>
                      {/* <i className="fas fa-pencil-alt mr-1" onClick={()=>alert("To change email click cog icon at the corner top then click my account")}/> */}
                    </strong>
                  </div>
                  <p className='text-muted'>
                    {profile.email}
                  </p>
                  <hr />
                  <div style={{ width: '100%' }}>
                    <strong>
                      {/* <i className="fas fa-envelope mr-1"/> */}
                                Role
                    </strong>
                    <strong className='float-right'>
                      {/* <i className="fas fa-pencil-alt mr-1" onClick={()=>alert("To change email click cog icon at the corner top then click my account")}/> */}
                    </strong>
                  </div>
                  <p className='text-muted'>
                    {profile.role}
                  </p>
                  <hr />

                  {/* <div style={{ width: '100%' }}>
                    <strong><i className='fas fa-map-marker-alt mr-1' />Alamat</strong>
                    <strong className='float-right'>
                      <i className="fas fa-pencil-alt mr-1"/>
                    </strong>
                  </div> */}
                  {/* <p className='text-muted'>{profile.address}</p> */}

                  {/* <hr/>

                        <strong><i className="far fa-file-alt mr-1"/>
                          Notes</strong>
                        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Etiam fermentum enim neque.</p> */}
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-8' />
        </div>
      </ContentWrapper>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.myprofile
    // insitutions: state.merchantrelatedinstitution.related_institutions
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // fetchRelateInstitution: data => dispatch(RelatedActions.fetchRelatedInstitution(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PageMerchantMyprofile)
