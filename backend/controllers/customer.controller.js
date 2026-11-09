import { Product } from "../models/product.model.js";
async function getProducts(req, res, next) {
  const { search, max } = req.query;
  console.log(max);
  let products;
  try {
    products = await Product.find();
    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escapedSearch}\\b`, "i");
      products = products.filter((prod) => {
        const searchableText = `${prod.name} ${prod.summary} ${prod.description}`;
        return regex.test(searchableText);
      });
    } else if (max) {
      products = products.slice(products.length - max, products.length);
    }
  } catch (error) {
    next(error);
  }

  res.status(200).json({ message: "Getting products data", products });
}
async function getProductDetail(req, res, next) {
  const { id } = req.params;
  let product;
  try {
    product = await Product.findById(id);
  } catch (error) {
    next(error);
  }
  res.status(200).json({ message: "Getting product detail by id", product });
}

export { getProducts, getProductDetail };
