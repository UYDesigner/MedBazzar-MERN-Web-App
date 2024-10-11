var express = require('express');
var pool = require('./pool')
var upload = require('./multer')

var router = express.Router();



router.get('/display_all_category', function (req, res, next) {
    try {
        pool.query("SELECT * FROM category", function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Plz contact database administrator..' })
            }
            else {
                console.log(result)
                res.status(200).json({ status: 'True', data: result })
            }

        })
    }
    catch (e) {
        console.log('catch error', e);
        res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
    }
})


router.post('/fetch_all_subcategory_by_categoryid', function (req, res, next) {

    console.log(req.body);
    try {
        pool.query("select * from subcategories where categoryid = ?", [req.body.categoryid], function (error, result) {
            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Please contact the database administrator.' });
            } else {
                console.log('dddddddddddddd',result)
                res.status(200).json({ status: 'True', data: result })
            }
        });
    } catch (e) {
        console.log('Catch error', e);
        res.status(200).json({ status: 'False', message: 'Please contact the server administrator.' });
    }
});

router.post('/show_all_banners', function (req, res, next) {
    try {
        pool.query("SELECT * FROM banners  where bannertype =? ",[req.body.bannertype], function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Plz contact database administrator..' })
            }
            else {
                console.log('banner from general',result)
                res.status(200).json({ status: 'True', data: result })
            }

        })
    }
    catch (e) {
        console.log('catch error', e);
        res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
    }
})

router.post('/show_all_brands', function (req, res, next) {
    try {
        pool.query("SELECT * FROM brands  where brandid != ? ",[req.body.brandid], function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Plz contact database administrator..' })
            }
            else {
                console.log('all brand not equal to 0 id ',result)
                res.status(200).json({ status: 'True', data: result })
            }

        })
    }
    catch (e) {
        console.log('catch error', e);
        res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
    }
})

router.post('/show_all_categories', function (req, res, next) {
    try {
        pool.query("SELECT * FROM category  ", function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Plz contact database administrator..' })
            }
            else {
                console.log('all categories',result)
                res.status(200).json({ status: 'True', data: result })
            }

        })
    }
    catch (e) {
        console.log('catch error', e);
        res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
    }
})



module.exports = router;


router.post('/show_all_concern', function (req, res, next) {
    try {
        pool.query("SELECT * FROM concern  ", function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Plz contact database administrator..' })
            }
            else {
                console.log('all categories',result)
                res.status(200).json({ status: 'True', data: result })
            }

        })
    }
    catch (e) {
        console.log('catch error', e);
        res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
    }
})


router.post('/show_all_productdetails_by_offer', function (req, res, next) {
    try {
        pool.query("SELECT pd.* , p.*, p.producticon as picture, pd.picture as multi_picture, pd.description as pd_description, (SELECT c.categoryname FROM category c WHERE c.categoryid = pd.categoryid) as categoryname, (SELECT s.subcategoryname FROM subcategories s WHERE s.subcategoryid = pd.subcategoryid)  AS subcategoryname, (SELECT b.brandname FROM brands b WHERE b.brandid = pd.brandid) as brandname , (SELECT c.concernname FROM concern c WHERE c.concernid = pd.concernid) as concernname  FROM productdetail pd, product as p where pd.productid = p.productid and pd.offertype = ? ",[req.body.offertype], function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Plz contact database administrator..' })
            }
            else {
                console.log(result)
                res.status(200).json({ status: 'True', data: result })
            }

        })
    }
    catch (e) {
        console.log('catch error', e);
        res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
    }
})

router.post('/show_all_productdetails_by_category', function (req, res, next) {
    console.log("cassds", req.body);
    try {
        pool.query("SELECT pd.* , p.*, p.producticon as picture, pd.picture as multi_picture, pd.description as pd_description, (SELECT c.categoryname FROM category c WHERE c.categoryid = pd.categoryid) as categoryname, (SELECT s.subcategoryname FROM subcategories s WHERE s.subcategoryid = pd.subcategoryid)  AS subcategoryname, (SELECT b.brandname FROM brands b WHERE b.brandid = pd.brandid) as brandname , (SELECT c.concernname FROM concern c WHERE c.concernid = pd.concernid) as concernname  FROM productdetail pd, product as p where pd.productid = p.productid and pd.categoryid = ? ",[req.body.categoryid], function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Plz contact database administrator..' })
            }
            else {
                console.log(result)
                res.status(200).json({ status: 'True', data: result })
            }

        })
    }
    catch (e) {
        console.log('catch error', e);
        res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
    }
})

