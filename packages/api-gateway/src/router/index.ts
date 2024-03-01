import express, {Request, Response} from 'express';
import * as restaurantController from '../controllers/RestaurantController';

const router = express.Router();

router.get('/', (req: Request, res: Response) => res.send('LINE MAN Wongnai Frontend Assignment'));
router.get('/restaurants/:restaurantId', restaurantController.getRestaurantById);
router.get('/restaurants/:restaurantId/menu/:menuName', restaurantController.getMenuByName);

export default router;