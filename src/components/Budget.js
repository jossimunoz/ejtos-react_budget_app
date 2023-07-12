import React, { useCallback, useContext, useEffect } from "react";
import debounce from "lodash.debounce";

import { AppContext } from "../context/AppContext";
const Budget = () => {
  const { budget, currency, dispatch, remaining, expenses } =
    useContext(AppContext);

  const changeHandler = (remaining, expenses) => {
    if (remaining < 0) {
      alert("You cannot reduce the budget value lower than the spending");
      const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
      }, 0);
      dispatch({
        type: "SET_BUDGET",
        payload: totalExpenses,
      });
    }
  };
  const debouncedChangeHandler = useCallback(debounce(changeHandler, 1000), []);

  const setBudget = (val) => {
    dispatch({
      type: "SET_BUDGET",
      payload: val,
    });
  };

  useEffect(() => {
    debouncedChangeHandler(remaining, expenses);
  }, [budget]);

  return (
    <div className="alert alert-secondary">
      <label htmlFor="budget" className="form-label">
        Budget
      </label>
      <div className="input-group mb-3">
        <span className="input-group-text" id="budget">
          {currency}
        </span>
        <input
          onChange={(event) => setBudget(event.target.value)}
          value={budget}
          type="number"
          className="form-control"
          placeholder="Budget"
          aria-label="Budget"
          aria-describedby="budget"
        />
      </div>
    </div>
  );
};
export default Budget;