router.post('/show_all_productdetails_by_brand', function (req, res, next) {

    console.log("Received request with body:", req.body); 

    try {
        pool.query("SELECT pd.* , p.*, p.producticon as picture, pd.picture as multi_picture, pd.description as pd_description, (SELECT c.categoryname FROM category c WHERE c.categoryid = pd.categoryid) as categoryname, (SELECT s.subcategoryname FROM subcategories s WHERE s.subcategoryid = pd.subcategoryid)  AS subcategoryname, (SELECT b.brandname FROM brands b WHERE b.brandid = pd.brandid) as brandname , (SELECT c.concernname FROM concern c WHERE c.concernid = pd.concernid) as concernname  FROM productdetail pd, product as p where pd.productid = p.productid and pd.brandid = ? ",[req.body.brandid], function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Plz contact database administrator..' })
            }
            else {
                console.log(result)
                res.status(200).json({ status: 'True', data: result })
            }

        })
    }
    catch (e) {
        console.log('catch error', e);
        res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
    }
})

router.post('/show_all_productdetails_by_concern', function (req, res, next) {

    console.log("Received request with body:", req.body); 

    try {
        pool.query("SELECT pd.* , p.*, p.producticon as picture, pd.picture as multi_picture, pd.description as pd_description, (SELECT c.categoryname FROM category c WHERE c.categoryid = pd.categoryid) as categoryname, (SELECT s.subcategoryname FROM subcategories s WHERE s.subcategoryid = pd.subcategoryid)  AS subcategoryname, (SELECT b.brandname FROM brands b WHERE b.brandid = pd.brandid) as brandname , (SELECT c.concernname FROM concern c WHERE c.concernid = pd.concernid) as concernname  FROM productdetail pd, product as p where pd.productid = p.productid and pd.concernid = ? ",[req.body.concernid], function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Plz contact database administrator..' })
            }
            else {
                console.log(result)
                res.status(200).json({ status: 'True', data: result })
            }

        })
    }
    catch (e) {
        console.log('catch error', e);
        res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
    }
})

// router.post('/display_all_productdetail_by_category',function(req,res,next){
//     try
//     {  console.log("Filter",req.body)
//         var pat='%'+req.body.pattern+'%'
//         pool.query("select P.*,PR.*,P.picture as multi_picture, P.description as pd_description,(select C.categoryname from category C where C.categoryid=P.categoryid )as categoryname, (select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid) as subcategoryname,(select B.brandname from brand B where B.brandid=P.brandid)as brandname,(select Con.concernname from concern Con where Con.concernid=P.concernid)as concernname from productdetails P,products PR  where P.productid=PR.productid and P.categoryid=? or PR.productname  like ?",[req.body.categoryid,pat],function(error,result){
//             if (error)
//             {  console.log(error)
//                 res.status(200).json({status:false,message:'Server Error Pls Contact Database Administrator....'})
//             }
//             else
//         { console.log(result)
//                 res.status(200).json({status:true,message:'Success',data:result})
//             }
//         })
//     }
//     catch(e)
//     {
//         res.status(200).json({status:false,message:'Server Error : Pls Contact Server Administrator..... '})
//     }
  
//   })

router.post('/display_all_productdetail_by_Search',function(req,res,next){
    try
    {  console.log("Filter",req.body)
        var pat='%'+req.body.pattern+'%'
        pool.query("SELECT pd.* , p.*, p.producticon as picture, pd.picture as multi_picture, pd.description as pd_description, (SELECT c.categoryname FROM category c WHERE c.categoryid = pd.categoryid) as categoryname, (SELECT s.subcategoryname FROM subcategories s WHERE s.subcategoryid = pd.subcategoryid)  AS subcategoryname, (SELECT b.brandname FROM brands b WHERE b.brandid = pd.brandid) as brandname , (SELECT c.concernname FROM concern c WHERE c.concernid = pd.concernid) as concernname  FROM productdetail pd, product as p where pd.productid = p.productid and p.productname like ? ",[pat],function(error,result){
            if (error)
            {  console.log(error)
                res.status(200).json({status:false,message:'Server Error Pls Contact Database Administrator....'})
            }
            else
        { console.log(result)
                res.status(200).json({status:true,message:'Success',data:result})
            }
        })
    }
    catch(e)
    {
        res.status(200).json({status:false,message:'Server Error : Pls Contact Server Administrator..... '})
    }
  
  })


module.exports = router;