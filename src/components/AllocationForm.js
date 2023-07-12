import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const AllocationForm = (props) => {
  const { dispatch, remaining, currency } = useContext(AppContext);

  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [action, setAction] = useState("");

  const submitEvent = () => {
    if (cost > remaining) {
      alert(
        `The value cannot exceed remaining funds  ${currency} ${remaining}`
      );
      setCost("");
      return;
    }

    const expense = {
      name: name,
      cost: parseInt(cost),
    };
    if (action === "Reduce") {
      dispatch({
        type: "RED_EXPENSE",
        payload: expense,
      });
    } else {
      dispatch({
        type: "ADD_EXPENSE",
        payload: expense,
      });
    }
  };

  return (
    <div>
      <div className="row">
        <div className="d-flex gap-3">
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="input1">
              Department
            </label>
            <select
              className="form-select"
              id="input1"
              onChange={(event) => setName(event.target.value)}
            >
              <option defaultValue>Choose...</option>
              <option value="Marketing" name="marketing">
                Marketing
              </option>
              <option value="Sales" name="sales">
                Sales
              </option>
              <option value="Finance" name="finance">
                Finance
              </option>
              <option value="HR" name="hr">
                HR
              </option>
              <option value="IT" name="it">
                IT
              </option>
              <option value="Admin" name="admin">
                Admin
              </option>
            </select>
          </div>
          <div className="input-group mb-3">
            <label
              className="input-group-text"
              htmlFor="input2"
              onChange={(event) => setAction(event.target.value)}
            >
              Allocation
            </label>
            <select className="form-select" id="input2">
              <option defaultValue value="Add" name="Add">
                Add
              </option>
              <option value="Reduce" name="Reduce">
                Reduce
              </option>
            </select>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">{currency}</span>
            <input
              required="required"
              type="number"
              className="form-control"
              onChange={(event) => setCost(event.target.value)}
              value={cost}
              id="cost"
              aria-label="Amount (with dot and two decimal places)"
            />
            <button
              className="btn btn-primary"
              onClick={submitEvent}
              type="button"
              id="button-addon2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocationForm;
