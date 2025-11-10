const express = require('express');
const cors = require('cors');
const { runBanglaCode } = require('./controller/BanglaToPython');
require('./config/passportSetUp')
const authRoute = require('./routers/auth_routes')
const passport = require('passport')
const session = require('express-session')

// configuration
require('dotenv').config();

const port = process.env.PORT || 5000
const app = express();

app.use(express.json());
app.use(cors({
    allowedHeaders: {
    },
    origin: [
        'https://bangla-py.vercel.app',
        'http://localhost:3000'
    ], //update cors policy
    credentials: true,
}));


app.use(
 
    session({
        secret: process.env.SESSION_SECRET || '1234',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
            httpOnly: true,              // prevents client-side JS access
            secure: false,
        },
    })
);

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

app.get('/authentication', (req, res) => {
    res.send('authentication deployed')
})

// handlimg routes
app.get('/', (req, res) => {
    res.send('App is running!');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.use('/auth', authRoute)

app.post('/toPython', runBanglaCode)

app.listen(port, () => {
    console.log(`App running on port localhost:${port}`);
});
