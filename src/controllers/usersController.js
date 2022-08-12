import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validateUser from "../utils/validateUser";

const get = async (req, res) => {
  try {
    let user = await validateUser.getUserByToken(req.headers.authorization)
    if (!user) {
      return res.status(500).send({
        type: 'error',
        message: `User not found!`,
      })
    }

    let { id } = req.params;
    id = id ? id.toString().replace(/\D/g, '') : null; 
  
    if (!user.id) {
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
        id: user.id
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
      message: `Data of user retrieved successfully!`,
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
      cpf,
      cartItems: []
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

const getCartItems = async (req, res) => {
  try {
      let user = await validateUser.getUserByToken(req.headers.authorization)
      if (!user) {
        return res.status(500).send({
          type: 'error',
          message: `User not found!`,
        })
      }
      return res.status(200).send({
        type: 'sucess',
        message: `Items from cart recovered with sucess!`,
        data: user.cartItems
      })


  } catch (error) {
    return res.status(500).send({
      type: 'error',
      message: 'An error have ocurred!',
      error: error
    })
  }
}

const persistCart = async (req, res) => {
  try {
    let user = await validateUser.getUserByToken(req.headers.authorization)
    if (!user) {
      return res.status(500).send({
        type: 'error',
        message: `User not found!`,
      })
    }

    let cartItems = user.toJSON().cartItems || [];
    const {id} = req.body
    if (id) {
      let index = 0
      for (const item of cartItems) {
        if (item.itemId == id) {
          cartItems.splice(index, 1)
          user.cartItems = cartItems;
          user.save();
          return res.status(200).send({
            type: 'sucess',
            message: `Produto removido do carrinho com sucesso!!`,
          })
        }
        index++
      }
    }
    let exist = false
    for (const item of cartItems) {
      if (item.itemId == req.body.itemId){
        let quantity = 0
        if (req.body.type == 'merge'){
          quantity = Number(req.body.savedQtd)
          console.log(req.body);
        }
        else {
          quantity = Number(item.quantity) + Number(req.body.quantity)
        }
        item.quantity = quantity,
        item.image = req.body.image,
        item.name = req.body.name
        exist = true
        break
      }
    }
    if (!exist){
      cartItems.push(req.body);
    }
    user.cartItems 
    = cartItems;
    user.save();
    return res.status(200).send({
      type: 'sucess',
      message: `Produto adicionado no carrinho com sucesso!!`,
    })
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      type: 'error',
      message: 'An error have ocurred!',
      error: error
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
  destroy,
  getCartItems,
  persistCart
}