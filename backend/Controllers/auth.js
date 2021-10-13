import jwt from 'jsonwebtoken';
import {
  v4 as uuidv4
} from 'uuid';
const User = require('../Model/userModel');
const nodemailer = require('nodemailer');

// đăng ký gửi from về email
export const registerControllers = async (req, res) => {
  const {
    name,
    email,
    password,
    birthday
  } = req.body;
  const users = new User({
    name,
    email,
    password,
    birthday,
    emailToken: uuidv4()
  });
  if (!users.email || !users.hashed_password || !users.name) {
    return res.status(400).json({
      error: false,
      message: 'register false'
    });
  }

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS
    }
  });

  let emailDetail = {
    from: `Verify your email ${process.env.EMAIL_FROM}`,
    to: users.email,
    subject: 'Verify your email',
    html: `
    <style type="text/css">
        @media screen {
            @font-face {
                font-family: 'Lato';
                font-style: normal;
                font-weight: 400;
                src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
            }

            @font-face {
                font-family: 'Lato';
                font-style: normal;
                font-weight: 700;
                src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
            }

            @font-face {
                font-family: 'Lato';
                font-style: italic;
                font-weight: 400;
                src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
            }

            @font-face {
                font-family: 'Lato';
                font-style: italic;
                font-weight: 700;
                src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
            }
        }

        /* CLIENT-SPECIFIC STYLES */
        body,
        table,
        td,
        a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            -ms-interpolation-mode: bicubic;
        }

        /* RESET STYLES */
        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }

        table {
            border-collapse: collapse !important;
        }

        body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
        }

        /* iOS BLUE LINKS */
        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        /* MOBILE STYLES */
        @media screen and (max-width:600px) {
            h1 {
                font-size: 32px !important;
                line-height: 32px !important;
            }
        }

        /* ANDROID CENTER FIX */
        div[style*="margin: 16px 0;"] {
            margin: 0 !important;
        }
    </style>
    <body
    style="
      background-color: #f4f4f4;
      margin: 0 !important;
      padding: 0 !important;
    "
  >
    <!-- HIDDEN PREHEADER TEXT -->
    <div
      style="
        display: none;
        font-size: 1px;
        color: #fefefe;
        line-height: 1px;
        font-family: 'Lato', Helvetica, Arial, sans-serif;
        max-height: 0px;
        max-width: 0px;
        opacity: 0;
        overflow: hidden;
      "
    >
      We're thrilled to have you here! Get ready to dive into your new account.
    </div>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <!-- LOGO -->
      <tr>
        <td bgcolor="#FFA73B" align="center">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td
                align="center"
                valign="top"
                style="padding: 40px 10px 40px 10px"
              ></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td
                bgcolor="#ffffff"
                align="center"
                valign="top"
                style="
                  padding: 40px 20px 20px 20px;
                  border-radius: 4px 4px 0px 0px;
                  color: #111111;
                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                  font-size: 48px;
                  font-weight: 400;
                  letter-spacing: 4px;
                  line-height: 48px;
                "
              >
                <h1 style="font-size: 48px; font-weight: 400; margin: 2">
                  Welcome!
                </h1>
                <img
                  src="https://brasol.vn/public/ckeditor/uploads/thiet-ke-logo-tin-tuc/logo-instagram.png"
                  width="125"
                  height="120"
                  style="display: block; border: 0px"
                />
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td
                bgcolor="#ffffff"
                align="left"
                style="
                  padding: 20px 30px 40px 30px;
                  color: #666666;
                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                  font-size: 18px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <p style="margin: 0">
                  We're excited to have you get started. First, you need to
                  confirm your account. Just press the button below.
                </p>
              </td>
            </tr>
            <tr>
              <td bgcolor="#ffffff" align="left">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td
                      bgcolor="#ffffff"
                      align="center"
                      style="padding: 20px 30px 60px 30px"
                    >
                      <table border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td
                            align="center"
                            style="border-radius: 3px"
                            bgcolor="#FFA73B"
                          >
                            <a
                              href="${process.env.ACTIVE}"
                              target="_blank"
                              style="
                                font-size: 20px;
                                font-family: Helvetica, Arial, sans-serif;
                                color: #ffffff;
                                text-decoration: none;
                                color: #ffffff;
                                text-decoration: none;
                                padding: 15px 25px;
                                border-radius: 2px;
                                border: 1px solid #ffa73b;
                                display: inline-block;
                              "
                              >Confirm Account</a
                            >
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- COPY -->
            <tr>
              <td
                bgcolor="#ffffff"
                align="left"
                style="
                  padding: 0px 30px 0px 30px;
                  color: #666666;
                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                  font-size: 18px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <p style="margin: 0">
                  If that doesn't work, copy and paste the following link in
                  your browser:
                </p>
              </td>
            </tr>
            <!-- COPY -->

            <tr>
              <td
                bgcolor="#ffffff"
                align="left"
                style="
                  padding: 0px 30px 20px 30px;
                  color: #666666;
                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                  font-size: 18px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <p style="margin: 0">
                  If you have any questions, just reply to this email—we're
                  always happy to help out.
                </p>
              </td>
            </tr>
            <tr>
              <td
                bgcolor="#ffffff"
                align="left"
                style="
                  padding: 0px 30px 40px 30px;
                  border-radius: 0px 0px 4px 4px;
                  color: #666666;
                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                  font-size: 18px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <p style="margin: 0">Cheers,<br />Group 6 Team</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td
          bgcolor="#f4f4f4"
          align="center"
          style="padding: 30px 10px 0px 10px"
        >
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td
                bgcolor="#FFECD1"
                align="center"
                style="
                  padding: 30px 30px 30px 30px;
                  border-radius: 4px 4px 4px 4px;
                  color: #666666;
                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                  font-size: 18px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <h2
                  style="
                    font-size: 20px;
                    font-weight: 400;
                    color: #111111;
                    margin: 0;
                  "
                >
                  Need more help?
                </h2>
                <p style="margin: 0">
                  <a href="#" target="_blank" style="color: #ffa73b"
                    >We&rsquo;re here to help you out</a
                  >
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td
                bgcolor="#f4f4f4"
                align="left"
                style="
                  padding: 0px 30px 30px 30px;
                  color: #666666;
                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: 18px;
                "
              >
                <br />
                <p style="margin: 0">
                  If these emails get annoying, please feel free to
                  <a
                    href="#"
                    target="_blank"
                    style="color: #111111; font-weight: 700"
                    >unsubscribe</a
                  >.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
    `
  }

  transporter.sendMail(emailDetail, async function (err) {
    if (err) {
      return res.status(401).json(err);
    }
    await users.save();
    res.json({
      emailToken: users.emailToken,
      message: 'Verification email is sent to your gmail account'
    })
  })
}

