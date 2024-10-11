var express = require('express');
var pool = require('./pool')
var upload = require('./multer')

var router = express.Router();

router.post('/submit_brand', upload.single('picture'), function (req, res, next) {

    console.log('Brandname:', req.body.brandname);
    console.log('Filename:', req.file.filename);

    try {
        pool.query("insert into brands (brandname, brandicon) values(?, ?)", [req.body.brandname, req.file.filename], function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Plz contact database administrator..' })
            }
            else {
                console.log(result)
                res.status(200).json({ status: 'True', message: ' Category Submitted Successfully..' })
            }

        })
    }
    catch (e) {
        console.log('catch error', e);
        res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
    }
    
});


router.get('/display_all_brands', function (req, res, next) {
    try {
        pool.query("SELECT * FROM brands where brandid != 0", function (error, result) {

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


router.post('/edit_brand_data', function (req, res, next) {

    console.log(req.body);

    try {
        pool.query("update  brands set brandname = ? where brandid = ? ", [req.body.brandname, req.body.brandid], function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Plz contact database administrator..' })
            }
            else {
                console.log(result)
                res.status(200).json({ status: 'True', message: ' Brand updated successfully..' })
            }

        })
    }
    catch (e) {
        console.log('catch error', e);
        res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
    }
    
});

router.post('/edit_brand_picture', upload.single('picture'), function (req, res, next) {
    console.log(req.body);

    try {
        pool.query("update  brands set brandicon = ? where brandid = ? ", [req.file.filename, req.body.brandid], function (error, result) {
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

router.post('/delete_brand_data', function (req, res, next) {
    try {
        pool.query("DELETE FROM brands WHERE brandid = ?", [req.body.brandid], function (error, result) {
            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Please contact the database administrator.' });
            } else {
                console.log(result);
                res.status(200).json({ status: 'True', message: 'brand deleted successfully.' });
            }
        });
    } catch (e) {
        console.log('Catch error', e);
        res.status(200).json({ status: 'False', message: 'Please contact the server administrator.' });
    }
});


module.exports = router;