// Shopify Product Types
export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  tags: string[];
  images: {
    edges: Array<{
      node: {
        id: string;
        url: string;
        altText: string | null;
        width: number;
        height: number;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: ShopifyProductVariant;
    }>;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice: {
    amount: string;
    currencyCode: string;
  } | null;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  image: {
    id: string;
    url: string;
    altText: string | null;
    width: number;
    height: number;
  } | null;
}

// Shopify Collection Types
export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: {
    id: string;
    url: string;
    altText: string | null;
    width: number;
    height: number;
  } | null;
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}

// Shopify Checkout Types
export interface ShopifyCheckout {
  id: string;
  webUrl: string;
  subtotalPrice: {
    amount: string;
    currencyCode: string;
  };
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  lineItems: {
    edges: Array<{
      node: ShopifyLineItem;
    }>;
  };
}

export interface ShopifyLineItem {
  id: string;
  title: string;
  quantity: number;
  variant: ShopifyProductVariant;
}

// Cart Context Types
export interface CartItem {
  variantId: string;
  productId: string;
  title: string;
  quantity: number;
  price: string;
  currencyCode: string;
  image: string | null;
  variant: {
    title: string;
    selectedOptions: Array<{
      name: string;
      value: string;
    }>;
  };
}

export interface Cart {
  items: CartItem[];
  totalQuantity: number;
  subtotal: string;
  currencyCode: string;
}

// Simplified Product for Display
export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: string;
  compareAtPrice?: string;
  currencyCode: string;
  image: string;
  images: string[];
  availableForSale: boolean;
  tags: string[];
  variants: Array<{
    id: string;
    title: string;
    price: string;
    availableForSale: boolean;
    quantityAvailable: number;
    selectedOptions: Array<{
      name: string;
      value: string;
    }>;
  }>;
}
