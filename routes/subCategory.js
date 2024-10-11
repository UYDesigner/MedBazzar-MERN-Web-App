var express = require('express');
var pool = require('./pool')
var upload = require('./multer')

var router = express.Router();

/* GET home page. */
router.post('/submit_subcategory', upload.single('picture'), function (req, res, next) {

    try {
        pool.query("insert into subcategories (categoryid, subcategoryname, subcategoryicon) values(?, ?, ?)", [req.body.categoryid, req.body.subcategoryname, req.file.filename], function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Plz contact database administrator..' })
            }
            else {
                console.log(result)
                res.status(200).json({ status: 'True', message: ' SubCategory Submitted Successfully..' })
            }

        })
    }
    catch (e) {
        console.log('catch error', e);
        res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
    }

});


router.get('/display_all_subcategory', function (req, res, next) {
    try {
        pool.query("SELECT s.* , (SELECT c.categoryname FROM category c WHERE c.categoryid = s.categoryid) AS categoryname FROM subcategories s", function (error, result) {

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


router.post('/edit_subcategory_data', function (req, res, next) {

    console.log(req.body);

    try {
        pool.query("update  subcategories set categoryid =? , subcategoryname = ? where subcategoryid = ? ", [req.body.categoryid, req.body.subcategoryname, req.body.subcategoryid], function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Plz contact database administrator..' })
            }
            else {
                console.log(result)
                res.status(200).json({ status: 'True', message: ' SubCategory Updated Successfully..' })
            }

        })
    }
    catch (e) {
        console.log('catch error', e);
        res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
    }

});


router.post('/edit_subcategory_picture', upload.single('picture'), function (req, res, next) {
    console.log(req.body);

    try {
        pool.query("update  subcategories set subcategoryicon = ? where subcategoryid = ? ", [req.file.filename, req.body.subcategoryid], function (error, result) {
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


router.post('/delete_subcategory_data', function (req, res, next) {
    try {
        pool.query("DELETE FROM subcategories WHERE subcategoryid = ?", [req.body.subcategoryid], function (error, result) {
            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Please contact the database administrator.' });
            } else {
                console.log(result);
                res.status(200).json({ status: 'True', message: 'SubCategory deleted successfully.' });
            }
        });
    } catch (e) {
        console.log('Catch error', e);
        res.status(200).json({ status: 'False', message: 'Please contact the server administrator.' });
    }
});

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


module.exports = router;