import nodemailer from "nodemailer";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Create a transporter with Gmail credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "stocktracking46@gmail.com",
    pass: "ofun hqhp xlfm izur",
  },
});

// Wrap in an async IIFE so we can use await.
async function SendEmail(Client_email, subject, text ){
    const info = await transporter.sendMail({
        from: '"Stock tracker" <stocktracking46@gmail.com>',
        to: Client_email,
        subject: subject,
        text: text, // plain‑text body
    });

    console.log("Message sent:", info.messageId);

    return info.messageId;
}

async function TwoStep(Client_email) {
    const subject = 'Stock tracker verification';
    const code = getRandomInt(1000, 9999);
    const text = `Hello,\n\nYour verification code is: ${code}\n\nPlease enter this code to complete your registration.\n\nBest regards,\nStock Tracker Team`;
    const id = await SendEmail(Client_email, subject, text );
    const info = [id, code];
    return info;
}

// (async () => {
//     const Client_email = 'mo1motala@gmail.com';
//     const l = await TwoStep(Client_email);
//     console.log(l);
// })();

export { SendEmail, TwoStep };