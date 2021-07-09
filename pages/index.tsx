import Head from 'next/head';

import styles from '../styles/Home.module.css';

import Main from '../components/main/Main';
import Sidebar from '../components/sidebar/Sidebar';

import { SelectedTableProvider } from '../components/contexts/selectedTableContext';
import { AllTablesProvider } from '../components/contexts/allTablesContext';
import { EditingTableProvider } from '../components/contexts/editingTableContext';

import { FC } from 'react';

const Home: FC = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>SQL Schema Maker</title>
                <meta name="description" content="An SQL Data Modeller that makes your life easier" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SelectedTableProvider>
                <AllTablesProvider>
                    <EditingTableProvider>
                        <Main />
                        <Sidebar />
                    </EditingTableProvider>
                </AllTablesProvider>
            </SelectedTableProvider>
        </div>
    );
};

export default Home;
