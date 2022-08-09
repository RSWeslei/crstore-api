import Item from "../models/Item";

const get = async (req, res) => {
  try {
    let { id } = req.params;
    id = id ? id.toString().replace(/\D/g, '') : null; 
  
    if (!id) {
      const response = await Item.findAll({})
      if (!response[0]) {
        return res.status(200).send({
          type: 'error',
          message: `Couldn't find a item!`,
        })
      }
      return res.status(200).send({
        type: 'sucess',
        message: `Items retrieved successfully!`,
        data: response
      })
    }
    const response = await Item.findOne({
      where: {
        id: id
      }
    })
    if (!response){
      return res.status(200).send({
        type: 'error',
        message: `Couldn't find an item with id ${id}`,
      })
    }
    return res.status(200).send({
      type: 'sucess',
      message: `Data of item ${id} retrieved successfully!`,
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

const getPriceById = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(200).send({
        type: 'error',
        message: `Couldn't find an item with id ${id}`,
      })
    }
    const item = await Item.findOne({
      where: {
        id: id
      }
    })
    return res.status(200).send({
      type: 'sucess',
      message: `Price of item ${id} retrieved successfully!`,
      data: item.price
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
  const { name, price, image, description, stock, idCategory } = data;
  const response = await Item.create({
    name: name,
    price: price,
    image: image,
    description: description,
    stock: stock,
    idCategory: idCategory
  });
  return res.status(200).send({
    type: 'sucess',
    message: `Item created successfully!`,
    data: response
  })
}

const update = async (id, data, res) => {
  let response = await Item.findOne({
      where: {
          id: id
      }
  });

  if (!response) {
    return res.status(400).send({
      type: 'error',
      message: `Couldn find an item with id ${id} to update!` 
    })
  }
  Object.keys(data).forEach(field => {response[field] = data[field]})

  await response.save();
  return res.status(200).send({
    type: 'sucess', 
    message: `Item ${id} updated successfully!`,
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
        message: 'You need send a valid id to delete the item!'
      });
    }
    const response = await Item.findOne({
      where: {
          id: id
      }
    });
    if (!response) {
      return res.status(400).send({
        type: 'error',
        message: `Couldn't find an item with id ${id} to delete!` 
      })
    }
    await response.destroy();
    return res.status(200).send({
      type: 'sucess',
      message: `Item with id ${id} deleted successfully!`
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
  destroy,
  getPriceById
}