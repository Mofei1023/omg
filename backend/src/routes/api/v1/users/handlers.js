import { user } from "../../../../../../frontend/src/services/user.js";
import { prisma } from "../../../../adapters.js";

export async function getAllUsers(req, res) {
  const allUsers = await prisma.user.findMany();
  return res.json(allUsers);
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function createOneUser(req, res) {
  console.log("in createOneUser")
  const user = await prisma.user.create({ data: { name: req.body.name, pwd: req.body.pwd } });
  return res.status(201).json(user);
}

export async function handleLogin(req,res){
  console.log("in handleLogin")
  console.log(req.body.name)
  const user = await prisma.user.findUnique({where:{ name: req.body.name}})
  console.log(user)
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
