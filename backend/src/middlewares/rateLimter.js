const reqMap = new Map();
const maxRequests = 10; // max requests
const timeLimit = 3000; // 3seconds

export const rateLimiter = (req, res, next) => {
  const ip = req.ip;

  if (!reqMap.has(ip)) {
    // First request from this IP
    reqMap.set(ip, { count: 1, startTime: Date.now() });
    return next();
  }

  const currentReq = reqMap.get(ip);

  // Check if time window has passed
  if (Date.now() - currentReq.startTime > timeLimit) {
    // Reset count and startTime
    reqMap.set(ip, { count: 1, startTime: Date.now() });
    return next();
  }

  // Check if max requests exceeded
  if (currentReq.count >= maxRequests) {
    return res.status(429).json({
      message: "Too many requests. Please try again later.",
    });
  }

  // Increment request count
  currentReq.count += 1;
  reqMap.set(ip, currentReq); // update the Map
  next();
};
