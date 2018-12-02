import { Router } from 'express';

import { category as controller } from '../controllers';

const router = Router();

router.post('/', controller.create);
router.get('/', controller.get);

export default router;
