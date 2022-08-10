import Item from "../models/Item";
import Order from "../models/Order";
import validateUser from "../utils/validateUser";

const get = async (req, res) => {
  try {
    let { id } = req.params;
    id = id ? id.toString().replace(/\D/g, '') : null; 
  
    if (!id) {
      const response = await Order.findAll({})
      if (!response[0]) {
        return res.status(200).send({
          type: 'error',
          message: `Couldn't find an order!`,
        })
      }
      return res.status(200).send({
        type: 'sucess',
        message: `Orders retrieved successfully!`,
        data: response
      })
    }
    const response = await Order.findOne({
      where: {
        id: id
      }
    })
    if (!response){
      return res.status(200).send({
        type: 'error',
        message: `Couldn't find an order with id ${id}`,
      })
    }
    return res.status(200).send({
      type: 'sucess',
      message: `Data of order ${id} retrieved successfully!`,
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

const persist = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return await create(req, res)
    }
    return await update(id, req.body, res)
  } 
  catch (error) {
    return res.status(500).send({
      type: 'error',
      message: 'An error have ocurred!',
      error: error.message
    })
  }
}

const create = async (data, res) => 
{
  let user = await validateUser.getUserByToken(data.headers.authorization)
  
  if (!user) {
    return res.status(500).send({
      type: 'error',
      message: `An error have ocurred!`,
    })
  }

  let { totalPrice, status, coupon, idPaymentMethod, idDeliveryMan, idCustomer } = data.body;

  let cartItems = await user.cartItems
  let totalPriceDb = 0
  for (const item of cartItems) {
    console.log(item.itemId);
    let itemDb = await Item.findOne({
      where: {
        id: item.itemId
      }
    })
    totalPriceDb += Number(itemDb.price) * Number(item.quantity)
  }

  if (totalPrice != totalPriceDb) {
    return res.status(200).send({
      type: 'error',
      message: `Algo deu errado...`,
    })
  }
  
  console.log("\n\n\n" + totalPriceDb);
  status = idPaymentMethod == 1 ? 'Pendente' : idPaymentMethod == 2 ? 'Pago' : 'Pago'

  // let { totalPrice, status, coupon, idPaymentMethod, idDeliveryMan} = data

  const response = await Order.create({
    totalPrice: totalPrice,
    status: status,
    coupon: coupon,
    idPaymentMethod: idPaymentMethod,
    idDeliveryMan: idDeliveryMan,
    idCustomer: idCustomer
  });
  return res.status(200).send({
    type: 'sucess',
    message: `Order created successfully!`,
    data: response
  })
}

const update = async (id, data, res) => {
  let response = await Order.findOne({
      where: {
          id: id
      }
  });

  if (!response) {
    return res.status(400).send({
      type: 'error',
      message: `Couldn find an order with id ${id} to update!` 
    })
  }
  Object.keys(data).forEach(field => {response[field] = data[field]})

  await response.save();
  return res.status(200).send({
    type: 'sucess', 
    message: `Order ${id} updated successfully!`,
    data: response
  });
}

const destroy = async (req, res) => {
  try {
    let { id } = req.body;
    id = id ? id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(400).send({
        type: 'error',
        message: 'You need send an valid id to delete the order!'
      });
    }
    const response = await Order.findOne({
      where: {
          id: id
      }
    });
    if (!response) {
      return res.status(400).send({
        type: 'error',
        message: `Couldn't find an order with id ${id} to delete!` 
      })
    }
    await response.destroy();
    return res.status(200).send({
      type: 'sucess',
      message: `Order with id ${id} deleted successfully!`
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
  persist,
  destroy
}