const express = require('express');
const router  = express.Router();
const Movie = require('../models/movie');
const multer = require('multer');
const uploadCloud = require('../config/cloudinary.js');
const upload  = multer({ dest: './public/uploads/' });


/* GET home page */
router.get('/', (req, res, next) => {
  Movie.find()
  .then((movies) => {
    res.render('index', { movies });
  })
  .catch((error) => {
    console.log(error);
  });
});

router.get('/movie/add', (req, res, next) => {
  res.render('movie-add');
});

router.post('/movie/add',
  uploadCloud.single('photo'),
    (req, res, next) => {
      const { title, description } = req.body;
      const imgPath = req.file.url;
      const imgName = req.file.originalname;
      const newMovie = new Movie({title, description, imgPath, imgName});
      newMovie.save()
      .then(movie => {
        res.redirect('/');
      })
      .catch(error => {
        console.log(error);
    });
});

router.post('/upload', upload.single('photo'), function(req, res){

  const pic = new Picture({
    name: req.body.name,
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname
  });

  pic.save((err) => {
      res.redirect('/');
  });
});

// router.post('/create',
// uploadCloud.single('photo'),
// (req, res, next) => {
//   User.create({
//     username: req.body.username,
//     password: req.body.password,
//     imgPath: req.file.url
//   })
//   .then((theUser) => {
//     res.redirect('/');
//   })
//   .catch((err) => {
//     next(err);
//   });
// });



// router.post('/upload', (req, res, next) => {
//   console.log("posting to upload route");
//
// });

module.exports = router;
