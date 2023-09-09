import { createContext } from 'react';
import useThemeMode from '../../hooks/theme/useThemeMode';

export const ThemeContext = createContext({
  theme: 'dark',
  toggle: () => { }
})

interface IThemeProviderProps {
  children: React.JSX.Element
}

const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
  const { theme, themeToggler } = useThemeMode();


  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggle: themeToggler
      }}>
      {children}
    </ThemeContext.Provider>);
};

export { ThemeProvider }