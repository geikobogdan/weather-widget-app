import { RouterProvider, Outlet, createBrowserRouter, Navigate } from 'react-router-dom';
import SignInPage from 'pages/signIn';
import NotFoundPage from 'pages/notFound';
import { AuthProvider, useAuth } from 'auth/authProvider';
import Home from 'pages/home';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

const AuthRouters = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to={{ pathname: '/sign-in' }} replace />;
  } else {
    return <Outlet />;
  }
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRouters />,
    children: [
      {
        path: '/',
        errorElement: <NotFoundPage />,
        element: <Home />,
      },
    ],
  },
  {
    path: '/sign-in',
    element: <SignInPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default App;
