import jwt from "jsonwebtoken";
import User from "../models/User";

export default async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(200).send({
        type: 'error',
        message: 'Token não informado'
      })
    }

    const token = authorization.split(' ')[1] || null;
    const decodedToken = jwt.decode(token);
    
    if (!decodedToken) {
      return res.status(200).send({
        type: 'error',
        message: 'Você não tem permissão para acessar esse recurso!'
      })
    }

    if (decodedToken.exp < (Date.now() / 1000)) {
      return res.status(200).send({
        type: 'error',
        message: 'Sua sessão expirou! Faça login novamente'
      })
    }

    let onlyAdminPaths = [
      // Item
      '/items/destroy',
      '/items/persist',
      // User
      '/users',
      '/users/:id',
      '/users/destroy',
      // Category
      '/categories/persist',
      '/categories/destroy',
      // Address
      '/addresses/:id',
      '/addresses',
      '/addresses/persist',
      '/addresses/destroy',
      // Customer
      '/customers/:id',
      '/customers',
      '/customers/persist',
      '/customers/destroy',
      // Delivery man
      '/delivery-men/:id',
      '/delivery-men',
      '/delivery-men/persist',
      '/delivery-men/destroy'
    ];

    const user = await User.findOne({
      where: {
        id: decodedToken.userId
      }
    })

    if (!user) {
      return res.status(200).send({
        type: 'error',
        message: 'Usuário não encontrado'
      })
    }

    if (user.role !== 'admin' && onlyAdminPaths.includes(req.route.path)) {
      return res.status(200).send({
        type: 'error',
        message: 'Você não tem permissão para acessar esse recurso!'
      })
    }

    return next();
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ocorreu um problema!'
    })
  }
};