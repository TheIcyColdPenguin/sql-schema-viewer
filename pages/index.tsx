import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>SQL Schema Maker</title>
                <meta name="description" content="An SQL Data Modeller that makes your life easier" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </div>
    );
}
