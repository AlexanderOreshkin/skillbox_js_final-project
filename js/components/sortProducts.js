export function sortProducts(products, sortType) {
    const sortedProducts = [...products];
    
    switch(sortType) {
        case 'price-min':
            return sortedProducts.sort((a, b) => a.price.new - b.price.new);
            
        case 'price-max':
            return sortedProducts.sort((a, b) => b.price.new - a.price.new);
            
        case 'rating-max':
            return sortedProducts.sort((a, b) => b.rating - a.rating);
            
        default:
            return sortedProducts;
    }
}