export const activeEmail = async (req, res) => {
  try {
    const token = req.query.token;
    let user = await User.findOne({
      emailToken: token
    });
    if (user) {
      let dataNew = {
        emailToken: null,
        active: true
      }
      dataNew = Object.assign(user, dataNew);
      dataNew.save((err, data) => {
        if (err) {
          return res.status(400).json({
            error: 'Active user failure'
          })
        }
      })
      return res.json({
        message: 'verify account successfully'
      });
    }
    return res.status(403).json({
      error: 'Email is not verified'
    })
  } catch (error) {
    return res.status(403).json({
      error
    })
  }
}

// kiển tra trạng thái active
export const checkActiveEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    })
    if (user.active) {
      next();
    } else {
      return res.status(401).json({
        error: 'Please check your email to verify your account'
      })
    }
  } catch (error) {
    return res.status(401).json({
      error: 'Please check user or password'
    })
  }
}

// đăng nhập, kiểm tra thông tin

exports.signin = (req, res) => {
  const {
    email,
    password
  } = req.body;
  User.findOne({
    email
  }).exec((err, user) => {
    if (!user || err) {
      return res.status(401).json({
        error: 'User with that email does not exist. Please signup'
      })
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: 'Email or password not match'
      })
    }

    const token = jwt.sign({
      _id: user._id
    }, process.env.JWT_SECRET, {
      expiresIn: '3600s'
    });

    res.cookie('token', token, {
      expired: new Date() + 9999
    });

    const {
      _id,
      name,
      email,
      avatar,
      birthday,
      activeStatus
    } = user;
    return res.json({
      token,
      user: {
        _id,
        email,
        name,
        avatar,
        birthday,
        activeStatus
      }
    })
  })
}

// đăng xuất
export const signout = (req, res) => {
  res.clearCookie('token');
  return res.json({
    message: 'Singout succsessfully'
  })
}


// xác nhận là user tồn tại
export const isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: 'Access Denied'
    })
  }
  next();
}
