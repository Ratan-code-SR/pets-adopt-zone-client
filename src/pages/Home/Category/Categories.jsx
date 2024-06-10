import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import usePets from '../../../Hooks/usePets';
import PetsCategory from './PetsCategory';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Title from '../../Title/Title';
import Heading from '../../../components/Heading/Heading';
const Categories = () => {
    const [pets, loading] = usePets()

    if (loading) {
        return <div className="flex flex-col items-center justify-center min-h-screen">
            <Title heading="Our Pets Category" />
            <SkeletonTheme baseColor="#f1eff1" highlightColor="#444">
                <div className="w-full px-4">
                    <Skeleton height={40} count={1} />
                    <Skeleton height={20} count={10} className="mt-4" />
                </div>
            </SkeletonTheme>
        </div>
    }
    const dogs = pets?.filter(items => items.category == 'dog')
    const cats = pets?.filter(items => items.category == 'cat')
    const birds = pets?.filter(items => items.category == 'bird')
    const rabbits = pets?.filter(items => items.category == 'rabbit')

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