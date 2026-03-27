import { useEffect } from "react";

import authApi from "./api/auth";
import { ToastProvider } from "./components/ui/Toast";
import { AppRouter } from "./router";

const App = () => {
    useEffect(() => {
        authApi
            .me()
            .then((response) => {
                console.info(response);
            })
            .catch((error) => {
                console.error(error);
                authApi.loginAsGuest().then((response) => {
                    console.info(response);
                });
            });
    }, []);

    return (
        <ToastProvider>
            <AppRouter />
        </ToastProvider>
    );
};

export default App;
