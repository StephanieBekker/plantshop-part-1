import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { sellPlant, buyPlant } from "../features/profit/profitSlice.js";

function Home() {
  const totalProfit = useSelector((state) => state.profit.totalProfit);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>SPIR your favorite plants shop</h1>
      <p>Profit: {totalProfit} kr</p>
      <button onClick={() => dispatch(sellPlant())}>Sell Plant</button>
      <button onClick={() => dispatch(buyPlant())}>Buy Plant</button>
    </div>
  );
}
export default Home;
