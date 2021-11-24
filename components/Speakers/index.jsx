import Button from "/components/Button"
import Speaker from "/components/Speakers/Speaker"

export default function Speakers() {
    return (
        <div className="spacing grid grid-cols-2 bg-dark_blue py-40">
            <div className="">
                <h2 className="w-3/5 text-white font-bold text-6xl">
                    Here’s a selection of this year’s speakers
                </h2>
                <div className="mt-8">
                    <Button text="EXPLORE" />
                </div>
            </div>
            <div className="grid gap-y-8 gap-x-0 grid-cols-2 pl-60">
                <Speaker id="joaooliveira" name="João Oliveira" job="CEO and Founder" company="Fake Company"/>
                <Speaker id="joaooliveira" name="João Oliveira" job="CEO and Founder" company="Fake Company"/>
                <Speaker id="joaooliveira" name="João Oliveira" job="CEO and Founder" company="Fake Company"/>
                <Speaker id="joaooliveira" name="João Oliveira" job="CEO and Founder" company="Fake Company"/>
                <Speaker id="joaooliveira" name="João Oliveira" job="CEO and Founder" company="Fake Company"/>
                <Speaker id="joaooliveira" name="João Oliveira" job="CEO and Founder" company="Fake Company"/>
            </div>
        </div>
    );
}