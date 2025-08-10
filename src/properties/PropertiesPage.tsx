import { MOCK_PROPERTIES } from "./MockProperties"
import { Property } from "./Property";
import { projectAPI } from "./propertyAPI";
import PropertyList from "./ProperyList"
import { useEffect, useState } from 'react';


export default function PropertiesPage() {

    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        async function loadProperties() {
            setLoading(true);
            try {
                const data = await projectAPI.get(currentPage);
                if (currentPage === 1) {
                    setProperties(data);
                } else {
                    setProperties([...properties, ...data]);
                }
                setError('');
            }
            catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                }
            } finally {
                setLoading(false);
            }
        }

        loadProperties();
    }, [currentPage]);


    const saveProperty = (property: Property) => {

        projectAPI
            .put(property)
            .then(() => {
                let updatedProjects = properties.map((p) => {
                    /*
                    Finding and Replacing: Inside the .map(), it iterates through each property (p) in the old array. 
                    It finds the one to update by comparing its id with the id of the property object that was passed into the function.
        
                    Updating State: When it finds the matching property, it returns the new, updated property in its place in the new array. 
                    For all other items, it returns them unchanged.             
                    */
                    if (p.id === property.id) {
                        return property;
                    }
                    return p;
                });

                setProperties(updatedProjects);

            })


    };

    const onMoreData = () => {
        setCurrentPage(currentPage + 1);
    }

    return <>
        <h1 className="font-bold text-3xl mx-auto text-center my-10">Properties</h1>

        {error && (
            <div className="row">
                <div className="card large error">
                    <section>
                        <p>
                            <span className="icon-alert inverse "></span>
                            {error}
                        </p>
                    </section>
                </div>
            </div>
        )}

        <div className="w-8/12 mx-auto">
            <PropertyList properties={properties} onSave={saveProperty} />
        </div>


        {!loading && !error && (
            <div className="mx-auto text-center py-10">
                <button className="w-100 p-4 bg-blue-500 pointer text-white" onClick={onMoreData}>
                    More...
                </button>
            </div>
        )}

        {loading && (
            <div className="flex items-center justify-center">
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status">
                    <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span>

                </div>
            </div>
        )}
    </>
}
