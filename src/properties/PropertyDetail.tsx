import React, { useEffect, useState } from "react";
import type { Property } from "./Property";
import { useParams } from "react-router";
import { projectAPI } from "./propertyAPI";


export default function PropertyDetail() {

    const [loading, setLoading] = useState(false);
    const [property, setProperty] = useState<Property | null>(null);
    const [error, setError] = useState<string | null>(null);
    const paramId = useParams<{ id: string }>();
    const propertyId = Number(paramId.id);


    useEffect(() => {
        setLoading(true);
        projectAPI
            .find(propertyId)
            .then((data) => {
                setProperty(data);
                setError(null);
            })
            .catch((e) => {
                console.log("find property detail error")
                setError(e.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [propertyId]);

    return (

        <div className="w-6/12 mx-auto py-10 text-center">

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

            {property && (
                <div className="">
                    <div className="bg-white px-4 py-20 rounded-lg shadow-md">
                        <img
                            className="rounded mx-auto"
                            src={property.imageUrl}
                            alt={property.name}
                        />
                        <section className="flex flex-col gap-3 mt-10">
                            <h3 className="text-xl">
                                <strong>{property.name}</strong>
                            </h3>
                            <p className="px-10">{property.description}</p>
                            <p>Budget : {property.budget}</p>

                            <p>Signed: {property.contractSignedOn.toLocaleDateString()}</p>
                            <p>
                                <mark className="active">
                                    {' '}
                                    {property.isActive ? 'active' : 'inactive'}
                                </mark>
                            </p>
                        </section>
                    </div>
                </div>
            )}


        </div>
    );
}