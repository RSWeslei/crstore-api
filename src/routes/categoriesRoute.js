import controller from '../controllers/categoriesController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.post('/categories/persist', Authenticate, controller.persist)
	app.post('/categories/destroy', Authenticate, controller.destroy)
	app.get('/categories', controller.get)
	app.get('/categories/:id', controller.get)
}