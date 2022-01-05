import Hero from '/components/website/challenges/Hero';
import Challenges from '/components/website/challenges/Challenges';
import Footer from '/components/website/utils/Footer';


function FooterText() {
  return (
    <>Just really useful links here. Bye now 👋</>
  );
}

export default function Index() {
  return (
    <>
      <Hero />
      <Challenges />
      <Footer color="secondary" animationText={<FooterText/>}/>
    </>
  );
}