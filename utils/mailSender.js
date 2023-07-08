// Підключення Nodemailer
const nodemailer = require('nodemailer');

// Створення транспортера для відправки листів
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'customyier@gmail.com', // Ваша електронна пошта
    pass: process.env.NODEMAILER_PASSWORD, // Ваш пароль
  },
});

// Відправка листа
const nodeMailerFunc = (to, verificationToken) => {
  // Опції для листа
  const mailOptions = {
    from: 'customyier@gmail.com', // Ваша електронна пошта
    to, // Електронна пошта отримувача
    subject: 'Привіт, це тестовий лист!',
    text: `Привіт, \n\nЦе лише тестовий лист для перевірки відправки через Nodemailer.
    <a href="http://localhost:3000/users/verify/${verificationToken}">Token</a>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Лист відправлено: ' + info.response);
    }
  });
};

module.exports = nodeMailerFunc;
