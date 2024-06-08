import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import usePets from '../../../Hooks/usePets';
import PetsCategory from './PetsCategory';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const Categories = () => {
    const [pets,loading] = usePets()
    // console.log(pets);
    const dogs = pets?.filter(items => items.category == 'dog')
    const cats = pets?.filter(items => items.category == 'cat')
    const birds = pets?.filter(items => items.category == 'girds')
    const rabbits = pets?.filter(items => items.category == 'rabbit')
    if (loading) {
        return <div>
             <SkeletonTheme baseColor="#f1eff1" highlightColor="#444">
                <p>
                    <Skeleton count={3} />
                </p>
            </SkeletonTheme>
        </div>
    }
    return (
        <div className='my-10 px-2 '>
            <Tabs>
                <TabList>
                    <Tab>Dogs</Tab>
                    <Tab>Cats</Tab>
                    <Tab>Birds</Tab>
                    <Tab>Rabbit</Tab>
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