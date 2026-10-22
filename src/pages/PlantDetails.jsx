import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { loadPlant } from "../features/catalogue/catalogueRequests.js";
import plantDetails from "../data/plantDetails.js";
import ProductCard from "../components/products/ProductCard.jsx";
import ProductGallery from "../components/products/ProductGallery.jsx";
import ProductInformation from "../components/products/ProductInformation.jsx";
import AddToCartForm from "../components/cart/AddToCartForm.jsx";

function PlantDetailsContent({ product }) {
  const catalogue = useSelector((state) => state.catalogue.items);
  const apiPlant = useSelector((state) => state.catalogue.details[product.trefleId]);
  const status = useSelector((state) => state.catalogue.detailStatus[product.trefleId]);
  const error = useSelector((state) => state.catalogue.detailErrors[product.trefleId]);
  const catalogueStatus = useSelector((state) => state.catalogue.status);
  const catalogueLoading = catalogueStatus === "idle" || catalogueStatus === "loading";
  const relatedProducts = catalogue.filter((item) => item.id !== product.id).slice(0, 3);
  const name = apiPlant?.scientific_name || product.name;
  const description = apiPlant?.growth?.description || plantDetails[product.trefleId]?.description;

  useEffect(() => {
    // Redux retains successful responses while the user changes routes.
    loadPlant(product.trefleId);
  }, [product.trefleId]);

  return (
    <div className="plant-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li><Link to="/">Home</Link></li>
          <li><span aria-hidden="true">/</span><Link to="/shop">Shop</Link></li>
          <li><span aria-hidden="true">/</span><span aria-current="page">{name}</span></li>
        </ol>
      </nav>
      <article className="plant-layout">
        <ProductGallery images={product.gallery || [product.image]} name={name} />
        <div className="plant-summary">
          <h1>{name}</h1>
          <p className="plant-price">{product.price} kr</p>
          {description && <p>{description}</p>}
          <AddToCartForm product={{ ...product, name }} />
          <ProductInformation product={product} apiPlant={apiPlant}
            loading={!status || status === "loading"} error={error} />
        </div>
      </article>
      <section className="plant-related" aria-labelledby="related-heading">
        <h2 id="related-heading">You may also like</h2>
        <div className="product-grid">
          {!catalogueLoading && relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} headingLevel="h3" />
          ))}
        </div>
      </section>
    </div>
  );
}

export default function PlantDetails() {
  const { id } = useParams();
  const products = useSelector((state) => state.catalogue.items);
  const product = products.find((item) => String(item.id) === id);
  if (!product) return <section><h1>Plant not found</h1><Link to="/shop">Back to shop</Link></section>;

  // Reset gallery, quantity and accordion state when the route selects a new product.
  return <PlantDetailsContent key={product.id} product={product} />;
}
