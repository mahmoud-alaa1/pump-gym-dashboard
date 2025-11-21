import { createContext, useContext, useState } from "react";

const initialFilterState = {
  page: "1",
};

const clientsFilter = createContext({});

function useClientsFilter() {
  const val = useContext(clientsFilter);
  if (val === undefined) {
    throw new Error(
      "useClientsFilter must be used within a ClientsFiltersProvide"
    );
  }
  return val;
}

const ClientsFiltersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [clientsFilterState, setClientsFilterState] =
    useState(initialFilterState);
  return (
    <clientsFilter.Provider
      value={{ clientsFilterState, setClientsFilterState }}
    >
      {children}
    </clientsFilter.Provider>
  );
};

export { ClientsFiltersProvider, useClientsFilter };
