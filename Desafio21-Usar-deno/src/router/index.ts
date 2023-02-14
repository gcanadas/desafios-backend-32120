import { Router } from "../../deps.ts";
import { home, color } from "../handler/index.ts";

export const router = new Router();

router.get('/', home);
router.post('/', color);