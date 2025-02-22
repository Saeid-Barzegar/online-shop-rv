'use client'

import store from "../store";
import QueryProvider from "./queryProvider";
import { Provider as ReduxProvider } from 'react-redux'

export default function AppProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <ReduxProvider store={store}>
        {children}
      </ReduxProvider>
    </QueryProvider>
  );
}
