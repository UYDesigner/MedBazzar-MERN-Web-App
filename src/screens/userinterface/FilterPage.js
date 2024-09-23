import React, { useEffect, useState } from 'react'
import SideBarComponent from '../../components/userinterface/SideBarComponent';
import FilteredProductListComponent from '../../components/userinterface/FilteredProductListComponent';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Headers from "../../components/userinterface/Headers";
import FooterComponent from "../../components/userinterface/FooterComponent"
import DescriptionComponent from "../../components/userinterface/DescriptionComponent"
import { postData } from '../../services/FetchNodeServices';
import { useLoaderData, useLocation, useParams } from 'react-router-dom';

export default function FilterPage(props) {
  var location = useLocation();
  var param = useParams();

  const [pageRefesh, setPageRefesh] = useState(false)
  // alert(categoryid , brandid);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [products, setProducts] = useState([]);

  // seaarching handling ---------------------


  var categoryid = ''
  var brandid = ''
  var concernid = ''
  try {
    // alert("hello")
    // categoryid = location?.state?.categoryid;
    categoryid = location?.state?.categoryid;
    brandid = location?.state?.brandid;
    concernid = location?.state?.concernid;

  }
  catch (e) { }
  // alert("hi");
  var pattern = '';
  try { pattern = param['pattern']}
  catch (e) { }

  const fetchAllProduct = async (data) => {
    var result = await postData('userinterface/display_all_productdetail_by_Search', { 'pattern': pattern })
    setProducts(result.data)
  }




  // seaarching handling ---------------------

  const fetchAllProductByCategory = async (data) => {
    var result = await postData('userinterface/show_all_productdetails_by_category', { categoryid: data })
    setProducts(result.data);
  }

  const fetchAllProductByBrand = async (data) => {

    var result = await postData('userinterface/show_all_productdetails_by_brand', { brandid: data })
    // alert(result);
    setProducts(result.data);
  }

  const fetchAllProductByConcern = async (data) => {

    var result = await postData('userinterface/show_all_productdetails_by_concern', { concernid: data })
    // alert(result);
    setProducts(result.data);
  }

  console.log("brandid- ", brandid, " categoryid -", categoryid, "concern -", concernid)

  console.log("llll", products);


  

  useEffect(function () {

    console.log('Patternnnnnnnnn', pattern);

    if (categoryid != undefined)
      fetchAllProductByCategory(categoryid);
    else if (brandid != undefined)
      fetchAllProductByBrand(brandid);
    else if (concernid != undefined)
      fetchAllProductByConcern(concernid);
    else
      fetchAllProduct(pattern);

  }, [param['pattern']])


  return (
    <div className='flex w-[100%] flex-col' >
      <Headers />
      <div className='flex w-[100%]'>
        {isTablet ? <div></div> : (<div><SideBarComponent style={{ flex: 1 }} />  </div>)}
        <FilteredProductListComponent data={products} style={{ flex: 1 }} pageRefesh={pageRefesh} setPageRefesh={setPageRefesh} />
      </div>
      <DescriptionComponent />
      <FooterComponent />
    </div>
  );
}


