import AfricanExperience from "./AfricanExperience_Section";
import AioSection from "./Aio_Section";
import TravelSection from "./ContactUs_Section";
import ExploreAfrica from "./ExploreAfrica_Section";
import HeroSection from "./Hero_section";
import OurStory from "./OurStory_Section";
import PaymentOptionSection from "./PaymentOption_Section";
import ServiceOfferedSection from "./ServiceOffered_Section";
import SocialMediawidget from "./SocialMediawidget";

function Home({country}) {
  return (
    <div>
      <HeroSection country={country} />
      <ServiceOfferedSection />
      <PaymentOptionSection />
      <div className="" id="newsSection">
        <AfricanExperience />
      </div>
      <AioSection />
      <TravelSection />
      <div id="socialMedia">
        <SocialMediawidget />
      </div>
      {/* <ExploreAfrica /> */}
      <OurStory />
    </div>
  );
}

export default Home;
