import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

//@desc Fetch ALL PRODUCTS
//route  GET  /api/products
//access public

const getProducts = asyncHandler(async(req,res)=>{
    const pageSize = 6
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword ?{
        name:{
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1))
    
    res.json({products,page,pages: Math.ceil(count / pageSize)})
})

//@desc Fetch SINGLE PRODUCTS
//route  GET  /api/products/:id
//access public
const getProductById = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
       res.json(product)
    }
    else{
        res.status(404).json({message: "Product not found"})
    }
})

//@desc delete SINGLE PRODUCTS
//route  delete  /api/products/:id
//access private
const removeProductById = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
       await product.remove()
       res.json({message: "product removed"})
    }
    else{
        res.status(404).json({message: "Product not found"})
    }
})

//@desc create products
//route  post /api/products/:id
//access private
const createProduct = asyncHandler(async(req,res)=>{
    const product = new Product({
        name: "sample name",
        price: 0,
        user: req.user._id,
        image: '/image/sample.jpg',
        brand: 'sample brand',
        category: 'sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'description'


    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async(req,res)=>{
   const{name,price,image,brand,category,countInStock,description} = req.body

   const product = await Product.findById(req.params.id)
   
   if(product){

    product.name = name
    product.price = price 
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    product.description = description
    
     const updatedProduct = await product.save()
     res.status(201).json(updatedProduct)
   }
   else{
       res.status(401)
       throw new Error("product not found")
   }

   
})


const createProductReview = asyncHandler(async(req,res)=>{
    const{rating, comment} = req.body
 
    const product = await Product.findById(req.params.id)
    
    if(product){
 
     const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

     if(alreadyReviewed){
         res.status(400)
         throw new Error('Product already reviewed')
     }

     const review = {
         name: req.user.name,
         rating: Number(rating),
         comment,
         user: req.user._id 
     }

     product.reviews.push(review)

     product.numReviews = product.reviews.length

     product.rating = product.reviews.reduce((acc,item) => item.rating + acc,0)/product.reviews.length

     await product.save()
     res.status(201).json({message: "review added"})
    }
    else{
        res.status(401)
        throw new Error("product not found")
    }
 
    
 })

 const getTopProduct = asyncHandler(async(req,res)=>{
     
     const products = await Product.find({}).sort({rating: -1}).limit(3)

     res.json(products)
    
})





export {getProducts,getProductById,removeProductById,createProduct,updateProduct,
    getTopProduct,createProductReview};
