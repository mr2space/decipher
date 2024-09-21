import {express} from "express"

const router = express.Router()

router.route("/login").get();
router.route("/login").post();

router.router("/register").get();
router.router("/register").post();

export {router as authRouter};