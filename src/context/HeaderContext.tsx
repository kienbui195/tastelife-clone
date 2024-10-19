'use client'

import * as React from "react";

export interface HeaderContext {
  label: string;
  slug: string;
  updateHeader: (label: string, slug: string) => void;
}

const HeaderContext = React.createContext<HeaderContext | undefined>(undefined);

const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = React.useState({
    label: "",
    slug: "",
  });

  // Hàm để cập nhật giá trị
  const updateHeader = (label: string, slug: string) => {
    setValue(prev => ({
      ...prev,
      label,
      slug,
    }));
  };

  return (
    <HeaderContext.Provider value={{ label: value.label, slug: value.slug, updateHeader }}>
      {children}
    </HeaderContext.Provider>
  );
};

const useHeaderContext = () => {
  const context = React.useContext(HeaderContext);

  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }

  return context;
};

export { HeaderProvider, useHeaderContext };
