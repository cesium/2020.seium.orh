import {useState} from 'react';
import Button from '/components/utils/Button';

import List from '../../List';

function Action({ text, url }) {
  return (
    <div className="w-40">
      <Button href={url} text={text} fg_color="white" />
    </div>
  );
}

export default function Challenge({title, description, prizes, rules}) {
    return (
        <div className="grid lg:grid-cols-2 grid-cols-1 mb-24">
            <div className="hidden lg:block">
            <List title={title}/>
            </div>
            <div>
                <h2 className="font-iextrabold text-white text-3xl md:text-4xl xl:text-5xl">{title}</h2>
                <p className="mt-10 font-iregular text-white">{description}</p>

                <div>
                    <h3 className="mt-5 mb-3 text-white text-ibold text-xl md:text-md xl:text-md ">Awards 🏆</h3>
                    <p><a href={prizes[0].url} className="text-iregular text-aqua">1<sup>st</sup> place - {prizes[0].name}</a></p>
                    <p><a href={prizes[1].url} className="text-iregular text-aqua">2<sup>nd</sup> place - {prizes[1].name}</a></p>
                    <p><a href={prizes[2].url} className="text-iregular text-aqua">3<sup>rd</sup> place - {prizes[2].name}</a></p>
                </div>

                <div className="mt-5">
                    { rules != null && <Action text="Read the Rules" url=""/> }
                </div>
            </div>
        </div>
    );
}