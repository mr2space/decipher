import {express} from "express"



const router = express.Router();
router.route("/").get(getError)
router.route("/").post(AcceptPhoto)


export {router as imageUploadRouter};