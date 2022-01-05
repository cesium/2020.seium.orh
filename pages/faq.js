import Navbar from '/components/website/utils/Navbar';
import Footer from '/components/website/utils/Footer';
import Faqs from '../components/website/faqs';

export default function Faq() {
  return (
    <>
			<div className="spacing bg-secondary">
	      <Navbar button={"quinary"} fg_color={"black"}/>
			</div>
			<Faqs />
      <Footer color="tertiary" />
    </>
  )
}