const nodemailer = require('nodemailer')

const sendEmail = async (email, title, body)=>{
    try {
        //we must first create a transporter
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST, //this means through whom are we sending this mail
            port: process.env.MAIL_PORT, //this is the port number of the host
            secure: false, //this means we are not using a secure connection. If we were using a secure connection, we would set this to true.
            auth: {
                user: process.env.MAIL_USER, //who is sending the mail? in this case, me.
                pass: process.env.MAIL_PASSWORD // password/credential for my sending account
            }
        })

        // to send the mail
        const info = await transporter.sendMail({
            from: 'Heritage Blog App', //Not authenticate. It is simply what the recipient sees as sender.
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        })
        return info
    } catch (error) {
        console.log('error is:', error)
        throw error
    }

}


module.exports = {sendEmail}