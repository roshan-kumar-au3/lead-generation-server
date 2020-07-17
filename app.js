require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

//My Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const leadRoutes = require('./routes/lead');
const funnelRoutes = require('./routes/funnel');

// Mongo Db connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED");
}).catch((err) => {
    console.log(`DB NOT CONNECTED :( `);
});

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());



// My Routes

app.use("/api", authRoutes);

app.use("/api", userRoutes);

app.use("/api", leadRoutes);

app.use("/api", funnelRoutes);

// Port
const port = process.env.PORT || 8000;


app.listen(port, () => {
    console.log(`Server started at port ${port}`)
});