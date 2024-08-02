import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Assessment",
 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="d-flex flex-column justify-content-center align-items-center">
        {children}
      </body>
    </html>
  );
}
