import fs from 'fs';
//import { Blod } from 'buffer';

//const enviroment = async () => {

    //try {
        //const data = await fs.promises.readFile('./package.json', 'utf-8');
        //const contenidoString = data;
        //const contenidoObj = JSON.parse(data);
        //const size = new Blod([data]).size;
        //const info = {
            //contenidoString,
            //contenidoObj,
            //size, 
        //}
        //console.log(info);
        //await fs.promises.writeFile('./info.json', JSON.stringify(info,null,'/t' ))

    //} catch (error) {
        //console.log(error);

    //}
//}

//enviroment()

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    addProduct(product) {
        this.readFile();
        const { title, description, price, thumbnail, code, stock } = product;

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log(
                'El producto debe incluir los campos title, description, price, thumbnail, code, stock'
            );
            return;
        }

        this.products.find(element => element.code == product.code)
        ? console.log ('El código del producto ya existe')
        : this.products.push(product);

        let writeProducts = JSON.stringify(this.products);
        fs.writeFileSync(this.path, writeProducts);
    }

    getProducts() {
        this.readFile();
    }

    getProductById(id) {
        this.readFile();
        return this.products.find(product => product.id == id) ?? console.log('Not Found');

    }

    updateProducts(id, update) {
        this.readFile();
        let product = this.products.find(prod => prod.id == id);
        let keys = Object.keys(update);
        keys.map(key => key !== 'id' && (product[key] = update[key]));
        let writeProducts = JSON.stringify(this.products);
        fs.writeFileSync(this.path, writeProducts);
    }

    deleteProduct(id){
        this.readFile();
        this.products = this.products.filter(prod => prod.id !== id);
        let writeProducts = JSON.stringify(this.products);
    }

    readFile() {
        let resultado = fs.readFileSync(this.path, 'utf-8');
        this.products = JSON.parse(resultado);

    }
}

class Product {
    constructor ({ title, description, price, thumbnail, code, stock }) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = Product.incrementarID(this.id);
    }

    static incrementarID(){
        this.idIncrement ? this.idIncrement++ : (this.idIncrement = 1);
        return this.idIncrement;
    }
}

//crear el manager 
const manager = new ProductManager('products.txt');

//añadir productos
manager.addProduct(
     new Product({ 
        title: 'Pantalón',
        description: 'Un producto',
        price: 500,
        thumbnail: 'http://',
        code: 154,
        stock: 43,

     })

);

manager.addProduct(
    new Product({ 
       title: 'Pantalón',
       description: 'Un producto',
       price: 500,
       thumbnail: 'http://',
       code: 124,
       stock: 43,

    })

);


manager.addProduct(
    new Product({ 
       title: 'Pantalón',
       description: 'Un producto',
       price: 500,
       thumbnail: 'http://',
       code: 453,
       stock: 43,

    })

);
//añadir producto con mismo codigo
manager.addProduct(
    new Product({ 
       title: 'Pantalón',
       description: 'Un producto',
       price: 500,
       thumbnail: 'http://',
       code: 124,
       stock: 43,

    })

);

//mostrar productos
let products = manager.getProducts();
console.log('Todos los productos: ', products);
//mostrar por ID
console.log('Producto id 2: ', manager. getProductById(2));
//eliminar un producto
manager.deleteProduct(3);
//actaulizar un producto
manager.updateProducts(2, {title:  'remera', stock: 12, id: 3});
//mostrar productos
products = manager.getProducts();
//console.log('Todos los productos: ', products);
