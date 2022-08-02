import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const get = async (req, res) => {
  try {
    let { id } = req.params;
    id = id ? id.toString().replace(/\D/g, '') : null; 
  
    if (!id) {
      const response = await User.findAll({})
      if (!response[0]) {
        return res.status(200).send({
          type: 'error',
          message: `Couldn't find an user!`,
        })
      }
      return res.status(200).send({
        type: 'sucess',
        message: `Users retrieved successfully!`,
        data: response
      })
    }
    const response = await User.findOne({
      where: {
        id: id
      }
    })
    if (!response){
      return res.status(200).send({
        type: 'error',
        message: `Couldn't find an user with id ${id}`,
      })
    }
    return res.status(200).send({
      type: 'sucess',
      message: `Data of user ${id} retrieved successfully!`,
      data: response
    })
  } catch (error) {
    return res.status(500).send({
      type: 'error',
      message: 'An error have ocurred!',
      error: error
    })
  }
}

const register = async (req, res) => {
  try {
    const { username, name, phone, password, role, cpf } = req.body;

    let userExists = await User.findOne({
      where: {
        username
      }
    });

    if (userExists) {
      return res.status(200).send({
        type: 'error',
        message: 'There is already a registered user with this username!'
      });
    }

    let passwordHash = await bcrypt.hash(password, 10);
    let response = await User.create({
      username,
      name,
      phone,
      passwordHash,
      role,
      cpf
    });

    return res.status(200).send({
      type: 'success',
      message: 'User registered successfully!',
      data: response
    });
  } catch (error) {
    return res.status(500).send({
      type: 'error',
      message: 'An error have ocurred!',
      error: error.message
    })
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({
      where: {
        username
      }
    });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(200).send({
        type: 'error',
        message: 'Incorrect username or password!'
      });
    }

    let token = jwt.sign(
      { userId: user.id, username: user.username }, //payload - dados utilizados na criacao do token
      process.env.TOKEN_KEY, //chave PRIVADA da aplicação 
      { expiresIn: '1h' } //options ... em quanto tempo ele expira...
    );

    user.token = token;
    await user.save();

    return res.status(200).send({
      type: 'success',
      message: 'Welcome! Login successfully!',
      token
    });
  } catch (error) {
    return res.status(500).send({
      type: 'error',
      message: 'An error have ocurred!',
      error: error.message
    })
  }

}
const destroy = async (req, res) => {
  try {
    let { id } = req.body;
    id = id ? id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(400).send({
        type: 'error',
        message: 'You need send a valid id to delete the user!'
      });
    }
    const response = await User.findOne({
      where: {
          id: id
      }
    });
    if (!response) {
      return res.status(400).send({
        type: 'error',
        message: `Couldn't find an user with id ${id} to delete!` 
      })
    }
    await response.destroy();
    return res.status(200).send({
      type: 'sucess',
      message: `User with id ${id} deleted successfully!`
    })
  } 
  catch (error) {
    return res.status(500).send({
      type: 'error',
      message: 'An error have ocurred!',
      error: error
    })
  }
}

export default {
  get,
  register,
  login,
  destroy
}