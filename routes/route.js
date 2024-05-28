const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const dashcontroller = require('../controllers/dashcontroller');
const isAuthenticated = require('../middlewares/authentication');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // Specify the destination directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  }
});
const upload = multer({ storage: storage });

// Now use `upload` middleware in your route


router.get('/', controller.index);
router.get('/porfolio', controller.porfolio);
router.get('/services', controller.services);
router.get('/services/:servicesname', controller.services);
router.get('/contact', controller.contact);
router.post('/contact', controller.contactform);
router.get('/account', controller.login);
router.get('/lost-password', controller.lostpassword);
router.post('/login', dashcontroller.loginform);

//dashboard
router.get('/dashboard', isAuthenticated, dashcontroller.dashboard);
router.get('/logout',isAuthenticated, dashcontroller.logout);
router.get('/dashboard',isAuthenticated, dashcontroller.dashboard);

router.get('/dashboard/users',isAuthenticated, dashcontroller.users);
router.get('/dashboard/adduser',isAuthenticated, dashcontroller.addUser);
router.post('/dashboard/embedUser',isAuthenticated, dashcontroller.embedUser);
router.get('/dashboard/edituser',isAuthenticated, dashcontroller.editUser);
router.post('/dashboard/edituser',isAuthenticated, dashcontroller.editUser);

router.get('/dashboard/addservices',isAuthenticated, dashcontroller.addservices);
router.get('/dashboard/editservices',isAuthenticated, dashcontroller.editservices);
router.post('/dashboard/embedservice',isAuthenticated, dashcontroller.embedservice);
router.get('/dashboard/deleteservices',isAuthenticated, dashcontroller.deleteservices);
router.get('/dashboard/services', isAuthenticated,dashcontroller.services);

router.get('/dashboard/servicesenquiry', isAuthenticated,dashcontroller.servicesenquiry);
router.get('/dashboard/contact', isAuthenticated,dashcontroller.contact);


router.get('/dashboard/portfolio',isAuthenticated, dashcontroller.portfolio);
router.post('/dashboard/portfolio',isAuthenticated, dashcontroller.embedPortfolio);

module.exports = router;