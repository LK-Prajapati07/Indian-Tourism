import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-indigo-700 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Explore Incredible India 🇮🇳
        </h1>
        <p className="text-lg mb-8">
          Discover heritage, spiritual, nature and adventure destinations.
        </p>
        <Link
          to="/destinations"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Explore Destinations
        </Link>
      </section>

      {/* Info Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">Trusted Services</h3>
            <p>Verified providers and secure payments.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">Best Destinations</h3>
            <p>Explore India's most beautiful places.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p>Book your trip in just a few clicks.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
