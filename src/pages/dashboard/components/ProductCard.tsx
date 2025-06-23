import React from 'react';
import { EcommerceProduct } from '../../../types/dashboard.ts';

interface ProductCardProps {
  product: EcommerceProduct;
  onAddToCart?: (productId: string) => void;
  onViewDetails?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  const handleAddToCart = () => {
    onAddToCart?.(product.id);
  };

  const handleViewDetails = () => {
    onViewDetails?.(product.id);
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'upgrade':
        return 'bg-gradient-to-r from-primary-500 to-primary-600 text-white';
      case 'supplement':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      case 'accessory':
        return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300">
      {/* Product Image */}
      <div className="relative p-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="aspect-square bg-white rounded-xl p-4 shadow-sm">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 space-y-2">
          {product.recommended && (
            <span className="inline-block px-2 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-medium rounded-full">
              Recommended
            </span>
          )}
          {product.popular && (
            <span className="inline-block px-2 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-medium rounded-full">
              Popular
            </span>
          )}
          {product.badge && (
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getBadgeColor(product.type)}`}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="absolute top-3 right-3">
          <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        {/* Benefits */}
        {product.benefits.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Benefits:</h4>
            <ul className="space-y-1">
              {product.benefits.slice(0, 3).map((benefit, index) => (
                <li key={index} className="flex items-center text-xs text-gray-600">
                  <svg className="w-3 h-3 text-primary-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-green-600 font-medium">
              Save ${(product.originalPrice - product.price).toFixed(2)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
              product.inStock
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 hover:shadow-lg transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.inStock ? (
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m6 3a2 2 0 100-4 2 2 0 000 4zm0 0h8a2 2 0 100-4" />
                </svg>
                Add to cart
              </span>
            ) : (
              'Out of stock'
            )}
          </button>
          
          <button
            onClick={handleViewDetails}
            className="w-full py-2 px-4 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:border-primary-500 hover:text-primary-600 transition-all duration-300"
          >
            View details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;