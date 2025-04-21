import ContactUs from "../components/ContactUs";
import MainHero from "../components/MainHero";
import PrayerTimes from "../components/PrayerTimes";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainHero />
      <main className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <PrayerTimes />
          <ContactUs />
        </div>
        <section className="mt-16 grid md:grid-cols-2 gap-8">
          <img
            src="/images/all-together.jpg"
            alt="Mosque Exterior"
            className="rounded-lg shadow-lg h-full object-cover"
          />
          <img
            src="/images/inside.jpg"
            alt="Mosque Interior"
            className="rounded-lg shadow-lg h-full object-cover"
          />
        </section>
      </main>
    </div>
  );
}
