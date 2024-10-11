import express from "express";
import xml from "xml";

import { randomProducts } from "./products.js";

const port = process.env.PORT || 3000;

const app = express();

function toXml(products) {
  const list = products.map((product) => {
    const productData = [
      { id: product.id },
      { title: product.title },
      { description: product.description },
      { link: product.link },
      { image_link: product.image_link },
      { status: product.status },
      { categories: product.categories.join(",") },
      {
        Variants: product.variants.map((variant) => {
          return {
            Variant: [
              { id: variant.id },
              { title: variant.title },
              { image_link: variant.image_link },
              { price: variant.price },
              { sku: variant.sku },
              { inventory_quantity: variant.inventory_quantity },
            ],
          };
        }),
      },
    ];

    return { Product: productData };
  });

  const content = xml({ Products: list }, true);

  return `<?xml version="1.0" encoding="UTF-8"?>\n${content}`;
}

app.get("/products.json", (req, res) => {
  const quantity = parseInt(req.query.quantity || 200);
  const products = randomProducts(quantity);

  res.json(products);
});

app.get("/products.xml", (req, res) => {
  const quantity = parseInt(req.query.quantity || 200);
  const products = randomProducts(quantity);

  res.set("Content-Type", "application/xml");
  res.send(toXml(products));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
