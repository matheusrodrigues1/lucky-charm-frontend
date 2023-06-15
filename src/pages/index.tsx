import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from '@/components/footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/styles.module.css';
import Link from 'next/link';

const IndexPage = () => {
  const router = useRouter();
  const [numero, setNumero] = useState('');
  const [nome, setNome] = useState('');
  const [numeros, setNumeros] = useState<number[]>([]);

  const buscarNumeroAleatorio = async () => {
    try {
      const response = await fetch('https://lucky-charm-7c69fd01a680.herokuapp.com/numero-jogo-do-bicho');
      const data = await response.json();
      setNumero(data.numero);
      setNome(data.nome);
      setNumeros((prevNumeros) => [...prevNumeros, data.numero]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    buscarNumeroAleatorio();

    const interval = setInterval(buscarNumeroAleatorio, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>LuckyCharm</title>
      </Head>

      <nav className="navbar navbar-expand-sm navbar-light bg-gainsboro rounded" style={{ maxWidth: '1000px', margin: '10px auto' , borderTop: '2px solid black', backgroundColor: '#000000'}}>
        <div className="container">
        <a className="navbar-brand" href="#">
          <h3 style={{ color: '#D3D3D3' }}>LuckyCharm</h3>
        </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${router.pathname === '/' ? 'active' : ''}`}
                  aria-current="page"
                  href="/"
                  style={{ color: '#D3D3D3' }}
                >
                  Home
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      <div className={styles.container}>
        <div className={`${styles['number-container']}  p-5 d-flex flex-column align-items-center justify-content-center text-center`}style={{ marginTop: '-150px' }}>
          <h1 style={{ fontSize: '10rem' }}>{numero}</h1>
          <p style={{ fontSize: '3rem' }}>{nome}</p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default IndexPage;
