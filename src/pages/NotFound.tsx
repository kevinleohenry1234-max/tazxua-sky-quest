import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from '@/components/Layout';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center text-white">
          <h1 className="mb-4 text-6xl font-bold drop-shadow-2xl">404</h1>
          <p className="mb-4 text-2xl drop-shadow-lg">Oops! Trang không tồn tại</p>
          <a href="/" className="text-white/80 underline hover:text-white drop-shadow-lg">
            Quay về Trang chủ
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
