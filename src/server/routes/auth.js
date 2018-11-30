import { Router } from 'express';
import { auth as controller } from '../controllers';

const router = Router();

router.post('/signup', controller.signUp);
router.post('/signin', controller.signIn);

export default router;
