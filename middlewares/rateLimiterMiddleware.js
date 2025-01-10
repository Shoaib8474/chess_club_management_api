const rateLimit = require("express-rate-limit");

//Login limit for members
const memberLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min.
  max: 4,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many requests, please try again later.',
    });
  },
})

//Login limit for admins
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min.
  max: 20,
});

const dynamicRateLimiter = (req, res, next) => {
    const userRole = req.decodedToken?.role || 'member';
    console.log(`User Role: ${userRole}`);
  
    let loginLimiter;
      if (userRole === 'admin') {
        loginLimiter = adminLimiter;
      } else {
        loginLimiter = memberLimiter;
      } 
    
    loginLimiter(req, res, next);
  };



module.exports = dynamicRateLimiter;