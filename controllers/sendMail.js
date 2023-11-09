const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "webdevelop701@gmail.com",
      pass: "hbfo wwxk ptes ujph",
    },
  });

  const sendMail = async(reciever,vCode) =>{

    try {
        const info = await transporter.sendMail({
            from: 'XFOOD', // sender address
            to: reciever, // list of receivers
            subject: "Verification code", // Subject line
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap" rel="stylesheet">
                <title>email</title>
            
                <style>
                    *{
                        margin: 0px;
                        padding: 0px;
                    }
                    body{
                        background-color: #f3f2f0;
                        min-height: 100vh;
                        font-family: Poppins;
            
                    }
                    .container{
                        background: white;
                        min-height: 500px;
                        padding-bottom: 20px;
                        width: 600px;
                        margin: auto;
                        
                    }
            
                    .logo{
                        margin: auto;
                        width: 600px;
                        height: 140px;
            
                    }
                    .logo-svg{
                        width: 140px;
                        height: 140px;
                        margin: auto;
                        transform: translateX(-30px);
            
                    }
                    .section-1{
                        background:linear-gradient(#ff5f00,orange);
                        width: 100%;
                        height: 160px;
                        text-align: center;
                    }
            
                    .email-svg{
                        width: 180px;
                        height: 150px;
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
                        font-size: 15px;
                        font-weight: bold;
                        color: #56545f;
                        letter-spacing: 0.3px;
                        text-align: center  ;
            
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
            
                    @media (max-width:340px)
                    {
                        .text-2{
                            font-size: 12px;
                        }
                        .text-3{
                            font-size: 14px;
                            padding: 0px;
                        }
                    }
                    .container-2{
                        width: 600px;
                        margin: auto;
                        min-height: 200px;
                        margin-top: 0px;
                        padding-bottom: 30px;
                        background-color: #f7f7f7;
                        padding-right:20px
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
                    }
            
                    .email-text{
                        text-decoration: underline;
                        color: #4b71ce;
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
                <div class="logo">
                    <img draggable="false" class="logo-svg" src="https://res.cloudinary.com/ddivi7f83/image/upload/v1699551594/IMG-20231109-WA0014-removebg-preview_tzo5yw.png">
                 </div>
                <div class="container">
                       <div class="section-1">
                         <img draggable="false" class="email-svg" src="https://res.cloudinary.com/ddivi7f83/image/upload/v1699553251/Group_szok95.png">
                            
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
                        <p class="end-text-2">Thanks</p>
                        <p class="end-text-2">XFOOD Team</p>
                       </div>  
                </div>
                <div class="container-2">
                    <svg class="logo-svg-2" width="236.63999633789064" height="80.67272602428089" viewBox="0 0 396 135" class="css-1j8o68f"><defs id="SvgjsDefs1244"></defs><g id="SvgjsG1245" featurekey="symbolContainer" transform="matrix(0.9,0,0,0.9,0,0)" fill="#88898c"><rect xmlns="http://www.w3.org/2000/svg" width="140" height="150" rx="10" ry="10"></rect></g><g id="SvgjsG1246" featurekey="monogramFeature-0" transform="matrix(2.5617486936883673,0,0,2.5617486936883673,5.309903195638429,-31.720331554449764)" fill="#111111"><path d="M27.802 17.555 c0.36416 -1.1497 15.14 8.1732 14.192 9.069 c-4.416 5.3687 -9.0282 10.548 -13.789 15.53 c2.5036 4.8386 5.2645 9.5676 8.3154 14.143 c0.8358 1.2979 -2.9402 4.749 -4.2952 3.7658 c-3.8357 -3.4124 -7.497 -7.041 -10.998 -10.843 c-3.6508 3.577 -7.3638 7.0596 -11.127 10.455 c-1.2407 1.0919 -5.1017 -2.262 -4.3181 -3.7391 c3.1181 -4.6625 6.1332 -9.3672 9.0024 -14.125 c-4.1725 -5.0859 -8.0856 -10.424 -11.75 -15.949 c-0.8409 -0.97494 14.86 -8.6394 15.074 -7.512 c1.2159 3.551 2.5417 7.0782 3.9793 10.572 c1.997 -3.755 3.9088 -7.5414 5.7145 -11.367 z"></path></g><g id="SvgjsG1247" featurekey="nameFeature-0" transform="matrix(2.2414912702711893,0,0,2.2414912702711893,142.41336514479707,9.102778117332022)" fill="#00000"><path d="M14.74 26 l7.3808 10.544 c0.69564 0.99372 0.4538 2.363 -0.53964 3.0586 c-0.3832 0.26848 -0.82268 0.39723 -1.2575 0.39723 c-0.69256 0 -1.3736 -0.32668 -1.801 -0.93692 l-6.4636 -9.2336 l-6.4636 9.2336 c-0.42716 0.61052 -1.1088 0.93692 -1.801 0.93692 c-0.4348 0 -0.87428 -0.12875 -1.2575 -0.39723 c-0.99344 -0.69564 -1.2353 -2.0649 -0.53964 -3.0586 l7.3808 -10.544 l-7.3808 -10.544 c-0.6956 -0.99372 -0.45376 -2.363 0.53968 -3.0586 c0.994 -0.69564 2.363 -0.4538 3.0586 0.53964 l6.4636 9.2336 l6.4636 -9.2336 c0.69532 -0.99372 2.0646 -1.2356 3.0586 -0.53964 c0.99344 0.6956 1.2353 2.0648 0.53968 3.0586 z M28.2032 20.906 l8.2628 8.2628 c0.62808 0.62808 0.81584 1.5726 0.476 2.3932 s-1.1406 1.3555 -2.0289 1.3555 l-6.0666 0 l0 4.8862 c0 1.2128 -0.98328 2.196 -2.196 2.196 s-2.196 -0.98328 -2.196 -2.196 l0 -7.0824 c0 -1.2128 0.98328 -2.196 2.196 -2.196 l2.9611 0 l-4.5136 -4.5136 c-0.85784 -0.85756 -0.85784 -2.248 0 -3.1056 c0.85756 -0.85756 2.248 -0.85756 3.1056 0 z M44.355999999999995 12 c1.213 0 2.1963 0.98328 2.1963 2.196 s-0.98328 2.196 -2.196 2.196 l-12.404 0 l4.5136 4.5136 c0.85784 0.85756 0.85784 2.248 0 3.1056 c-0.4288 0.4288 -0.99072 0.64316 -1.5529 0.64316 s-1.1241 -0.21438 -1.5529 -0.64316 l-8.2628 -8.2628 c-0.62808 -0.62808 -0.81584 -1.5726 -0.476 -2.3932 s1.1406 -1.3555 2.0289 -1.3555 l17.706 0 z M56.966 12 c5.7668 0 10.459 4.692 10.459 10.459 l0 7.0824 c0 5.7668 -4.692 10.459 -10.459 10.459 c-5.7664 0 -10.458 -4.692 -10.458 -10.459 l0 -7.0824 c0 -5.7668 4.6916 -10.459 10.458 -10.459 z M63.033 29.541 l0 -7.0824 c0 -3.3452 -2.7215 -6.0668 -6.0668 -6.0668 c-3.3449 0 -6.0664 2.7215 -6.0664 6.0668 l0 7.0824 c0 3.3452 2.7215 6.0668 6.0664 6.0668 c3.3452 0 6.0668 -2.7215 6.0668 -6.0668 z M79.82 12 c5.7668 0 10.459 4.692 10.459 10.459 l0 7.0824 c0 5.7668 -4.692 10.459 -10.459 10.459 c-5.7664 0 -10.458 -4.692 -10.458 -10.459 l0 -7.0824 c0 -5.7668 4.6916 -10.459 10.458 -10.459 z M85.887 29.541 l0 -7.0824 c0 -3.3452 -2.7215 -6.0668 -6.0668 -6.0668 c-3.3449 0 -6.0664 2.7215 -6.0664 6.0668 l0 7.0824 c0 3.3452 2.7215 6.0668 6.0664 6.0668 c3.3452 0 6.0668 -2.7215 6.0668 -6.0668 z M102.675 12 c5.7668 0 10.459 4.692 10.458 10.458 l0 7.0824 c0 5.7668 -4.692 10.459 -10.459 10.459 c-0.58252 0 -1.1411 -0.23141 -1.5529 -0.64316 l-8.2628 -8.2628 c-0.85784 -0.85756 -0.85784 -2.248 0 -3.1056 c0.85756 -0.85756 2.248 -0.85756 3.1056 0 l7.5604 7.5604 c2.9441 -0.41476 5.2164 -2.9507 5.2164 -6.0072 l0 -7.0824 c0 -3.3452 -2.7215 -6.0668 -6.0668 -6.0668 l-6.0666 0 l0 3.9768 l7.6196 7.6196 c0.85784 0.85756 0.85784 2.248 0 3.1056 c-0.85756 0.85756 -2.248 0.85756 -3.1056 0 l-8.2628 -8.2628 c-0.41176 -0.41176 -0.64316 -0.9704 -0.64316 -1.5529 l0 -7.0824 c0 -1.2128 0.98328 -2.196 2.196 -2.196 l8.2627 0 z"></path></g></svg>
                    <br>
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