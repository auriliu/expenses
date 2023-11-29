//
// extracting code from the Components where im using context.Provider

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function useTheme() {
  const context = useContext(ThemeContext);
  //   returns whatever the value prop is: color in this case.
  if (context === undefined) {
    // it ll be undefined if u r using it outside of its scope.
    // e.g. if u r wrapping only 1 or 2 components only.
    throw new Error("useTheme must be used inside a ThemeProvider.");
  }
  return context;
}

// now whenever u want to access that value prop (color), u only need to import useTheme. 1 line instead of 2.
