const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "webdevelop701@gmail.com",
      pass: "hbfo wwxk ptes ujph",
    },
  });

  const sendMail = async(reciever,vCode) =>{

    try {
        const info = await transporter.sendMail({
            from: 'XFOOD <webdevelop701@gmail.com>', 
            to: reciever, 
            subject: "Verification code", 
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap" rel="stylesheet">
                <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Poppins:wght@400;500&display=swap" rel="stylesheet">
                <title>email</title>
            
                <style>
                    *{
                        margin: 0px;
                        padding: 0px;
                    }
                    body{
                        background-color: #f3f2f0;
                        min-height: 100vh;
                        font-family: sans-serif;
                        padding-top: 30px;
            
                    }
                    .container{
                        background: white;
                        min-height: 400px;
                        padding-bottom: 20px;
                        width: 600px;
                        margin: auto;
                        
                    }
            
                    .logo{
                        margin: auto;
                        width: 600px;
                        height: 100px;
            
                    }
                    .logo-svg{
                        width: 100px;
                        height: 100px;
            
                    }
                    .section-1{
                        background:linear-gradient(#ff5f00,orange);
                        width: 100%;
                        height: 130px;
                        text-align: center;
                    }
            
                    .email-svg{
                        width: 130px;
                        height: 120px;
                        margin-top: 4px;
                    }
                    .section-2{
            
                        text-align: center;
                        padding-top: 20px;
            
                    }
                    .text-1{
                        font-size: 20px;
                        font-weight: bold;
                        letter-spacing: 0.3px;
                    }
                    .text-2{
                        font-size: 15px;
                        font-weight: bold;
                        color: #56545f;
                        padding-left: 20px;
                        padding-right: 20px;
                        margin-top: 20px;
                        letter-spacing: 0.3px;
                    }
                    .text-3{
                        font-size: 15px;
                        font-weight: bold;
                        color: black;
                        padding-left: 50px;
                        padding-right: 50px;
                        margin-top: 20px;
                        letter-spacing: 0.3px;
                        text-align: center  ;
            
                    }
                    .code{
                        color: #ff5f00;
                        letter-spacing: 7px;
                        margin-top: 20px;
                        font-size: 40px;
                        text-align: center  ;
                    }
                    .end-text{
                        font-size: 15px;
                        font-weight: bold;
                        color: #56545f;
                        letter-spacing: 0.3px;
                        text-align: center  ;
            
                    }
                    .end-text-2{
                        font-size: 13px;
                        font-weight: bold;
                        color: #56545f;
                        letter-spacing: 0.3px;
                        text-align:left  ;
                        padding-left: 20px;
                        margin-top: 20px;
                        transform: translateY(10px);
                        color: #ff5f00;
                        font-family: cursive;
            
                    }
                    
            
                    @media (max-width:386px)
                    {
                        .text-1{
                            font-size: 17px;
                        }
                        .text-2{
                            font-size: 14px;
                        }
                        .email-svg{
                            width: 120px;
                            height: 110px;
                            margin-top: 5px;
                        }
                        .logo-svg{
                            width: 140px;
                        }
                        .section-1{
                            height: 120px;
                        }
                        .code{
                            font-size: 34px;
                        }
                        .container{
                            height: 200px;
                        }
                    }
                    .email-svg{
                        height: 90px;
                        width: 100px;
            
                    }
            
                    @media (max-width:340px)
                    {
                        .text-2{
                            font-size: 12px;
                        }
                        .text-3{
                            font-size: 14px;
                            padding: 0px;
                        }
                        .email-svg{
                            height: 90px;
                            width: 100px;
                
                        }
                    }
                    .container-2{
                        width: 600px;
                        margin: auto;
                        min-height: 200px;
                        margin-top: 0px;
                        padding-bottom: 30px;
                        background-color: #f7f7f7;
                    }
            
                    .logo-svg-2{
                        width: 100px;
                        margin-left: 30px;
                    }
            
                    .space{
                        padding-left: 26px;
                        padding-right: 26px;
            
                    }
            
            
                    .platforms{
                        padding-left: 30px;
                        padding-right:30px;
                        font-family: Poppins;
                        font-size: 14px;
                        color: #898a8d;
                        word-spacing: 2px;
                    }
            
                    .plat{
                        color: #6d6c6b;
                        font-weight: bold   ;
                    }
                    .user-email{
                        padding-left: 30px;
                        font-family: Poppins;
                        font-size: 14px;
                        color: #616262;
                        word-spacing: 2px;
                        line-height: 30px;
                    }
            
                    .email-text{
                        text-decoration: underline;
                        color: #4b71ce;
                    }
            
                    .section-1{
                        height: 100px;
                        padding: 0px;
                        margin: 0px;
                    }
               
            
                    @media (max-width:616px)
                    {
                        .container,.logo,.container-2{
                            width: 97%;
                        }
                    }
                </style>
            
            </head>
            <body>
                
                <div class="container">
                       <div class="section-1">
                         <img draggable="false" class="email-svg" src="https://res.cloudinary.com/ddivi7f83/image/upload/v1701291172/unnamed_1_cfcazf.png">
                            
                       </div>
                       <div class="section-2">
                        <p class="text-1">Verify your E-mail Address</p>
                        <p class="text-2">Please confirm that you want to use this as your XFOOD account.
                            Once it's done you'll be able to make orders !
                        </p>
                        <br>
                        <p class="text-3">Here's the confirmation code :</p>
                        <h1 class="code">${vCode}</h1>
                        <br />
                        <p class="end-text-2">Thanks, XFOOD Team</p>
                       </div>  
                </div>
                <div class="container-2">
                    <div class="logo">
                        <img draggable="false" class="logo-svg" src="https://res.cloudinary.com/ddivi7f83/image/upload/v1701291186/IMG-20231109-WA0014-removebg-preview_dpwvge.png">
                     </div>        
                    <div class="space">
                        <hr />
                    </div>
                    <br>
                    <div class="platforms">
                        <p>
                            Get XFOOD for: <span class="plat">iPhone</span> | <span class="plat">iPad</span> | <span class="plat">Android</span>
                        </p>
                    </div> 
                    <br>
                    <div class="space">
                        <hr />
                    </div>
                    <br>
                    <div class="user-email">
                        This message was sent to <span class="email-text">${reciever}</span>. If you have questions or complaints, please contact us.
                    </div> 
                </div>
            </body>
            </html>`, // html body
          });

          
    } catch (error) {
        console.log(error)
    }
      
  }

  module.exports = sendMail