import type { Metadata } from "next";
import { Patrick_Hand } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const fontSans = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Dentelligence - AI Powered Dental Assistant",
  description:
    "Get instant dental advice through voice calls with our AI assistant. Avaiable 24/7.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        theme: dark,
        variables: { colorPrimary: "#e78a53" },
      }}
    >
      <html lang="en">
        <head>
          <script dangerouslySetInnerHTML={{ __html: `
            (function(){
              var ICONS = {
                'google.svg': '/clerk-icons/google.svg',
                'github.svg': '/clerk-icons/github.svg',
                'apple.svg': '/clerk-icons/apple.svg'
              };
              function getLocal(val) {
                if (typeof val !== 'string') return null;
                if (!val.includes('img.clerk.com/static/')) return null;
                var regex = new RegExp('https://img\\\\.clerk\\\\.com/static/([a-zA-Z0-9_-]+)\\\\.[a-zA-Z]+', 'g');
                var newVal = val.replace(regex, function(match, id) {
                  var filename = id + '.svg';
                  if (ICONS[filename]) return ICONS[filename];
                  return match; // fallback
                });
                return newVal !== val ? newVal : null;
              }

              // 1. Intercept setAttribute (covers React/Preact setting src, srcset, href, xlink:href on ANY element)
              var origSetAttribute = Element.prototype.setAttribute;
              Element.prototype.setAttribute = function(name, value) {
                var nameLower = name.toLowerCase();
                if (nameLower === 'src' || nameLower === 'srcset' || nameLower === 'href' || nameLower === 'xlink:href') {
                  var local = getLocal(value);
                  if (local) return origSetAttribute.call(this, name, local);
                }
                return origSetAttribute.call(this, name, value);
              };

              // 2. Intercept property setters (covers vanilla JS img.src = ..., img.srcset = ...)
              var patchProperty = function(proto, prop) {
                var desc = Object.getOwnPropertyDescriptor(proto, prop);
                if (desc && desc.set) {
                  var origSet = desc.set;
                  Object.defineProperty(proto, prop, {
                    set: function(val) {
                      var local = getLocal(val);
                      if (local) return origSet.call(this, local);
                      return origSet.call(this, val);
                    },
                    get: desc.get,
                    configurable: true
                  });
                }
              };
              if (typeof HTMLImageElement !== 'undefined') {
                patchProperty(HTMLImageElement.prototype, 'src');
                patchProperty(HTMLImageElement.prototype, 'srcset');
              }
              if (typeof SVGImageElement !== 'undefined') {
                patchProperty(SVGImageElement.prototype, 'href');
              }

              // 3. Intercept fetch (covers API calls where the URL might be extracted later)
              var origFetch = window.fetch;
              window.fetch = function() {
                var args = Array.prototype.slice.call(arguments);
                var url = typeof args[0] === 'string' ? args[0] : (args[0] && args[0].url);
                var local = getLocal(url);
                if (local) {
                  if (typeof args[0] === 'string') args[0] = local;
                  else args[0] = new Request(local, args[0]);
                }
                return origFetch.apply(this, args);
              };
            })();
          ` }} />
        </head>
        <body className={`${fontSans.variable} antialiased dark`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
