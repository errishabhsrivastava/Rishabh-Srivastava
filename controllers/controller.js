const Enquiry = require('../models/enquiry');
const Services = require('../models/services');
const mailer = require('../controllers/mailcontroller');

exports.index = async (req, res) => {
    const services = await Services.find();
    res.render('index', { service: services });
}
exports.porfolio = async (req, res) => {
    res.render('porfolio');
}


exports.services = async (req, res) => {
    const servicesname = req.params.servicesname;
   try {
        let services;
        if (servicesname) {
            services = await Services.findOne({ name: servicesname });
            if (!services) {
                res.render('services');
            }
            res.render('servicesdetails', { service: services });
        } else {
            services = await Services.find();
            res.render('services', { service: services });
        }
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).render('error');
    }
};

exports.contact = async (req, res) => {
    res.render('contact');
}
exports.contactform = async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
      const enquiry = new Enquiry(data); 
      await enquiry.save();
      console.log(enquiry);
      mailer.sendEmail(enquiry.email?enquiry.email:'', 'Thanks for showing intrest', `
      <p>Hello  ${enquiry.name},</p>
                     <p>Thanks for showing intrest. our representative call you back shortly <br> Thanks and Regards <br> Twins Brothers Threapy.</p>
                     `);
      res.redirect(req.headers.referer || '/');
      console.log('Enquiry submitted successfully!');
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      res.status(500).send('An error occurred while processing your enquiry.');
    }
  };
// Controller function


exports.login = async (req, res) => {
    if (req.session && req.session.isLoggedIn) {
        // Session is active, render dashboard
        res.redirect('dashboard');
    } else {
        res.render('login');
    }
}
exports.lostpassword = async (req, res) => {
    res.render('lost-password');
}
module.exports = exports;