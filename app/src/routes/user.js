import Router from 'express';
import userController from '../controllers/user';

const router = Router();

router.get('/', (req, res) => {
  res.json('User route');
});

router.post('/register', userController.store);
router.post('/auth', userController.auth);

export default router;
