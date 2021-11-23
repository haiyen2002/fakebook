const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

module.exports.checkUser = async (req, res, next) => {
  try {
    //lấy mã token nằm trong cookie của user
    const token = req.cookies.userId;
    //giải mã token
    const result = jwt.verify(token, "Auth");
    //tìm user theo id vừa đc giải mã
    const user = await UserModel.findById(result.id);
    //set global user
    req.user = user;//cais nayf la se nhan lai trong cac controller
    //đăng nhập xong rồi mình lấy số lượng sản phẩm của thằng đó trong db tạo một biến global để chứa nó
    //co 2 truong hop. luc dang nhap va luc chua dang nhap
    next();
  } catch (error) {
    req.user = null;
    next();
  }
};
