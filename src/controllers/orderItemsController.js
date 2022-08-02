import OrderItem from "../models/OrderItem";

const get = async (req, res) => {
  try {
    let { id } = req.params;
    id = id ? id.toString().replace(/\D/g, '') : null; 
  
    if (!id) {
      const response = await OrderItem.findAll({})
      if (!response[0]) {
        return res.status(200).send({
          type: 'error',
          message: `Couldn't find a order item!`,
        })
      }
      return res.status(200).send({
        type: 'sucess',
        message: `Order items retrieved successfully!`,
        data: response
      })
    }
    const response = await OrderItem.findOne({
      where: {
        id: id
      }
    })
    if (!response){
      return res.status(200).send({
        type: 'error',
        message: `Couldn't find a order item with id ${id}`,
      })
    }
    return res.status(200).send({
      type: 'sucess',
      message: `Data of order item ${id} retrieved successfully!`,
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
      return await create(req.body, res)
    }
    return await update(id, req.body, res)
  } 
  catch (error) {
    return res.status(500).send({
      type: 'error',
      message: 'An error have ocurred!',
      error: error
    })
  }
}

const create = async (data, res) => 
{
  const { quantity, price, observation, idItem, idOrder } = data;
  const response = await OrderItem.create({
    quantity: quantity,
    price: price,
    observation: observation,
    idItem: idItem,
    idOrder: idOrder

  });
  return res.status(200).send({
    type: 'sucess',
    message: `Order item created successfully!`,
    data: response
  })
}

const update = async (id, data, res) => {
  let response = await OrderItem.findOne({
      where: {
          id: id
      }
  });

  if (!response) {
    return res.status(400).send({
      type: 'error',
      message: `Couldn find a order item with id ${id} to update!` 
    })
  }
  Object.keys(data).forEach(field => {response[field] = data[field]})

  await response.save();
  return res.status(200).send({
    type: 'sucess', 
    message: `OrderItem ${id} updated successfully!`,
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
        message: 'You need send a valid id to delete the order item!'
      });
    }
    const response = await OrderItem.findOne({
      where: {
          id: id
      }
    });
    if (!response) {
      return res.status(400).send({
        type: 'error',
        message: `Couldn't find a order item with id ${id} to delete!` 
      })
    }
    await response.destroy();
    return res.status(200).send({
      type: 'sucess',
      message: `OrderItem with id ${id} deleted successfully!`
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