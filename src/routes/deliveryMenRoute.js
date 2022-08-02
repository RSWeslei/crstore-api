import controller from '../controllers/deliveryMenController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.post('/delivery-men/persist', Authenticate, controller.persist)
	app.post('/delivery-men/destroy', Authenticate, controller.destroy)
	app.get('/delivery-men', Authenticate, controller.get)
	app.get('/delivery-men/:id', Authenticate, controller.get)
}