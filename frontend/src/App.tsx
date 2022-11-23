import { ChakraProvider, theme } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + ":4000/refresh_token", {
      method: 'POST',
      credentials: "include",
    }).then(async (x) => {
      const data = await x.json();
      console.log(data);
      setLoading(false);
    });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};
