const router = require('express-promise-router')();


router.route('/')
.get((req,res)=>{
  res.render('chat')
});


module.exports = router;