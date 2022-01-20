import Image from "next/image";

import partners from "/data/partners";

export default function Partners() {
  return (
    <div className="spacing bg-secondary w-full pt-10 pb-10">
      <h2 className="text-center text-5xl lg:text-6xl font-iextrabold py-10 text-white">
        Partners who made this possible
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 my-10">
        {partners.map((partner, i) => (
          <div
            className={`${partners.length == 2 && "col-span-2"}
                                     ${partners.length == 1 && "col-span-4"}
                                     m-auto filter grayscale hover:filter-none`}
            key={i}
          >
            <a href={partner.url} target="_blank" rel="noreferrer">
              <button>
                <Image
                  src={`/images/partners/${partner.image}`}
                  width="200"
                  height="200"
                />
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
