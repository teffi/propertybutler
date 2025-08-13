import React from 'react';
import type { Property } from "./Property";

import { Link } from "react-router";

type PropertyCardProps = {
    property: Property;
    onEdit: (property: Property) => void;
};

export default function PropertyCard({ property, onEdit }: PropertyCardProps) {

    const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onEdit(property);
    };

    return (
        <Link to={`/properties/${property.id}`}>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="card">
                    <img src={property.imageUrl} alt={property.name} className="" />
                    <section className=""> 
                        <h5 className="strong">
                            <strong>{property.name}</strong>
                        </h5>
                        <p className="line-clamp-3">{property.description}</p>
                        <p>Budget : {property.budget.toLocaleString()}</p>
                        <button type="button" className="" onClick={handleEditClick}>
                            <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900">Edit</span>
                        </button>
                    </section>
                </div>
            </div>
        </Link>
    )
}