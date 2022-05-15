import React, { createContext, useReducer } from "react";
import Blackjack from "../lib/Blackjack";

const GameContext = createContext();

const initialState = new Blackjack();

const reducer = (state, action) => {
  switch (action.type) {
    case "UDPATE":
      return { ...state, ...action.payload };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
};

const GameContextProvider = (props) => {
  const defaultGameContext = initialState;

  const [gameContext, updateGameContext] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider
      value={{ gameContext, updateGameContext, defaultGameContext }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export { GameContext, GameContextProvider };

export default GameContext;
