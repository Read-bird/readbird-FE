import { useOutletContext } from 'react-router-dom';

type TOutletContextProps = {
  searchText: string | null;
  searchItem: string;
};

export const useSearchOutletProps = () => {
  return useOutletContext<TOutletContextProps>();
};
