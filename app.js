const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageController');

const app = express();

//Connect DB
// mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db', {
mongoose.connect('mongodb+srv://utku:123123123@cluster0.apd8s22.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify: false,
}).then(() => {
  console.log('DB CONNECT')
}).catch((err) => {
  console.log(err)
})

//TEMPLATE ENGİNE
app.set('view engine', 'ejs');

//MiddleWares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//ROUTES
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);

app.get('/add', pageController.getAddPage);

app.get('/photos/edit/:id', pageController.getEditPage);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Sunucu ${port} unda başlatıldı`);
});
