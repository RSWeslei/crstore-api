import Item from "../models/Item";

const getById = async (req, res) => {
  try {
    let { id } = req.params
    let response = await Item.findOne({
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
      message: `Data of utem ${id} retrieved with sucess!`,
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

const getAll = async (req, res) => {
  try {
    let response = await Item.findAll({})
    if (!response) {
      return res.status(200).send({
        type: 'error',
        message: `Couldn't find an item!`,
      })
    }
    return res.status(200).send({
      type: 'sucess',
      message: `Itens retrieved with sucess!`,
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
    const { id } = req.params;
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
  const { name, price, flavors, image, description, stock } = data;
  const response = await Item.create({
    name: name,
    price: price,
    flavors: flavors,
    image: image,
    description: description,
    stock: stock
  });
  return res.status(200).send({
    type: 'sucess',
    message: `Itens created with sucess!`,
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
    message: `Item ${id} updated with sucess!`,
    data: response
  });
}

const destroy = async (req, res) => {
  try {
    const { id } = req.body;
    id = id ? id.toString().replace(/\D/g, '') : null;
    if (!id) {
        return res.status(400).send({
          type: 'error',
          message: 'You need send a valid id to delete the item!'
        });
    }

    const response = await Item.findOne({
        where: {
            id
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
      message: `Item with id ${id} deleted with sucess!`
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
  getById,
  getAll,
  persist,
  destroy
}