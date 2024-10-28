"use client"

// import localFont from "next/font/local";
import {Outfit} from "next/font/google"
import "./globals.css";
import Header from "@/app/_components/Header";
import {Toaster} from "@/components/ui/sonner";
import {usePathname} from "next/navigation";
import {Provider} from "react-redux";
import {store} from "@/app/_components/State/store";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// Import the Outfit Google font
const outfitFont = Outfit({
    subsets: ["latin"], // You can specify other subsets if needed
});

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata = {
//   title: "Agroking",
//   description: "Created By Ayush Mer.",
// };

export default function RootLayout({ children }) {
    const params = usePathname(); // It will return the current path of the web...

    // const showHeader = params==='/sign-in'|| params==='/create-account'|| params==='/create-admin-account'||
    // params==='/admin-panel' || params==='/signin-admin'?false:true;

    const showHeader = !['/sign-in','/create-account','/create-admin-account','/signin-admin'].includes(params)
    && !params.startsWith('/admin-panel');
  return (
      <Provider store={store}>
          <html lang="en">
          <body
              className={`${outfitFont.className}`}
          >
          {
              showHeader && <Header/>
          }
          {children}
          <Toaster/>
          </body>
          </html>
      </Provider>
  );
}
