import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadPlant } from "../features/catalogue/catalogueRequests.js";
import plantDetails from "../data/plantDetails.js";
import ProductCard from "../components/ProductCard.jsx";
import Footer from "../components/Footer.jsx";
import CareIcon from "../components/CareIcon.jsx";
import { addToCart } from "../features/cart/cartSlice.js";

// One reusable accordion section keeps headings and expanded state consistent.
function InfoSection({ id, title, open, onToggle, children }) {
  return (
    <section className="plant-info-section">
      <h2>
        <button
          id={`${id}-heading`}
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
        >
          {title}
          <span className="accordion-arrow" aria-hidden="true">
            {open ? "∧" : "∨"}
          </span>
        </button>
      </h2>

      <div id={id} hidden={!open} aria-labelledby={`${id}-heading`}>
        {children}
      </div>
    </section>
  );
}

function PlantDetailsContent({ product }) {
  const dispatch = useDispatch();
  const catalogue = useSelector((state) => state.catalogue.items);
  const apiPlant = useSelector((state) => state.catalogue.details[product.trefleId]);
  const status = useSelector((state) => state.catalogue.detailStatus[product.trefleId]);
  const error = useSelector((state) => state.catalogue.detailErrors[product.trefleId]);
  const catalogueStatus = useSelector((state) => state.catalogue.status);
  const catalogueLoading = catalogueStatus === "idle" || catalogueStatus === "loading";
  const loading = !status || status === "loading";
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState("care");
  const [imageIndex, setImageIndex] = useState(0);
  const [cartMessage, setCartMessage] = useState("");

  const details = plantDetails[product.trefleId];
  const images = product.gallery || [product.image];
  const relatedProducts = catalogue
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  useEffect(() => {
    // Redux owns this response, so leaving a route does not discard it.
    loadPlant(product.trefleId);
  }, [product.trefleId]);

  const name = apiPlant?.scientific_name || product.name;

  // Prefer an API description; use our sourced text when it is missing.
  const description = apiPlant?.growth?.description || details?.description;

  // Use a readable summary instead of displaying the API country list.
  const origin = details?.origin;

  const maximumHeight = apiPlant?.specifications?.maximum_height?.cm;

  // Validate the amount before passing it to the shared Redux cart.
  function handleAddToCart(event) {
    event.preventDefault();
    const amount = Number(quantity);

    if (!Number.isInteger(amount) || amount < 1) return;

    dispatch(addToCart({ ...product, name, quantity: amount }));
    setCartMessage(`${amount} ${amount === 1 ? "plant" : "plants"} added to your cart.`);
  }

  function changeQuantity(change) {
    const current = Number(quantity);
    const valid = Number.isInteger(current) && current >= 1 ? current : 1;
    setQuantity(String(Math.max(1, valid + change)));
  }
  return (
    <div className="plant-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <span aria-hidden="true">/</span>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{name}</span>
          </li>
        </ol>
      </nav>

      <article className="plant-layout">
        <div className="plant-gallery">
          <img
            className="plant-main-image"
            src={images[imageIndex]}
            alt={name}
          />

          {images.length > 1 && (
            <div className="plant-thumbnails" aria-label="Product images">
              {images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  aria-label={`Show image ${index + 1} of ${name}`}
                  aria-pressed={imageIndex === index}
                  onClick={() => setImageIndex(index)}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="plant-summary">
          <h1>{name}</h1>
          <p className="plant-price">{product.price} kr</p>
          {description && <p>{description}</p>}

          <form className="plant-purchase" onSubmit={handleAddToCart}>
            <div>
              <label className="sr-only" htmlFor="plant-quantity">
                Quantity
              </label>
              <div className="plant-quantity-control">
                <input
                  id="plant-quantity"
                  type="number"
                  min="1"
                  step="1"
                  required
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                />
                <div className="plant-quantity-buttons">
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => changeQuantity(1)}
                  >
                    <span aria-hidden="true">▲</span>
                  </button>
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={Number(quantity) <= 1}
                    onClick={() => changeQuantity(-1)}
                  >
                    <span aria-hidden="true">▼</span>
                  </button>
                </div>
              </div>
            </div>

            <button className="add-to-cart" type="submit">
              Add to Cart
            </button>
          </form>

          <p className="plant-cart-message" role="status">
            {cartMessage}
          </p>

          <InfoSection
            id="plant-care"
            title="Plant care"
            open={openSection === "care"}
            onToggle={() =>
              setOpenSection(openSection === "care" ? null : "care")
            }
          >
            {details ? (
              <dl className="plant-facts">
                <dt>
                  <CareIcon type="light" />
                  Light
                </dt>
                <dd>{details.light}</dd>
                <dt>
                  <CareIcon type="water" />
                  Water
                </dt>
                <dd>{details.water}</dd>
                <dt>
                  <CareIcon type="note" />
                  Care note
                </dt>
                <dd>{details.note}</dd>
              </dl>
            ) : (
              <p>Care guidance is not available for this plant yet.</p>
            )}
          </InfoSection>

          <InfoSection
            id="plant-botanical-details"
            title="Plant information"
            open={openSection === "facts"}
            onToggle={() =>
              setOpenSection(openSection === "facts" ? null : "facts")
            }
          >
            {loading && <p role="status">Loading plant information…</p>}

            {error && <p role="alert">{error}</p>}

            <div className="plant-information">
              {origin && <p>{origin}</p>}

              {apiPlant?.family && (
                <p>
                  This plant belongs to the {apiPlant.family} family
                  {apiPlant.genus && <> and the {apiPlant.genus} genus</>}.
                </p>
              )}

              {maximumHeight != null && (
                <p aria-describedby="plant-height-note">
                  Can grow up to {maximumHeight} cm.*
                </p>
              )}
            </div>

            {maximumHeight != null && (
              <p id="plant-height-note" className="plant-note">
                *This describes how tall the plant can grow, not its size on delivery.
                Growth depends on its conditions.
              </p>
            )}
          </InfoSection>
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
      <Footer />
    </div>
  );
}

export default function PlantDetails() {
  const { id } = useParams();
  const products = useSelector((state) => state.catalogue.items);
  const product = products.find((item) => String(item.id) === id);

  if (!product) {
    return (
      <section>
        <h1>Plant not found</h1>
        <Link to="/shop">Back to shop</Link>
      </section>
    );
  }

  // Reset local quantity and gallery controls while keeping cached API data.
  return <PlantDetailsContent key={product.id} product={product} />;
}
