import controller from '../controllers/addressesController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.post('/addresses/persist', Authenticate, controller.persist)
	app.post('/addresses/destroy', Authenticate, controller.destroy)
	app.get('/addresses', Authenticate, controller.get)
	app.get('/addresses/:id', Authenticate, controller.get)
}