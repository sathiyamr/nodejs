const transporter = require("../config/mailer");

const sendEmail = async (emailds) => {
  await transporter.sendMail({
    from: "sathiyamoorthy22@gmail.com",
    to: "sathiyamoorthy22photoa@gmail.com",
    subject: `Still Pending Requests from the User`,
    text: `Total, ${emailds.length} ${emailds.join(", ")}`,
  });
};


module.exports = { sendEmail };