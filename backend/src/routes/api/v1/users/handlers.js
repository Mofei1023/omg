import { prisma } from "../../../../adapters.js";
import { generateToken } from "../../../../csrf.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/*export async function getAllUsers(req, res) {
  const allUsers = await prisma.user.findMany();
  return res.json(allUsers);
}*/

function generateToken2(userId) {
  const payload = { userId };
  const secret = 'your-secret-key';
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, secret, options);
}

/**
* @param {import('express').Request} req
* @param {import('express').Response} res
*/
export async function createOneUser(req, res) {
  try {
    console.log("✅ Received create user body:", req.body);

    const hashedPwd = await bcrypt.hash(req.body.pwd, 10);

    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        pwd: hashedPwd,
        img: req.body.img
      }
    });

    console.log("✅ Created user:", user);
    return res.status(201).json(user);

  } catch (error) {
    console.error("❌ Error while creating user:", error);
    if (error.code === 'P2002') {
      return res.status(409).json({ error: "Username already exists." });
    }
    return res.status(500).json({ error: "Create user failed", detail: error.message });
  }
}

/**
* @param {import('express').Request} req
* @param {import('express').Response} res
*/
export async function login(req, res) {
  const { username, pwd } = req.body;
  const user = await prisma.user.findUnique({ where: { name: username } });

  if (user === null) {
    return res.status(404).json({ error: "Invalid username or password" });
  }

  const isValid = await bcrypt.compare(pwd, user.pwd);
  if (!isValid) {
    return res.status(404).json({ error: "Invalid username or password" });
  }

  // ✅ 登入成功：寫入 session
  req.session.userId = user.id;

  const token = generateToken2(user.id); // 你如果還有用 JWT 就保留這行
  return res.json({ user, token });
}


/**
* @param {import('express').Request} req
* @param {import('express').Response} res
*/
export async function getOneUser(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  const user = await prisma.user.findUnique({ where: { id } });
  if (user === null) return res.status(404).json({ error: "Not Found" });
  return res.json(user);
}

/**
* @param {import('express').Request} req
* @param {import('express').Response} res
*/
export async function getCsrfToken(req, res) {
  const csrfToken = generateToken(res, req);
  req.session.init = true;
  res.json({ csrfToken });
}
