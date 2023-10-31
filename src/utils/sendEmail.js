import nodemailer from 'nodemailer'

export default async function  sendEmail({
    to,
    template,
    subject
})
{
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465, // Use 587 if you prefer TLS
        secure: true, // Use false if you're using 587
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    })

    await transporter.sendMail({
        from: process.env.EMAIL,
        to,
        html: template,
        subject
    })
}