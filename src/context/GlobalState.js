// context api creating
import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Initial state (income +ve , expenses -ve)
const initialState = {
  transactions: [
    // { id: 1, text: "Flower", amount: -20 },
    // { id: 2, text: "Salary", amount: 300 },
    // { id: 3, text: "Book", amount: -10 },
    // { id: 4, text: "Camera", amount: 150 },
  ],
};

//create context    (global- as we are moving it to other files into components and we neeed to use it)
export const GlobalContext = createContext(initialState);

// Provider component( wrapping the App.js components here that is (children which is wrapping all components from App.js))
// whenEver we need to call reducer action we need to use dispatch
export const GlobalProvider = ({children}) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  // state is initialState from above transactions and function having globalContext attached to it provider

  // Actions
  function deleteTransaction(id){
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  }
  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
  }
  return (
    // in transactions above transacions are saved as a value object
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
