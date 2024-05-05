import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../fakeApi/providers/products";
import './ProductDetail.css';

export const ProductDetail: React.FC = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const onNavigateBack = () => {
        navigate(-1);
    }

    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const product = await getProductById(id ?? "");
            if (!product) {
                return <Navigate to="/index" />
            }
            setProduct(product);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    }

    const generateStarRating = (rating: number) => {
        const starsTotal = 5;
        const starPercentage = (rating / starsTotal) * 100;
        const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
        return (
            <div className="star-rating">
                <div className="star-rating-inner" style={{ width: starPercentageRounded }}></div>
            </div>
        );
    };

    return (
        <div className="container mt-5">
            {product && (
                <div className="row">
                    <div className="col-md-4">
                        <img src={product.image} className="card-img" alt={product.title} />
                    </div>
                    <div className="col-md-8">
                        <h2>{product.title}</h2>
                        <p>Precio: ${product.price}</p>
                        <p>Categoría: {product.category}</p>
                        <p>Descripción: {product.description}.</p>
                        <div className="rating stars">
                            Rating: {generateStarRating(product.rating.rate)}
                        </div>
                        <div className="mt-2">
                            <button
                                className="btn btn-outline-primary"
                                onClick={onNavigateBack}
                            >
                                Regresar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};
