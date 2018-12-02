import { Router } from 'express';

import { cheat as controller } from '../controllers';

const router = Router();

router.post('/', controller.create);
router.get('/', controller.get);

export default router;
