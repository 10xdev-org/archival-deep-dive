// components/WelcomeBanner.js

const WelcomeBanner = () => {
    return (
      <div className="welcome-banner h-[70vh] flex flex-col items-start justify-center px-10 bg-transparent text-white">
        <h1 className="text-lg md:text-xl">Welcome to</h1>
        <h2 className="text-5xl md:text-7xl font-bold">Founding Mothers</h2>
        <p className="mt-4 text-lg md:text-xl italic text-orange-500 max-w-lg">
          Explore our curated collection of inspiring stories.
        </p>
      </div>
    );
  };
  
  export default WelcomeBanner;
  