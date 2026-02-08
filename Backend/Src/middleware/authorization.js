// Admin only
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

// Service Provider only
export const isServiceProvider = (req, res, next) => {
  if (req.user.role !== "serviceProvider") {
    return res.status(403).json({ message: "Service provider access only" });
  }
  if (req.user.accountStatus !== "active") {
    return res.status(403).json({ message: "Service provider not approved" });
  }
  next();
};

// Tourist only
export const isTourist = (req, res, next) => {
  if (req.user.role !== "tourist") {
    return res.status(403).json({ message: "Tourist access only" });
  }
  next();
};
