import Head from 'next/head';
import Image from 'next/image';
import Stripe from 'stripe';

import { HomeContainer, HomeProduct } from '../styles/pages/home';

import { useKeenSlider } from 'keen-slider/react';

import 'keen-slider/keen-slider.min.css';
import { GetServerSideProps } from 'next';
import { stripe } from '../lib/stripe';

interface IHomeProducts {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}

export default function Home({ products }: IHomeProducts) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48
    }
  });
  console.log(products)

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => (
        <HomeProduct className="keen-slider__slide" key={product.id}>
          <Image alt="" src={product.imageUrl} width={520} height={480}/>
          <footer>
            <strong>{product.name}</strong>
            <span>R$ {product.price}</span>
          </footer>
        </HomeProduct>
      ))}
    </HomeContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });
  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount! / 100
    };
  });

  return {
    props: { products }
  };
};
