import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token Missing", token });
  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user;
    next();
  } catch (err) {
    res.json(err);
  }
};
