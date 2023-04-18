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
  req.session.name = req.body.name
  return res.status(201).json(user);
}

export async function handleLogin(req,res,next){
  const user = await prisma.user.findUnique({where:{ name: req.body.name}})
  if(!user){
    return res.status(404).json({error: "Invalid Username of Password"})
  }
  else if(user.pwd != req.body.pwd){
    console.log("I am res id", res.id)
    return res.status(404).json({error: "Invalid Username of Password"})
  }
  else{
    console.log('Login Success');
    req.session.name = req.body.name;
    console.log(req.session)
    res.id = user.id
    console.log("I am res id",res.id)
    return res.json(user)
  }
}

export async function handleLogout(req,res){
  console.log("logout")
  req.session.destroy();
    return res.redirect('/user-login');
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
