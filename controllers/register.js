const asyncHandler = require("../middleware/async");
const getGoogleUser = require("../services/googleResponse");
const User = require("../models/user");
const crypto = require("crypto");
const sendEmail = require("../services/sendEmail");
const gravatar = require("gravatar");
const resetToken = require("../models/resetToken");
exports.register = asyncHandler(async (req, res, next) => {
  var { name, email, password, cpassword } = req.body;

  //-----------Data Validataion-----------//
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!name || !email || !password || !cpassword)
    return res.send("Feilds can't be empty!");
  if (!email.match(mailformat)) return res.send("Invalid Email");
  if (password != cpassword) return res.send("Password dose not match!");

  //-----------Data Verification Passed-------//

  //-----------Data Trimming---------------//
  name = name.trim();
  email = email.trim();
  password = password.trim();
  cpassword = cpassword.trim();

  //--------Check if User Exsists In Database-------------//

  let user = await User.findOne({ email });
  //
  if (user) {
    if (user.googleID) {
      // await req.flash('message',"You're google user! Signin with google.")
      return res.status(400).send("You're google user! Signin with google.");
    }
    let isValid = await bcrypt.compare(password, user.password);
    if (user.isVerified === false && isValid) {
      await User.findByIdAndRemove(user.id);
    } else if (user.isVerified === true) {
      // await req.flash('message','User already exists!')
      return res.status(400).send("User already exists!");
    } else if (user.isVerified === false && !isValid) {
      // await req.flash('message',"Current and previous password don't match!")
      return res.status(400).send("Current and previous password dont match!");
    }
  }

  //Get users gravatar
  const avatar = gravatar.url(email, {
    s: "200", //size
    r: "pg", //rating
    d: "mm", //default picture
  });

  //Create user model
  user = new User({
    name,
    email,
    password,
    avatar,
  });

  //Send verification Mail
  try {
    var tokenKey = crypto.randomBytes(32).toString("hex");
    await resetToken({ tokenKey: tokenKey, email: email }).save();

    var link =
      "https://www.axisvnit.org/api/auth/verifyEmail?tokenKey=" + tokenKey;

    // const filepath = path.join(
    //   __dirname,
    //   "../../views/emailverify/emailVerification.html"
    // );

    // const url = "https://www.axisvnit.org";
    //get html for email
    // const html = emailHtml({
    //   name,
    //   link,
    //   url,
    //   filepath,
    // });

    await sendEmail({ email, subject: "Verify your Account" });
  } catch (err) {
    console.log(err);
    return res.send("error/503");
  }
  //Save in the Database
  await user.save();
  //   await req.flash("message", "Success verification mail sent!");
  return res.status(200).send("Success verification mail sent!");

  // Also Check if he a google user :)
});

exports.googleAuth = asyncHandler(async (req, res, next) => {
  //Get the current registered User
  const googleUser = await getGoogleUser({ code: req.query.code });
  const {
    name,
    picture: avatar,
    id: googleID,
    verified_email,
    email,
  } = googleUser;

  return res.json({ msg: `Welcome ${name}!` });
  // let current_user = await User.findOne({ email });
  // if (current_user && !current_user.googleID) {
  //   await req.flash("message", "Email already exists! Please login.");
  //   return res.status(400).redirect("/api/auth");
  // }
  // let user = await User.findOne({ googleID });
  // if (!user) {
  //   let user = new User({
  //     name,
  //     avatar,
  //     googleID,
  //     email,
  //     isVerified: verified_email,
  //   });
  //   await user.save({ validateBeforeSave: false });
  //   await req.flash(
  //     "message",
  //     "Success LoggedIn! HURRY and register for your favourite AXIS EVENTS!"
  //   );
  //   sendTokenResponse(
  //     user,
  //     201,
  //     "Google user's profile created! You are loggedIn.",
  //     res
  //   );
  //   const redirectURL = req.session.redirectURL;
  //   delete req.session.redirectURL;
  //   if (redirectURL) return res.redirect(redirectURL);
  //   else {
  //     return res.redirect("/");
  //   }
  // } else {
  //   await req.flash(
  //     "message",
  //     "Success LoggedIn! HURRY and register for your favourite AXIS EVENTS!"
  //   );
  //   sendTokenResponse(user, 200, "Google user loggedIn!", res);
  //   const redirectURL = req.session.redirectURL;
  //   delete req.session.redirectURL;
  //   if (redirectURL) return res.redirect(redirectURL);
  //   else {
  //     return res.redirect("/");
  //   }
  // }
});
