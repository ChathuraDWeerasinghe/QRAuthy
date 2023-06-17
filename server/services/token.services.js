import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET);
};

export const verifyToken = (req) => {
  let token = req.header("Authorization");
  token = token.slice(7, token.length).trimLeft();

  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return payload;
};
