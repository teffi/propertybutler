import type { Property } from "./Property";

import { Link } from "react-router";
import PropertyDetail from "./PropertyDetail";

type PropertyCardProps = {
    property: Property;
    onEdit: (property: Property) => void;
};

//  This is the typescript way of defining component function props argument. 

//  Alternative typescript way without using type or interface, 
//  function PropertyCard({ property }: { property: Property })
//  `{ property }` is the destructuring pattern. It says "extract property from the object".
//  `: { property: Property }` is the type annotation. It says "the object being destructured must have a key named property whose value is of type Property".



export default function PropertyCard({ property, onEdit }: PropertyCardProps) {
    // const { property } = props;

    // const handleEditClick = (propertyToEdit: Property) => {
    //     console.log(propertyToEdit);
    // };

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
                        <button className="" onClick={() => {
                            onEdit(property);
                        }}>
                            <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900">Edit</span>
                        </button>
                    </section>
                </div>
            </div>
        </Link>
    )
}