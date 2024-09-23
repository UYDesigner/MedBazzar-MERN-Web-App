import React, { useState, useEffect } from 'react'
import Header from '../../components/userinterface/Header'
import Headers from '../../components/userinterface/Headers'
import MenuBar from '../../components/userinterface/MenuBar'
import SliderComponent from '../../components/userinterface/SliderComponent'
import FooterComponent from '../../components/userinterface/FooterComponent'
import BrandBoxComponent from '../../components/userinterface/BrandBoxComponent'
import CategoryBox from '../../components/userinterface/CategoryBox'
import ConcernBox from '../../components/userinterface/ConcernBox'
import DescriptionComponent from '../../components/userinterface/DescriptionComponent'
import ProductComponent from '../../components/userinterface/ProductComponent'
import { postData } from '../../services/FetchNodeServices'

export default function Home() {
  const [bannerList, setBannerList] = useState([]);
  const [brandList, setBrandList] =useState([]);
  const [categoryList, setCategoryList] =useState([]);
  const [concernList, setConcernList] =useState([]);
  const [productDetailByOfferList, setProductDetailByOfferList] =useState([]);
  const [pageRefesh, setPageRefesh] = useState(false)

  const fetchAllBanners = async () => {
    var result = await postData('userinterface/show_all_banners', { bannertype: 'general' });
    setBannerList(result.data);
  }

  const fetchAllBrands = async()=>{
    var result = await postData('userinterface/show_all_brands', { brandid: '0' });
    setBrandList(result.data);
  }

  const fetchAllCategories = async()=>{
    var result = await postData('userinterface/show_all_categories');
    setCategoryList(result.data);
  }

  const fetchAllConcern = async()=>{
    var result = await postData('userinterface/show_all_concern');
    setConcernList(result.data);
  }

  const fetchAllProductDetails = async (offertype) => {
    var result = await postData('userinterface/show_all_productdetails_by_offer', {offertype});
    setProductDetailByOfferList(result.data);
  }

  useEffect(function () {
    fetchAllBanners()
    fetchAllBrands()
    fetchAllCategories()
    fetchAllConcern()
    fetchAllProductDetails('Month end sale')
  }, [])



  return (
    <div>
      {/* <Header/> */}
      <Headers />
      <div className='slider'
        style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }}
      >
        <SliderComponent data={bannerList} />
      </div>

      <div className="brandslide">
        <BrandBoxComponent data={brandList} />
      </div>

      <div className='categoryies'>
        <CategoryBox  data={categoryList} title={'Browse By Category'}  />
      </div>

      <div className='Products'>
        <ProductComponent data={productDetailByOfferList} title={' Month End Sale'}  pageRefesh={pageRefesh} setPageRefesh={setPageRefesh} />
      </div>

      <div className='categoryies'>
        <ConcernBox  data={concernList} title={'Shop By Concern'} />
      </div>

      <div className="description">
        <DescriptionComponent />
      </div>

      <div className="footer">
        <FooterComponent />
      </div>
    </div>
  )
}
