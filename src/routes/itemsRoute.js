import controller from '../controllers/itemsController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.get('/items/price/:id', controller.getPriceById)
	app.post('/items/persist', Authenticate, controller.persist)
	app.post('/items/destroy', Authenticate, controller.destroy)
	app.get('/items', controller.get)
	app.get('/items/:id', controller.get)
}