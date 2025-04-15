import '../app/globals.css';

class AppProps {
  Component: any;
  pageProps: any;
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto text-center">
          &copy; {new Date().getFullYear()} Email Assistant <br /> Made with ❤️ by Aaminah Alam, Jacklyn Cui
        </div>
      </footer>
    </div>
  </>
}