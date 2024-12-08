import Screensaver from "./components/Screensaver";
import { ScreensaverProvider } from "./ScreensaverContext";
import "./globals.css";

export const metadata = {
  title: "Constituent assembly members",
  description: "Learn about CA Members",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ScreensaverProvider>
          <Screensaver />
          {children}
        </ScreensaverProvider>
      </body>
    </html>
  );
}
