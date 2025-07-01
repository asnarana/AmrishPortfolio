import { createContext, useContext, useEffect, useState } from "react";

// type for the theme, can be either "dark" or "light"
type Theme = "dark" | "light";

// props for the theme provider component
type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

// shape of the theme provider state/context
type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

// initial state for the context, defaulting to light theme
const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

// create the context for theme management
const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

// theme provider component to wrap the app and provide theme context
export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "portfolio-theme",
  ...props
}: ThemeProviderProps) {
  // state to hold the current theme, initialized from localstorage or default
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  // effect to update the html root class when the theme changes
  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    root.classList.add(theme);
  }, [theme]);

  // value to provide to the context, including a setter that also updates localstorage
  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  // provide the theme context to children
  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// custom hook to use the theme context in components
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  // throw an error if the hook is used outside the provider
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};