import {useState } from 'react';
import Fade from "react-reveal/Fade";

import Card from "/components/utils/Card";

import styles from './style.module.css';

export default function Title() {
    const [hovered, setHover] = useState(false);
    return (
        <div className="font-bold z-50 relative">
            <h5 className="font-iextrabold text-2xl text-quinary m-1">
                Schedule
            </h5>
            <h1 className="font-iextrabold text-white text-6xl w-11/12 md:text-8xl md:w-full xl:text-9xl 2xl:w-4/5 relative z-0">
                Five awesome days of learning, sharing and
                <span className="relative leading-none z-10 w-auto my-4 inline-block">
                    <u className="relative h-auto inline-block z-0" onMouseEnter={() => setHover(true)} 
                        onMouseLeave={() => setHover(false)}>
                            winning
                    </u>
                    <span className="relative h-auto inline-block z-10"> . </span>
                    <div className={styles.cardWrapper}>
                        <Fade top when={hovered} distance="10px">
                            <Card className="z-0" img="/images/mascot-footer.svg" alt="MascotFooter" inverted={true}>
                                <h5 className={`font-ithin ${styles.cardText}`}>Did you see what I did there?</h5>
                            </Card>
                        </Fade> 
                    </div>
                </span>
            </h1>
        </div>
    );
}