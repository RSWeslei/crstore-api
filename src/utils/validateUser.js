import User from "../models/User";
import jwt from "jsonwebtoken";

const getUserByToken = async (authorization) => {
  try {
    if (!authorization) {
      return null;
    }
    
    const token = authorization.split(' ')[1] || null;
    const decodedToken = jwt.decode(token);
    
    if (!decodedToken) {
      return null;
    }
  
    let user = await User.findOne({
      where: {
        id: decodedToken.userId
      }
    })

    if (!user) {
      return null;
    }
    return user;
    
  } catch (error) {
    console.log(error.message);
  }
}

const validateUserToken = async (req, res) => {
  try {
    if (!req.headers) {
      return res.status(500).send({
        type: 'error',
        message: `Erro`,
        data: false
      })
    }

    const token = authorization.split(' ')[1] || null;
    const decodedToken = jwt.decode(token);

    if (!decodedToken) {
      return res.status(500).send({
        type: 'error',
        message: `Token inválido!`,
        data: false
      })
    }
  
    let user = await User.findOne({
      where: {
        id: decodedToken.userId
      }
    })

    if (!user) {
      return res.status(500).send({
        type: 'error',
        message: `Token não é válido!`,
        data: false
      })
    }
    return res.status(200).send({
      type: 'sucess',
      message: `Usuário válido!`,
      data: true
    })

  } catch (error) {
    return res.status(500).send({
      type: 'error',
      message: 'Ocorreu um erro',
      data: false
    })
  }
}

export default {getUserByToken, validateUserToken}