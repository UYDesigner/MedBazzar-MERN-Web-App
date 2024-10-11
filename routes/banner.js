var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer');
const { fileLoader } = require('ejs');

router.post('/submit_banners', upload.any(), function (req, res, next) {

    console.log(req.body);
    console.log('files -- picture', req.files);

    try {

        // var filenames=req.files.map((file)=>file.filename)

        var files = req.files.map((item) => {

            return item.filename
        })

        // console.log('file-- picture', req.filename);
        pool.query("INSERT INTO banners (bannertype, brandid, picture) VALUES (?, ?, ?)",
            [req.body.bannertype, req.body.brandid, files + ""],
            function (error, result) {
                if (error) {
                    console.log(error);
                    res.status(200).json({ status: 'False', message: 'Please contact the database administrator.' });
                } else {
                    console.log("SSSSSS", result);
                    res.status(200).json({ status: 'True', message: 'Banner submitted successfully.' });
                }
            });
    } catch (e) {
        console.log('Catch error', e);
        res.status(200).json({ status: 'False', message: 'Please contact the server administrator.' });
    }
});



router.get('/display_all_banners', function (req, res, next) {
    try {
        pool.query("SELECT ban.*, (SELECT b.brandname FROM brands b WHERE ban.brandid = b.brandid )as brandname FROM banners as ban", function (error, result) {

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


router.post('/edit_banner_data', function (req, res, next) {
    console.log('klkl', req.body);

    try {
        pool.query("update  banners set bannertype = ?, brandid =? where bannerid = ? ",
            [req.body.bannertype, req.body.brandid, req.body.bannerid],
            function (error, result) {
                if (error) {
                    console.log(error);
                    res.status(200).json({ status: 'False', message: 'Plz contact database administrator..' })
                } else {
                    console.log(result);
                    res.status(200).json({ status: 'True', message: 'Product updated successfully..' })
                }
            }
        )
    } catch (e) {
        console.log('catch error', e);
        res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
    }
});




router.post('/delete_banner_data', function (req, res, next) {
    try {
        pool.query("DELETE FROM banners WHERE bannerid = ?", [req.body.bannerid], function (error, result) {
            if (error) {
                console.log(error);
                res.status(200).json({ status: 'False', message: 'Please contact the database administrator.' });
            } else {
                console.log(result);
                res.status(200).json({ status: 'True', message: 'Banner deleted successfully.' });
            }
        });
    } catch (e) {
        console.log('Catch error', e);
        res.status(200).json({ status: 'False', message: 'Please contact the server administrator.' });
    }
});


module.exports = router;