const express = require('express')
const app = express()
const port = 3002


app.use(express.json())

app.get("/", (req, res) => {
    res.json("fisrtN : Panuwat, lastN : Anu")
})

let products = [
    { id: 1, name: 'Loptop', price: 1500},
    { id: 2, name: 'Smartphone', price: 800},
    { id: 3, name: 'Tablet', price: 900}
]

app.get("/products", (req, res) => {
    res.json(products)
})

app.get("/products/:id", (req, res) => {
    res.json(products.find((item) => item.id == req.params.id))
})

app.post("/products", (req, res) => {
    let productsID = products[products.length - 1].id + 1
    let productsName = req.body.name
    let productsPrice = req.body.price
    products = [...products, { id: productsID, name: productsName, price: productsPrice}]
    res.json(products)
})

app.put("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id)
    const productIndex = products.findIndex(i => i.id === productId)
    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" })
    }
    if (req.body.price === undefined || isNaN(parseFloat(req.body.price))) {
      return res.status(400).json({ message: "Price is required and must be a number" })
    }
    const price = parseFloat(req.body.price)
    products[productIndex].price = price
    res.json(products)
})

app.delete("/products/:id", (req, res) => {
    products = products.filter(i => i.id != req.params.id)
    res.json(products)
})

app.listen(port, () => {
    console.log(`server is running in port ${port}`)
})