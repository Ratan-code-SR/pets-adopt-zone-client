import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import usePets from '../../../Hooks/usePets';
import PetsCategory from './PetsCategory';
import Title from '../../Title/Title';
import Heading from '../../../components/Heading/Heading';
import { BallTriangle } from 'react-loader-spinner';
const Categories = () => {
    const [pets, loading] = usePets()

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    }
    const petsArray = Array.isArray(pets) ? pets : [];

    const dogs = petsArray?.filter(items => items.category == 'dog')
    const cats = petsArray?.filter(items => items.category == 'cat')
    const birds = petsArray?.filter(items => items.category == 'bird')
    const rabbits = petsArray?.filter(items => items.category == 'rabbit')

    return (
        <div className='my-10 px-2 w-full '>
            <Title heading='Our Pets Category'></Title>
            <Heading heading={`Explore our wide range of adorable pets looking for their forever homes, including cats, dogs, rabbits, birds, and more.`}></Heading>
            <Tabs>
                <TabList>
                    <Tab>Dogs</Tab>
                    <Tab>Cats</Tab>
                    <Tab>Birds</Tab>
                    <Tab>Rabbits</Tab>
                </TabList>
                <TabPanel>
                    <PetsCategory petsData={dogs}></PetsCategory>
                </TabPanel>
                <TabPanel>
                    <PetsCategory petsData={cats}></PetsCategory>
                </TabPanel>
                <TabPanel>
                    <PetsCategory petsData={birds}></PetsCategory>
                </TabPanel>
                <TabPanel>
                    <PetsCategory petsData={rabbits}></PetsCategory>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Categories;