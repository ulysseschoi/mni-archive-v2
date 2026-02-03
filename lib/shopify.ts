import { ShopifyProduct, ShopifyCollection, Product } from "@/types/shopify";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

const endpoint = `https://${domain}/api/2024-01/graphql.json`;

async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<T> {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const json = await response.json();

    if (json.errors) {
      throw new Error(json.errors[0].message);
    }

    return json.data;
  } catch (error) {
    console.error("Shopify fetch error:", error);
    throw error;
  }
}

// Transform Shopify product to simplified format
function transformProduct(shopifyProduct: ShopifyProduct): Product {
  const firstVariant = shopifyProduct.variants.edges[0]?.node;
  const images = shopifyProduct.images.edges.map((edge) => edge.node.url);

  return {
    id: shopifyProduct.id,
    handle: shopifyProduct.handle,
    title: shopifyProduct.title,
    description: shopifyProduct.description,
    price: firstVariant?.price.amount || "0",
    compareAtPrice: firstVariant?.compareAtPrice?.amount,
    currencyCode: firstVariant?.price.currencyCode || "KRW",
    image: images[0] || "",
    images: images,
    availableForSale: shopifyProduct.availableForSale,
    tags: shopifyProduct.tags,
    variants: shopifyProduct.variants.edges.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      price: edge.node.price.amount,
      availableForSale: edge.node.availableForSale,
      quantityAvailable: edge.node.quantityAvailable || 0,
      selectedOptions: edge.node.selectedOptions,
    })),
  };
}

// Get all products
export async function getProducts(): Promise<Product[]> {
  const query = `
    query GetProducts {
      products(first: 50) {
        edges {
          node {
            id
            handle
            title
            description
            availableForSale
            tags
            images(first: 5) {
              edges {
                node {
                  id
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  quantityAvailable
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>({
      query,
    });

    return data.products.edges.map((edge) => transformProduct(edge.node));
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

// Get single product by handle
export async function getProduct(handle: string): Promise<Product | null> {
  const query = `
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        description
        descriptionHtml
        availableForSale
        tags
        images(first: 10) {
          edges {
            node {
              id
              url
              altText
              width
              height
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              availableForSale
              quantityAvailable
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
              image {
                url
                altText
              }
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{ product: ShopifyProduct | null }>({
      query,
      variables: { handle },
    });

    if (!data.product) {
      return null;
    }

    return transformProduct(data.product);
  } catch (error) {
    console.error(`Failed to fetch product ${handle}:`, error);
    return null;
  }
}

// Get collection with products
export async function getCollection(handle: string): Promise<ShopifyCollection | null> {
  const query = `
    query GetCollection($handle: String!) {
      collection(handle: $handle) {
        id
        handle
        title
        description
        image {
          id
          url
          altText
          width
          height
        }
        products(first: 50) {
          edges {
            node {
              id
              handle
              title
              description
              availableForSale
              tags
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{ collection: ShopifyCollection | null }>({
      query,
      variables: { handle },
    });

    return data.collection;
  } catch (error) {
    console.error(`Failed to fetch collection ${handle}:`, error);
    return null;
  }
}

// Create checkout
export async function createCheckout(lineItems: Array<{ variantId: string; quantity: number }>) {
  const query = `
    mutation CreateCheckout($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
          lineItems(first: 50) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lineItems: lineItems,
    },
  };

  try {
    const data = await shopifyFetch<{
      checkoutCreate: {
        checkout: any;
        checkoutUserErrors: Array<{ field: string[]; message: string }>;
      };
    }>({
      query,
      variables,
    });

    if (data.checkoutCreate.checkoutUserErrors.length > 0) {
      throw new Error(data.checkoutCreate.checkoutUserErrors[0].message);
    }

    return data.checkoutCreate.checkout;
  } catch (error) {
    console.error("Failed to create checkout:", error);
    throw error;
  }
}

export { shopifyFetch };
