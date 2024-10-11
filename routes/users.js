var express = require('express');
var pool = require('./pool')
var upload = require('./multer')
var router = express.Router();

router.post('/submit_user', function (req, res, next) {
  console.log(req.body);

  try {
    pool.query("insert into userdata (mobileno, emailid, username) values(?, ?, ?)", [req.body.mobileno, req.body.emailid, req.body.username], function (error, result) {

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

router.post('/delete_user', function (req, res, next) {
  console.log(req.body);

  try {
    pool.query(" delete  from userdata where mobileno = ?", [req.body.mobileno], function (error, result) {
 
      if (error) {
        console.log(error);
        res.status(200).json({ status: 'False', message: 'Plz contact database administrator..' })
      }
      else {
        console.log(result);
                res.status(200).json({ status: 'True', message: 'Product deleted successfully.' });
      }

    })
  }
  catch (e) {
    console.log('catch error', e);
    res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
  }

});

router.post('/check_userdata', function (req, res, next) {

  try {
    pool.query("select * from userdata where mobileno=?", [req.body.mobileno], function (error, result) {

      if (error) {
        console.log(error);
        res.status(200).json({ status: 'False', message: 'Plz contact database administrator..' })
      }
      else {

        console.log(result)
        if (result.length == 1) {
          res.status(200).json({
            status: 'True',
            data: result[0],

            message: 'User is already logged in.'
          })
        }
        else {
          res.status(200).json({
            status: 'False',
            data: [],

            message: 'User not found..'
          })
        }
      }

    })
  }
  catch (e) {
    console.log('catch error', e);
    res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
  }

});

router.post('/check_user_address', function (req, res, next) {

  try {
    pool.query("select * from address where mobileno=?", [req.body.mobileno], function (error, result) {

      if (error) {
        console.log(error);
        res.status(200).json({ status: 'False', message: 'Plz contact database administrator..' })
      }
      else {

        console.log(result)
        if (result.length > 1) {
          res.status(200).json({
            status: 'true',
            data: result[0],

            message: 'User address found.'
          })
        }
        else {
          res.status(200).json({
            status: 'false',
            data: [],

            message: 'User not found..'
          })
        }
      }

    })
  }
  catch (e) {
    console.log('catch error', e);
    res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
  }

});

router.post('/submit_user_address', function (req, res, next) {
  console.log(req.body);

  try {
    pool.query("insert into address (mobileno, address, state, city, pincode, landmark) values(?, ?, ?,?,?,? )", [req.body.mobileno, req.body.address, req.body.state, req.body.city, req.body.pincode, req.body.landmark], function (error, result) {

      if (error) {
        console.log(error);
        res.status(200).json({ status: 'false', message: 'Plz contact database administrator..' })
      }
      else {
        console.log(result)
        res.status(200).json({ status: 'true', message: ' Address Submitted Successfully..' })
      }

    })
  }
  catch (e) {
    console.log('catch error', e);
    res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
  }

});

router.post('/delete_user_address', function (req, res, next) {
  console.log(req.body);

  try {
    pool.query("delete from address where mobileno = ?", [req.body.mobileno], function (error, result) {

      if (error) {
        console.log(error);
        res.status(200).json({ status: 'false', message: 'Plz contact database administrator..' })
      }
      else {
        console.log(result)
        res.status(200).json({ status: 'true', message: '  Deleted Successfully..' })
      }

    })
  }
  catch (e) {
    console.log('catch error', e);
    res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
  }

});
router.post('/update_user_address', function (req, res, next) {
  console.log(req.body);

  try {
    pool.query("update address set  address=?, state=?, city=?, pincode=?, landmark=? where mobileno = ?", [req.body.address, req.body.state, req.body.city, req.body.pincode, req.body.landmark, req.body.mobileno], function (error, result) {

      if (error) {
        console.log(error);
        res.status(200).json({ status: 'false', message: 'Plz contact database administrator..' })
      }
      else {
        console.log(result)
        res.status(200).json({ status: 'true', message: ' Address Updated Successfully...' })
      }

    })
  }
  catch (e) {
    console.log('catch error', e);
    res.status(200).json({ status: 'False', message: 'Plz contact server administrator..' });
  }

});

// router.post('/save_order', function (req, res, next) {
//   try {
//     console.log("user..........", req.body)
//     pool.query("insert into orders (userid,mobileno,emailid,orderdate,paymentstatus, paymentid) values(?,?,?,?,?,?)", [req.body.userid, req.body.mobileno, req.body.emailid, new Date().toString(), req.body.paymentstatus,req.body.paymentid ], function (error, result) {
//       if (error) {
//         console.log(error)
//         res.status(200).json({ status: false, message: 'Server Error:Pls Contact Database Administrator...' })
//       }
//       else {
//         res.status(200).json({ status: true, message: 'Order Submitted Succesfully...' })

//         console.log("RESULTTTTT...", result);
//         pool.query("insert into orderdetails values ( orderid, productdetailid, price, offerprice, qty) values ?", [req.body.orderlist?.map((item)=> {return[result.insertId, item.productdetailid, item.price, item.offerprice,item.qty ]}) ], function (error, result) {
//           if (error) {
//             console.log(error)
//             res.status(200).json({ status: false, message: 'Server Error:Pls Contact Database Administrator...' })
//           }
//           else {
//             res.status(200).json({ status: true, message: 'Order Submitted Succesfully...' })
//           }
//         })


//       }

//     })



//   }
//   catch (e) {
//     console.log('Error:', e)
//     res.status(200).json({ status: false, message: 'Server Error:Pls Contact Server Administrator...' })
//   }

// });

router.post('/save_order', function (req, res, next) {
  try {
    console.log("user", req.body)
    pool.query("insert into orders (userid,mobileno,emailid,orderdate,paymentstatus,paymentid) values(?,?,?,?,?,?)", [req.body.userid, req.body.mobileno, req.body.emailid, new Date().toString(), req.body.paymentstatus, req.body.paymentid], function (error, result) {
      if (error) {
        console.log(error)
        res.status(200).json({ status: false, message: 'Server Error:Pls Contact Database Administrator...' })
      }
      else {

        console.log(result)
        pool.query("insert into orderdetails (orderid, productdetailid, price, offerprice, qty) values ?", [req.body.orderlist?.map((item) => {
          return [result.insertId, item.productdetailid, item.price, item.offerprice, item.qty]
        })


        ], function (error, result) {
          if (error) {
            console.log(error)
            res.status(200).json({ status: false, message: 'Server Error:Pls Contact Database Administrator...' })
          }
          else {
            res.status(200).json({ status: true, message: 'Order Submitted Succesfully...' })
          }

        })


      }

    })



  }
  catch (e) {
    console.log('Error:', e)
    res.status(200).json({ status: false, message: 'Server Error:Pls Contact Server Administrator...' })
  }

});

module.exports = router;
