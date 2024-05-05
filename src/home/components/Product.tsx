import { Link } from 'react-router-dom';
import './Product.css';
import { ProductData } from '../../interfaces/product';

export const Product: React.FC<ProductData> = (product: ProductData) => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <img src={ product.image } className="card-img product-image" alt={ product.title }/>
                </div>
                <div className="col-md-6">
                    <h2>{product.title}</h2>
                    <p>Precio: ${product.price}</p>
                    <Link to={`/product/${ product.id }`}>
                        Más..
                    </Link>
                </div>
            </div>
        </div>
    )
}
