'use client';

import React from 'react';

interface UtilsCntextType {
  apiUrl: string;
}

const UtilsContext = React.createContext<UtilsCntextType | undefined>(
  undefined,
);

export const useUtils = (): UtilsCntextType => {
  const context = React.useContext(UtilsContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a useUtils');
  }
  return context;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

export default function UtilsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UtilsContext.Provider value={{ apiUrl }}>{children}</UtilsContext.Provider>
  );
}
