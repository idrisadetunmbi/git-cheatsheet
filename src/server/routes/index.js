import { Router } from 'express';
import auth from './auth';
import cheats from './cheats';
import categories from './categories';

const router = Router();

router.use('/auth', auth);
router.use('/cheats', cheats);
router.use('/categories', categories);

export default router;
