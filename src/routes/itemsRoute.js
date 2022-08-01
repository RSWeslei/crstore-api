import controller from '../controllers/itemsController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.get('/itens/:id', /*Authenticate,*/ controller.getById)
	app.get('/itens', /*Authenticate,*/ controller.getAll)
	app.post('/itens/persist', /*Authenticate,*/ controller.persist)
	app.post('/itens/destroy', /*Authenticate,*/ controller.destroy)
}
/*
A	DW
*/