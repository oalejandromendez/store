import { getAllProducts } from '../../fakeApi/providers/products';
import { Product } from './Product';    
import { useEffect, useState } from 'react'

export const ProductList: React.FC = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await getAllProducts();
        setProducts(response);
    }

    return (
        <div className="container mt-5">
            <h1>Lista de Productos</h1>
            <hr />
            <div className="row rows-cols-1 row-cols-md-3 g-3">
                {
                    products.map( (product: Product) => (
                        <Product 
                            key={ product.id } 
                            { ...product }
                        />
                    ))
                }
            </div>
        </div>
    )
};
