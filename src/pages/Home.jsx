import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { sellPlant, buyPlant } from "../features/profit/profitSlice.js";

function Home() {
  const totalProfit = useSelector((state) => state.profit.totalProfit);
  const orderPlaced = useSelector((state) => state.cart.orderPlaced);
  const dispatch = useDispatch();
  return (
    <section className="home">
      {orderPlaced && (
        <p className="order-confirmation" role="status">
          Thank you! Your demo order is complete. No payment has been taken.
        </p>
      )}
      <p className="home-intro">Welcome to SPIRE</p>
      <h1>A little green for your everyday</h1>
      <p>Find your next favorite plant in our shop.</p>
      <section className="profit-panel" aria-labelledby="profit-heading">
        <h2 id="profit-heading">Shop management - Redux demo</h2>
        <p>Profit: {totalProfit} kr</p>
        <div className="profit-actions">
          <button onClick={() => dispatch(sellPlant())}>
            Sell Plant (+5 kr)
          </button>
          <button onClick={() => dispatch(buyPlant())}>
            Buy stock (-2 kr)
          </button>
        </div>
      </section>
    </section>
  );
}
export default Home;
