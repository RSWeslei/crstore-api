import controller from '../controllers/itemsController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.post('/items/persist', Authenticate, controller.persist)
	app.post('/items/destroy', Authenticate, controller.destroy)
	app.get('/items', controller.get)
	app.get('/items/:id', controller.get)
}