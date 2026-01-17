import { useEffect } from "react";

export const usePageTitle = (pageTitle: string) => {
  useEffect(() => {
    document.title = `Maicon Lara | ${pageTitle}`;
    
    return () => {
      document.title = "Maicon Lara";
    };
  }, [pageTitle]);
};