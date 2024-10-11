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

function listProducts(req) {
  const limit = parseInt(req.query.limit || 200);
  const fill = parseFloat(req.query.fill || 1);

  return randomProducts(limit, fill);
}

function chaotic(req, res, next) {
  const chaotic = req.query.chaotic === "true";

  if (!chaotic) {
    return next();
  }

  const coin = Math.random();

  if (coin > 0.4) {
    return res.status(500).send("Internal Server Error");
  }

  next();
}

app.use(chaotic);

app.get("/", (req, res) => {
  res.redirect(
    "https://github.com/hashtegner/chaotic-catalog/tree/main?tab=readme-ov-file#usage"
  );
});

app.get("/products.json", (req, res) => {
  res.json(listProducts(req));
});

app.get("/products.xml", (req, res) => {
  const products = listProducts(req);

  res.set("Content-Type", "application/xml");
  res.send(toXml(products));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
