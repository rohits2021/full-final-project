const Files  = require('../models/file');

module.exports = {
  index: async(req,res)=>{
    res.render('index')
  },

  upload: async(req,res)=>{
    let filename = req.file.filename;
    let newfile = await Files({filename});
    await newfile.save();
    res.status(201).json({success:true,data:filename})
  }
}