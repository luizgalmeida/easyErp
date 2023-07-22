import UserRepository from "../models/users.js";
import {Md5} from 'ts-md5'
import { Op } from "sequelize";

async function authenticate(req, res) {
    if ((!req.body.email || !req.body.password)){
        res.json({"error":"No-content",status:400})
    }
    else{
      let password = Md5.hashStr(req.body.password)
      console.log(password)
        UserRepository.findOne({ where: { email: req.body.email , password: password, active: 1 } }).then(
          (result) => {
            if (result){
              res.json({"data":result,status:200});
            }
            else{
              res.status(400).json({"error":"No-content",status:400})
            }
          })
          
    }
    
}

async function findAll(req, res) {
  const users = await UserRepository.findAll();
  res.json(users);
}
function findUser(req, res) {
    UserRepository.findByPk(req.params.userId).then((result) => res.json(result));
}
  
  function addUser(req, res) {
    UserRepository.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }).then((result) => res.json(result));
  }
  
  function filter(req, res) {
    
    const limit = req.body.per_page;
    const offset = (req.body.page - 1) * limit;
    UserRepository.findAndCountAll({
      where: {
        [Op.or]: [
          {
            name:{
              [Op.substring]: req.body.value
            }
          },
          {
            email:{
              [Op.substring]: req.body.value
            }
          } 
      ]},
      name: req.body.name,
      limit: limit,
      offset: offset,
    }).then((result) => res.json({"data":result,status:200}))
  }

  async function updateUser(req, res) {
    await UserRepository.update(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
      {
        where: {
          userId: req.params.userId,
        },
      }
    );
  
    UserRepository.findByPk(req.params.userId).then((result) => res.json(result));
  }
  
  async function deleteUser(req, res) {
    await UserRepository.destroy({
      where: {
        userId: req.params.userId,
      },
    });
  
    UserRepository.findAll().then((result) => res.json(result));
  }
  
  export default { authenticate, findAll, addUser, findUser, updateUser, deleteUser,filter };

