import controller from '../controllers/usersController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.post('/users/persistCart', Authenticate, controller.persistCart)
	app.get('/users/cartItems', Authenticate, controller.getCartItems)
	app.post('/users/register', controller.register)
	app.post('/users/login', controller.login)
	app.post('/users/destroy', Authenticate, controller.destroy)
	app.get('/users', Authenticate, controller.get)
	app.get('/users/:id', Authenticate, controller.get)
}