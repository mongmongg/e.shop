import Button from "./UI/Button";
import Carousel from "./Carousel";
const HERO_IMAGES = [
  { id: 0, url: "./hero/hero-1.jpg" },
  { id: 1, url: "./hero/hero-2.jpg" },
  { id: 2, url: "./hero/hero-3.jpg" },
];
export default function Hero() {
  return (
    <article className="px-6 relative h-150 pt-6">
      <Carousel images={HERO_IMAGES} />
      <div className="absolute top-20 left-12 max-w-md  text-white text-left">
        <h1 className="font-header mb-4 leading-16  text-6xl font-normal">
          We are digital meets fashions
        </h1>
        <p>Shopping</p>
      </div>
      <div className="w-full absolute text-center top-120">
        <Button main className="">
          Start shopping
        </Button>
      </div>
    </article>
  );
}
