module.exports.checkLogging = async (req, res, next) => {
    try {
      if(req.user){
        res.locals.user = req.user
      }
      next();
    } catch (error) {
        console.log(error)
      next();
    }
  };