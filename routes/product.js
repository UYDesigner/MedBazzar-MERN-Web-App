var express = require('express');
var pool = require('./pool')
var upload = require('./multer')

var router = express.Router();

router.post('/submit_product', upload.single('picture'), function (req, res, next) {

    console.log(req.body);

    try {
        pool.query("insert into product (productname, categoryid, subcategoryid, brandid, description, producticon) values(?, ?, ?, ?,?, ?)", [req.body.productname, req.body.categoryid, req.body.subcategoryid, req.body.brandid, req.body.description,req.file.filename], function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Plz contact database administrator..' })
            }
            else {
                console.log(result)
                res.status(200).json({ status: 'True', message: ' product Submitted Successfully..' })
            }

        })
    }
    catch (e) {
        console.log('catch error', e);
        res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
    }
    
});


router.get('/display_all_product', function (req, res, next) {
    try {
        pool.query("SELECT p.* , (SELECT c.categoryname FROM category c WHERE c.categoryid = p.categoryid) as categoryname, (SELECT s.subcategoryname FROM subcategories s WHERE s.subcategoryid = p.subcategoryid)  AS subcategoryname, (SELECT b.brandname FROM brands b WHERE b.brandid = p.brandid) as brandname FROM product p", function (error, result) {

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

router.post('/delete_product_data', function (req, res, next) {
    try {
        pool.query("DELETE FROM product WHERE productid = ?", [req.body.productid], function (error, result) {
            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Please contact the database administrator.' });
            } else {
                console.log(result);
                res.status(200).json({ status: 'True', message: 'Product deleted successfully.' });
            }
        });
    } catch (e) {
        console.log('Catch error', e);
        res.status(200).json({ status: 'False', message: 'Please contact the server administrator.' });
    }
});


router.post('/edit_product_picture', upload.single('picture'), function (req, res, next) {
    console.log(req.body);

    try {
        pool.query("update  product set producticon = ? where productid = ? ", [req.file.filename, req.body.productid], function (error, result) {
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


router.post('/edit_product_data', function (req, res, next) {

    console.log(req.body);

    try {
        pool.query("update  product set productname = ?, description =?, categoryid=?, subcategoryid=?, brandid=? where productid = ? ", [req.body.productname, req.body.description,req.body.categoryid, req.body.subcategoryid,  req.body.brandid,  req.body.productid], function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Plz contact database administrator..' })
            }
            else {
                console.log(result)
                res.status(200).json({ status: 'True', message: ' Product updated successfully..' })
            }

        })
    }
    catch (e) {
        console.log('catch error', e);
        res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
    }
    
});


router.post('/fetch_all_product_by_filteration', function (req, res, next) {
    console.log('checking........',req.body);

    try {
        const sql = "SELECT * FROM product WHERE categoryid = ? AND subcategoryid = ? AND brandid = ?";
        const values = [req.body.categoryid, req.body.subcategoryid, req.body.brandid];

        pool.query(sql, values, function (error, result) {
            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Please contact the database administrator.' });
            } else {
                console.log('dddddddddddddd', result);
                res.status(200).json({ status: 'True', data: result });
            }
        });
    } catch (e) {
        console.log('Catch error', e);
        res.status(200).json({ status: 'False', message: 'Please contact the server administrator.' });
    }
});


module.exports = router;