// context/todoContext.tsx
import * as React from 'react';

export type TodoContextType = {
  navigation: string[];
  currNavigation: string[];
};

export const TodoContext = React.createContext<TodoContextType | null>(null);

const NavigationCotext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [navigation, setnavigation] = React.useState([]);
  const [currNavigation, setcurrNavigation] = React.useState([]);
  const updateNavigation = () => {};

  return (
    <TodoContext.Provider value={{ navigation, currNavigation }}>
      {children}
    </TodoContext.Provider>
  );
};

export default NavigationCotext;
