import Image from "next/image";

interface RatingStarsProps {
  id: string; //used to create unique set of keys
  stars: number;
  max?: number;
  size?: number;
}

function RatingStars({id, stars, max, size}: RatingStarsProps) {
  size = size ?? 20; //default;
  max = max ?? 5; //default
  const arr = [];
  for(let i=1; i<=max; i++) { arr.push(i); }

  return (
    <span className="inline-flex items-center">
      {arr.map(i => (
        <Image
          key={`${id}-${i}`}
          src={`/star-${i>stars ? 'off' : 'on'}.png`}
          alt={i>stars ? 'star outline icon' : 'star filled icon'}
          width={size}
          height={size}
          className="inline-block ml-1" />
      ))}
    </span>
  )
}


export default RatingStars;