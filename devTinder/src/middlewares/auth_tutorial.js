const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAuthorizedToken = token === "xyz";
  if (!isAuthorizedToken) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};


const userAuth = (req, res, next) => {
  const token = "xyz";
  const isAuthorizedToken = token === "xyz";
  if (!isAuthorizedToken) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth }