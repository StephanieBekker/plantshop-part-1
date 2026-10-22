import ProductInformationSkeleton from "./ProductInformationSkeleton.jsx";
import Accordion from "../ui/Accordion.jsx";
import Icon from "../ui/Icon.jsx";
import plantDetails from "../../data/plantDetails.js";

// Local care guidance supplements API fields; it is not presented as API data.
export default function ProductInformation({ product, apiPlant, loading, error }) {
  const details = plantDetails[product.trefleId];
  const maximumHeight = apiPlant?.specifications?.maximum_height?.cm;
  const sections = [
    {
      id: "plant-care",
      title: "Plant care",
      content: details ? (
        <dl className="plant-facts">
          <dt><Icon name="sun" className="care-icon" />Light</dt>
          <dd>{details.light}</dd>
          <dt><Icon name="droplet" className="care-icon" />Water</dt>
          <dd>{details.water}</dd>
          <dt><Icon name="info" className="care-icon" />Care note</dt>
          <dd>{details.note}</dd>
        </dl>
      ) : <p>Care guidance is not available for this plant yet.</p>,
    },
    {
      id: "plant-information",
      title: "Plant information",
      content: (
        <>
          {loading && <ProductInformationSkeleton />}
          {error && <p role="alert">{error}</p>}
          <div className="plant-information">
            {details?.origin && <p>{details.origin}</p>}
            {apiPlant?.family && (
              <p>This plant belongs to the {apiPlant.family} family
                {apiPlant.genus && <> and the {apiPlant.genus} genus</>}.</p>
            )}
            {maximumHeight != null && (
              <>
                <p aria-describedby="plant-height-note">Can grow up to {maximumHeight} cm.*</p>
                <p id="plant-height-note" className="plant-note">
                  *This describes how tall the plant can grow, not its size on delivery.
                  Growth depends on its conditions.
                </p>
              </>
            )}
          </div>
        </>
      ),
    },
  ];
  return <Accordion sections={sections} defaultOpenId="plant-care" />;
}
