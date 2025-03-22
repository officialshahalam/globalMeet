import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Toaster } from "sonner";


export const metadata = {
  title: "WebEd",
  description: "Digital education platform",
  icons: {
    icon: "/icons/logo.svg", // Favicon
    shortcut: "/icons/logo.svg",
    apple: "/icons/logo.svg",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            socialButtonsVariant: "iconButton",
            logoImageUrl: "/icons/yoom-logo.svg",
          },
          variables: {
            colorText: "#fff",
            colorPrimary: "#0E78F9",
            colorBackground: "#1C1F2E",
            colorInputBackground: "#252A41",
            colorInputText: "#fff",
          },
        }}
      >
        <body >
          {children}
          <Toaster position="top-right" richColors/>
        </body>
      </ClerkProvider>
    </html>
  );
}
