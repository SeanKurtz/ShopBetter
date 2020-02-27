const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const User = require('./models/user');
const ItemRouter = require('./routes/ItemRouter');

const app = express();

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const MONGODB_URI = 'mongodb+srv://admin:passmesomepasscode@cluster0-mbedf.mongodb.net/test?retryWrites=true&w=majority';

app.use(express.static('dist'));
app.use('/api/items', ItemRouter);

// Redirect all server requests.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});
app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;
  console.log('Receiving request to sign up user with credentials: ');
  console.log(`${email} ${password}`);
  if (!email) {
    res.json({
      success: false,
      message: 'Error: email must not be blank'
    });
    return;
  }
  if (!password) {
    res.json({
      success: false,
      message: 'Error: password must not be blank'
    });
    return;
  }
  console.log('Checking for accounts with these credentials...');
  // Check if account already exists

  User.findOne({ email }, (err) => {
    if (err) {
      return res.json({
        success: false,
        message: err
      });
    }

    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.generateHash(password);
    console.log(`Attempting to save user with credentials ${newUser.email}, ${newUser.password}`);
    newUser.save((saveError, user) => {
      if (saveError) {
        console.log('Duplicate account exists');
        return res.json({
          success: false,
          message: 'Duplicate',

        });
      }
      console.log('Signed up.');
      return res.json({
        success: true,
        message: 'Signed up',
        user
      });
    });
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Receiving request at /api/login');
  console.log(`email: ${email} password: ${password}`);
  User.find({ email }, (err, previousUsers) => {
    console.log('found users ');
    console.log(previousUsers);
    if (err) {
      return res.send({
        success: false,
        message: 'Bad email.'
      });
    }
    if (previousUsers.length > 0) {
      // Only use first result. If more, problem verifying signup.
      const firstUserResult = previousUsers[0].toJSON();
      const passwordHash = firstUserResult.password;
      bcrypt.compare(password, passwordHash, (compareError, result) => {
        console.log(result);
        if (compareError) {
          return res.json({
            success: false,
            message: 'Bad password.'
          });
        }
        if (result) {
          return res.json({
            success: true,
            message: 'Logged in.'
          });
        }
      });
    }
  });
});

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connection established');
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
