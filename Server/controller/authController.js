const User = require("../model/User");

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const enteredUser = await User.findOne({ email: email });
    if (enteredUser) {
      
      if (password === enteredUser.password) {
         res.status(201).json({ message: "User logged In" });
      }else{
        res.status(433).json({message:"User entered Incorrect password"})
      }
    }else{
      res.status(403).json({message:"No such user found."})
    }
  } catch (err) {
    console.log(err);
    next();
  }
};
