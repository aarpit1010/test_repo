const adminRouter = require("express").Router();
const  admin_verify = require('../controllers/admin_verifyToken');

const {
  adminLogin, 
  studentCoursesummary,
  studentdroppedcourses,
  facultyList,
  logReport,
  notifications
} 
= require("../controllers/adminController");



adminRouter.post('/login', adminLogin);

adminRouter.get('/studentmarks', admin_verify, studentCoursesummary);

adminRouter.get('/studentdroppedcourses', admin_verify, studentdroppedcourses);

adminRouter.get('/addFaculty', admin_verify, facultyList);

adminRouter.get('/generatelogs', admin_verify, logReport);

adminRouter.get('/notifications', admin_verify, notifications);


module.exports = adminRouter;

