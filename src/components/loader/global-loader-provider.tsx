'use client';

import { createContext, useContext, useState } from 'react';

const LoaderContext = createContext<{
  show: () => void;
  hide: () => void;
  callback: (func: () => Promise<void>) => Promise<void>
  isLoading: boolean;
}>({
  show: () => {},
  hide: () => {},
  callback: async (func: () => Promise<void>) => {},
  isLoading: false,
});

export const GlobalLoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setLoading] = useState(false);

  const show = () => setLoading(true);
  const hide = () => setLoading(false);

  const callback = async (func: () => Promise<void>) => {
    show()
    await func()
    hide()
  }

  return (
    <LoaderContext.Provider value={{ show, hide, callback, isLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useGlobalLoader = () => useContext(LoaderContext);