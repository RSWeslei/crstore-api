import DeliveryMan from "../models/DeliveryMan";

const get = async (req, res) => {
  try {
    let { id } = req.params;
    id = id ? id.toString().replace(/\D/g, '') : null; 
  
    if (!id) {
      const response = await DeliveryMan.findAll({})
      if (!response[0]) {
        return res.status(200).send({
          type: 'error',
          message: `Couldn't find a delivery man!`,
        })
      }
      return res.status(200).send({
        type: 'sucess',
        message: `Delivery men retrieved successfully!`,
        data: response
      })
    }
    const response = await DeliveryMan.findOne({
      where: {
        id: id
      }
    })
    if (!response){
      return res.status(200).send({
        type: 'error',
        message: `Couldn't find a delivery man with id ${id}`,
      })
    }
    return res.status(200).send({
      type: 'sucess',
      message: `Data of delivery man ${id} retrieved successfully!`,
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
  const { balance, idUser } = data;
  const response = await DeliveryMan.create({
    idUser: idUser,
    balance: balance
  });
  return res.status(200).send({
    type: 'sucess',
    message: `Delivery man created successfully!`,
    data: response
  })
}

const update = async (id, data, res) => {
  let response = await DeliveryMan.findOne({
      where: {
        id: id
      }
  });

  if (!response) {
    return res.status(400).send({
      type: 'error',
      message: `Couldn find a delivery man with id ${id} to update!` 
    })
  }
  Object.keys(data).forEach(field => {response[field] = data[field]})

  await response.save();
  return res.status(200).send({
    type: 'sucess', 
    message: `DeliveryMan ${id} updated successfully!`,
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
        message: 'You need send a valid id to delete the delivery man!'
      });
    }
    const response = await DeliveryMan.findOne({
      where: {
          id: id
      }
    });
    if (!response) {
      return res.status(400).send({
        type: 'error',
        message: `Couldn't find a delivery man with id ${id} to delete!` 
      })
    }
    await response.destroy();
    return res.status(200).send({
      type: 'sucess',
      message: `DeliveryMan with id ${id} deleted successfully!`
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