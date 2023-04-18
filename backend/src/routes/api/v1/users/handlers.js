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

/*const UserController ={
  login:(req,res)=>{
    res.render('login')
  },
  handleLogin: (req, res,next) => {
    if (req.body.password) === 'abc' {
      req.session.isLogin = true
      res.redirect('/')
    } else {
      req.flash('errorMessage', 'Please input the correct password.')
    }
  },

  // 登出: 清除 session 並導回首頁
  logout:: (req, res) => {
    req.session.isLogin = false;
    res.redirect('/');
  }
}*/

export async function handleLogin(req,res,next){
  //console.log("in handleLogin")
 // console.log(req.body.name)
  const user = await prisma.user.findUnique({where:{ name: req.body.name}})
  console.log(user)
  if(!user){
    return res.status(404).json({error: "Invalid Username of Password"})
  }
  else if(user.pwd != req.body.pwd){
    return res.status(404).json({error: "Invalid Username of Password"})
  }
  else{
    console.log('Login Success');
    req.session.name = req.body.name;
    console.log(req.session)
    res.id = user.id
    res.redirect('/')
    //return res.json(user.id)
  }
  return res.json(user.id)
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
