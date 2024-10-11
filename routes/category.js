var express = require('express');
var pool = require('./pool')
var upload = require('./multer')

var router = express.Router();

/* GET home page. */
router.post('/submit_category', upload.single('picture'), function (req, res, next) {

    try {
        pool.query("insert into category (categoryname, picture) values(?, ?)", [req.body.categoryname, req.file.filename], function (error, result) {

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


router.post('/edit_category_data', function (req, res, next) {

    try {
        pool.query("update  category set categoryname = ? where categoryid = ? ", [req.body.categoryname, req.body.categoryid], function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Plz contact database administrator..' })
            }
            else {
                console.log(result)
                res.status(200).json({ status: 'True', message: ' Category updated successfully..' })
            }

        })
    }
    catch (e) {
        console.log('catch error', e);
        res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
    }
    
});

router.post('/edit_category_picture',upload.single('picture'), function (req, res, next) {

    try {
        pool.query("update  category set picture = ? where categoryid = ? ", [req.file.filename, req.body.categoryid], function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Plz contact database administrator..' })
            }
            else {
                console.log(result)
                res.status(200).json({ status: 'True', message: ' Picture updated successfully..' })
            }

        })
    }
    catch (e) {
        console.log('catch error', e);
        res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
    }
    
});

router.post('/delete_category_data', function (req, res, next) {
    try {
        pool.query("DELETE FROM category WHERE categoryid = ?", [req.body.categoryid], function (error, result) {
            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Please contact the database administrator.' });
            } else {
                console.log(result);
                res.status(200).json({ status: 'True', message: 'Category deleted successfully.' });
            }
        });
    } catch (e) {
        console.log('Catch error', e);
        res.status(200).json({ status: 'False', message: 'Please contact the server administrator.' });
    }
});




module.exports = router;
