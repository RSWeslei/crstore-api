import controller from '../controllers/paymentMethodsController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.post('/payment-methods/persist', Authenticate, controller.persist)
	app.post('/payment-methods/destroy', Authenticate, controller.destroy)
	app.get('/payment-methods', Authenticate, controller.get)
	app.get('/payment-methods/:id', Authenticate, controller.get)
}