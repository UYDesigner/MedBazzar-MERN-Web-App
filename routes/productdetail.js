var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer');
const { fileLoader } = require('ejs');

router.post('/submit_productdetails', upload.any(), function (req, res, next) {

    console.log(req.body);
    console.log('files -- picture', req.files);

    try {

        // var filenames=req.files.map((file)=>file.filename)

        var files=req.files.map((item)=>{

            return item.filename          
            })

        // console.log('file-- picture', req.filename);
        pool.query("INSERT INTO productdetail (categoryid, subcategoryid, brandid, productid, productsubname, weight, weighttype, typed, packaging, qty, price, offerprice, offertype, picture, description, concernid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
            [req.body.categoryid, req.body.subcategoryid, req.body.brandid, req.body.productid, req.body.productsubname, req.body.weight, req.body.weighttype, req.body.typed, req.body.packaging, req.body.qty, req.body.price, req.body.offerprice, req.body.offertype,files+"", req.body.description, req.body.concernid],
            function (error, result) {
                if (error) {
                    console.log(error);
                    res.status(200).json({ status: 'False', message: 'Please contact the database administrator.' });
                } else {
                    console.log("SSSSSS",result);
                    res.status(200).json({ status: 'True', message: 'Product details submitted successfully.' });
                }
            });
    } catch (e) {
        console.log('Catch error', e);
        res.status(200).json({ status: 'False', message: 'Please contact the server administrator.' });
    }
});


router.get('/display_all_productdetails', function (req, res, next) {
    try {
        pool.query("SELECT pd.* , (SELECT c.categoryname FROM category c WHERE c.categoryid = pd.categoryid) as categoryname, (SELECT s.subcategoryname FROM subcategories s WHERE s.subcategoryid = pd.subcategoryid)  AS subcategoryname, (SELECT b.brandname FROM brands b WHERE b.brandid = pd.brandid) as brandname , (SELECT p.productname FROM product p WHERE p.productid = pd.productid) as productname, (SELECT c.concernname FROM concern c WHERE c.concernid = pd.concernid) as concernname  FROM productdetail pd", function (error, result) {

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


router.post('/delete_productdetail_data', function (req, res, next) {
    try {
        pool.query("DELETE FROM productdetail WHERE productdetailid = ?", [req.body.productdetailid], function (error, result) {
            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Please contact the database administrator.' });
            } else {
                console.log(result);
                res.status(200).json({ status: 'True', message: 'Product detail deleted successfully.' });
            }
        });
    } catch (e) {
        console.log('Catch error', e);
        res.status(200).json({ status: 'False', message: 'Please contact the server administrator.' });
    }
});

router.post('/edit_productdetail_picture', upload.single('picture'), function (req, res, next) {
    console.log(req.body);

    try {
        pool.query("update  productdetail set picture = ? where productdetailid = ? ", [req.file.filename, req.body.productdetailid], function (error, result) {
            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Plz contact database administrator..' })
            } else {
                console.log(result)
                res.status(200).json({ status: 'True', message: ' Picture updated successfully..' })
            }
        })
    } catch (e) {
        console.log('catch error', e);
        res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
    }
});



module.exports = router;