import db from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Login/Register management
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Create a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User is registered
 */
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const encrypted_password = await bcrypt.hash(password, 10);

  try {
    const user = await db.User.create({
      name: name,
      email: email,
      password: encrypted_password,
    });
    return res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in as a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User log in successfully
 */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.User.findOne({ where: { email } });
    if (!result) {
      return res.status(401).json({ error: "Authentication Failed", result });
    }
    const passwordInDB = result.password;

    let isPasswordValid = await bcrypt.compare(password, passwordInDB);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Authentication Failed",
      });
    }
    let payload = {
      userId: result.id,
      name: result.name,
    };
    let JWT_token = jwt.sign(payload, process.env.SECRET_KEY);

    return res.json({
      "JWT Token": JWT_token,
      Message: "Authentication successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Authentication]
 *     responses:
 *       201:
 *         description: List of users
 */
export const getUsers = async (req, res) => {
  try {
    const result = await db.User.findAll();
    res.json(result);
  } catch (err) {
    console.error(err);
  }
};
