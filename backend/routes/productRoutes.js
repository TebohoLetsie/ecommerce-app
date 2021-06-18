import express from "express"
const router = express.Router()
import {protect, admin} from '../middleware/authMiddleware.js'
import {getProductById,getProducts, getTopProduct,removeProductById,createProduct,updateProduct,createProductReview} from "../controllers/productController.js"



router.route('/').get(getProducts).post(protect,admin,createProduct)
router.route('/top').get(getTopProduct)
router.route('/:id/reviews').post(protect,createProductReview)
 router.route('/:id').get(getProductById).delete(protect,admin,removeProductById).put(protect,admin,updateProduct)


export default router;