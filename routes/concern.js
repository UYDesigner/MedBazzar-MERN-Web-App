var express = require('express');
var pool = require('./pool')
var upload = require('./multer')

var router = express.Router();

/* GET home page. */
router.post('/submit_concern', upload.single('picture'), function (req, res, next) {

    try {
        pool.query("insert into concern (concernname, concernicon) values(?, ?)", [req.body.concernname, req.file.filename], function (error, result) {

            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Plz contact database administrator..' })
            }
            else {
                console.log(result)
                res.status(200).json({ status: 'True', message: ' Concern Submitted Successfully..' })
            }

        })
    }
    catch (e) {
        console.log('catch error', e);
        res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
    }
    
});



router.get('/display_all_concern', function (req, res, next) {
    try {
        pool.query("SELECT * FROM concern", function (error, result) {

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


router.post('/edit_concern_data', function (req, res, next) {

    try {
        pool.query("update  concern set concernname = ? where concernid = ? ", [req.body.concernname, req.body.concernid], function (error, result) {

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

router.post('/edit_concern_picture',upload.single('picture'), function (req, res, next) {

    try {
        pool.query("update  concern set concernicon = ? where concernid = ? ", [req.file.filename, req.body.concernid], function (error, result) {

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

router.post('/delete_concern_data', function (req, res, next) {
    try {
        pool.query("DELETE FROM concern WHERE concernid = ?", [req.body.concernid], function (error, result) {
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