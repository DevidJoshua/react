import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import ContentWrapper from 'core/Components/Layout/ContentWrapper'
import AppConfig from 'core/Config/AppConfig'
import TablePaginationActions from '../../core/features/TablePagination/redux'
import MerchantKeyActions from 'features/merchantKey/redux'
import {Skeleton} from '@mui/material'
import GetStartedStep1 from './Forms/IndexStep1'
import GetStartedStep2 from './Forms/IndexStep2'
import GetStartedStep3 from './Forms/IndexStep3'
import GetStartedStep4 from './Forms/IndexStep4'
import GetStartedStep5 from './Forms/IndexStep5'
import GetStartedStep6 from './Forms/IndexStep6'
import GetStartedActions from '../../features/GetStarted/redux'
import GetStartedNav from './GetStartedNav'
import GetStartedSelectMerchantCategory from './GetStartedSelectMerchantCategory'
import _ from 'lodash'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

function Comp(props) {
  const {
    reset,
    getStartedMerchantCategory,
    fetchStep2KycFormData,
    fetchStep3KycFormData,
    fetchStep4KycFormData,
    fetchStep5KycFormData,
    fetchStep6KycFormData,
    kycProgress,
    stepTabLoading,
    fetchKycProgress,
    uploadKycDocument,
    stepLoading,
    step2KycFormData,
    step3KycFormData,
    step4KycFormData,
    step5KycFormData,
    step6KycFormData,
    submitKycStep2,
    submitKycStep3,
    submitKycStep4,
    submitKycStep5,
    submitKycStep6,
    merchantId
  } = props
  const [step,setStep] = React.useState(1)
  const CardSkeleton = (
    <Skeleton variant="rectangular" width="100%" height="100%"></Skeleton>
  )
  const pageTitle = (step = null) =>{
      const title = {
        step0:{
          perusahaan:{
            nav:'Setup Merchant Category',
            section:'Setup Merchant Category'
          }, 
          individual:{
            nav:'Setup Merchant Category',
            section:'Setup Merchant Category'
          }
        },
        step1:{
          perusahaan:{
            nav:'Explore Prismalink',
            section:'Explore Prismalink'
          }, 
          individual:{
            nav:'Explore Prismalink',
            section:'Explore Prismalink'
          }
        },
        step2:{
          perusahaan:{
            nav:'Business Detail',
            section:'Explore Prismalink'
          }, 
          individual:{
            nav:'Business Detail',
            section:'Explore Prismalink'
          }
        },
        step3:{
          perusahaan:{
            nav:'Data Perusahaan',
            section:'Data Perusahaan'
          }, 
          individual:{
            nav:'Data Perusahaan',
            section:'Data Perusahaan'
          }
        },
        step4:{
          perusahaan:{
            nav:'Dokumen Merchant',
            section:'Dokumen Merchant'
          }, 
          individual:{
            nav:'Dokumen Merchant',
            section:'Dokumen Merchant'
          }
        },
        step5:{
          perusahaan:{
            nav:'Bank Penerima Dana',
            section:'Bank Penerima Dana'
          }, 
          individual:{
            nav:'Bank Penerima Dana',
            section:'Bank Penerima Dana'
          }
        },
        step6:{
          perusahaan:{
            nav:'Terms and condition',
            section:'Terms and condition'
          }, 
          individual:{
            nav:'Terms and condition',
            section:'Terms and condition'
          }
        }
      }
      return !_.isNil(step) ? title[step] : title
  }
  const handlSetStep = (stp) => {
    setStep(stp)
    if (stp === 2) {
      fetchStep2KycFormData({merchantId})
    } else if (stp === 3) {
      fetchStep3KycFormData({merchantId})
    } else if (stp === 4) {
      fetchStep4KycFormData({merchantId})
    } else if (stp === 5) {
      fetchStep5KycFormData({merchantId})
    } else if (stp === 6) {
      fetchStep6KycFormData({merchantId})
    }
  }
  const reloadStep = () => {
    handlSetStep(step)
  }
  useEffect(() => {
    if (window.location.hostname === 'dashboard-staging.plink.co.id') {
      window.location.href = 'https://dashboard.plink.co.id/get-started'
    } else {
      fetchKycProgress({merchantId})
    }
  }, [])
  return (
    <ContentWrapper
      pageTitle='Get Started'
      breadcrumb={[
      {
        title: 'Beranda',
        link: AppConfig.appHomePage
      }, {
        title: 'Get Started',
        link: null,
        isActive: true
      }
    ]}
      contentHeaderTitle='Get Started'
      isNeedLoggedin>
      {_.isNil(getStartedMerchantCategory)
        ? <GetStartedSelectMerchantCategory
            reloadStep={() => {
            fetchKycProgress({merchantId})
          }}
            skeleton={CardSkeleton}/>
        : (
          <Box sx={{
            flexGrow: 1
          }}>
            <Grid container spacing={1}>
              <Grid container item spacing={3}>
                <Grid key={0} item xs={12} md={3}>
                  <GetStartedNav
                    getStartedMerchantCategory={getStartedMerchantCategory}
                    uploadKycDocument={uploadKycDocument}
                    kycProgress={kycProgress}
                    stepLoading={stepLoading}
                    stepTabLoading={stepTabLoading}
                    setStep={handlSetStep}
                    step={step}
                    pageTitle={pageTitle}

                  />
                    
                </Grid>
                <Grid key={1} item xs={12} md={9}>
                  {step === 1 && <GetStartedStep1
                    key={0}
                    getStartedMerchantCategory={getStartedMerchantCategory}
                    pageTitle={pageTitle('step1')[getStartedMerchantCategory]['section']}
                    />}

                  {step === 0 && <GetStartedSelectMerchantCategory
                    key={1}
                    skeleton={CardSkeleton}
                    getStartedMerchantCategory={getStartedMerchantCategory}
                    reloadStep={() => {
                    fetchKycProgress({merchantId})
                  }}/>}

                  {step === 2 && (!stepLoading.step2 || stepTabLoading.step2
                    ? <GetStartedStep2
                        key={2}
                        uploadKycDocument={uploadKycDocument}
                        reloadStep={reloadStep}
                        step2KycFormData={step2KycFormData}
                        submitData={submitKycStep2}
                        merchantId={merchantId}
                        getStartedMerchantCategory={getStartedMerchantCategory}
                        pageTitle={pageTitle('step2')[getStartedMerchantCategory]['section']}/>
                    : CardSkeleton)}

                  {step === 3 && (!stepLoading.step3 || stepTabLoading.step3
                    ? <GetStartedStep3
                        key={3}
                        uploadKycDocument={uploadKycDocument}
                        reloadStep={reloadStep}
                        step3KycFormData={step3KycFormData}
                        submitData={submitKycStep3}
                        merchantId={merchantId}
                        getStartedMerchantCategory={getStartedMerchantCategory}
                        pageTitle={pageTitle('step3')[getStartedMerchantCategory]['section']}/>
                    : CardSkeleton)}

                  {step === 4 && (!stepLoading.step4 || stepTabLoading.step4
                    ? <GetStartedStep4
                        key={4}
                        uploadKycDocument={uploadKycDocument}
                        reloadStep={reloadStep}
                        step4KycFormData={step4KycFormData}
                        submitData={submitKycStep4}
                        merchantId={merchantId}
                        getStartedMerchantCategory={getStartedMerchantCategory}
                        pageTitle={pageTitle('step4')[getStartedMerchantCategory]['section']}/>
                    : CardSkeleton)}

                  {step === 5 && (!stepLoading.step5 || stepTabLoading.step5
                    ? <GetStartedStep5
                        key={5}
                        uploadKycDocument={uploadKycDocument}
                        reloadStep={reloadStep}
                        step5KycFormData={step5KycFormData}
                        submitData={submitKycStep5}
                        merchantId={merchantId}
                        getStartedMerchantCategory={getStartedMerchantCategory}
                        pageTitle={pageTitle('step5')[getStartedMerchantCategory]['section']}/>
                    : CardSkeleton)}

                  {step === 6 && (!stepLoading.step6 || stepTabLoading.step6
                    ? <GetStartedStep6
                        key={6}
                        uploadKycDocument={uploadKycDocument}
                        reloadStep={reloadStep}
                        step6KycFormData={step6KycFormData}
                        submitData={submitKycStep6}
                        merchantId={merchantId}
                        getStartedMerchantCategory={getStartedMerchantCategory}
                        pageTitle={pageTitle('step6')[getStartedMerchantCategory]['section']}/>
                    : CardSkeleton)}

                </Grid>
              </Grid>
            </Grid>
          </Box>
        )
}
    </ContentWrapper>
  )
}
export default connect((state, ownProps) => ({
  /** GetStarted Data */
  stepTabLoading: state.getstarted.stepTabLoading,
  kycProgress: state.getstarted.kycProgress,
  errors: state.getstarted.errors,
  stepTabLoading: state.getstarted.stepTabLoading,
  stepLoading: state.getstarted.stepLoading,
  step2KycFormData: state.getstarted.step2KycFormData,
  step3KycFormData: state.getstarted.step3KycFormData,
  step4KycFormData: state.getstarted.step4KycFormData,
  step5KycFormData: state.getstarted.step5KycFormData,
  step6KycFormData: state.getstarted.step6KycFormData,

  getStartedMerchantCategory: state.getstarted.merchantCategory,
  /** Others */
  merchantId: state.myprofile.merchant.id,
  merchantCode: state.myprofile.merchant.merchant_code,
  backendCallbackUrl: state.myprofile.integration_params.backend_callback_url,
  frontendCallbackUrl: state.myprofile.integration_params.frontend_callback_url,
  keyId: state.myprofile.integration_params.key_id,
  loadingUpdateCurrentCallbackUrl: state.merchantkey.loadingUpdateCurrentCallbackUrl,
  isReloading: state.tablepagination.reloadDetail.settingsDevelopment
}), dispatch => ({
  tablePaginationSetReload: data => dispatch(TablePaginationActions.setReloadDetail(data)),
  merchantkeyFetchCurrentMerchantKey: data => dispatch(MerchantKeyActions.merchantkeyFetchCurrentMerchantKey(data)),
  merchantkeyUpdateCurrentCallbackUrl: data => dispatch(MerchantKeyActions.merchantkeyUpdateCurrentCallbackUrl(data)),
  //fetch
  fetchStep2KycFormData: data => dispatch(GetStartedActions.fetchKycDataStep2(data)),
  fetchStep3KycFormData: data => dispatch(GetStartedActions.fetchKycDataStep3(data)),
  fetchStep4KycFormData: data => dispatch(GetStartedActions.fetchKycDataStep4(data)),
  fetchStep5KycFormData: data => dispatch(GetStartedActions.fetchKycDataStep5(data)),
  fetchStep6KycFormData: data => dispatch(GetStartedActions.fetchKycDataStep6(data)),
  fetchKycProgress: data => dispatch(GetStartedActions.fetchProgressData(data)),
  //Submit
  submitKycStep2: data => dispatch(GetStartedActions.submitKycStep2(data)),
  submitKycStep3: data => dispatch(GetStartedActions.submitKycStep3(data)),
  submitKycStep4: data => dispatch(GetStartedActions.submitKycStep4(data)),
  submitKycStep5: data => dispatch(GetStartedActions.submitKycStep5(data)),
  submitKycStep6: data => dispatch(GetStartedActions.submitKycStep6(data)),
  //upload
  uploadKycDocument: data => dispatch(GetStartedActions.uploadKycDocument(data)),
  reset: () => dispatch(GetStartedActions.reset())
}))(Comp)
