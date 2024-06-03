import React, {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  ReactNode,
} from "react";

type State = {
  darkMode: boolean;
};

type Action = {
  type: "TOGGLE_DARK_MODE";
};

const ThemeContext = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

const themeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
};

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, { darkMode: false });

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme };
