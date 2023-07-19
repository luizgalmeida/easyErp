import UserRepository from "../models/users.js";
import {Md5} from 'ts-md5'

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
              res.json({"body":result,status:200});
            }
            else{
              res.json({"error":"No-content",status:400})
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
  
  export default { authenticate, findAll, addUser, findUser, updateUser, deleteUser };

