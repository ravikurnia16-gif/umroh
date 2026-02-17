const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendVerificationEmail = async (email, token) => {
    const verificationLink = `${process.env.BASE_URL || 'http://localhost:5173'}/verify-email?token=${token}`;

    const mailOptions = {
        from: '"UmrohPedia Team" <no-reply@umrohpedia.com>',
        to: email,
        subject: 'Verifikasi Email Anda - UmrohPedia',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #059669; text-align: center;">Selamat Datang di UmrohPedia!</h2>
                <p>Halo,</p>
                <p>Terima kasih telah mendaftar. Untuk mengaktifkan akun Anda, silakan klik tombol di bawah ini:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${verificationLink}" style="background-color: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verifikasi Email Saya</a>
                </div>
                <p>Atau salin tautan berikut ke browser Anda:</p>
                <p style="color: #666; font-size: 12px;">${verificationLink}</p>
                <p>Tautan ini akan kedaluwarsa dalam 24 jam.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #999; text-align: center;">Jika Anda tidak merasa mendaftar di UmrohPedia, silakan abaikan email ini.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${email}`);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

module.exports = { sendVerificationEmail };
