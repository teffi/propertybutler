// import { Property } from './Property';

import { useState } from "react";
import type { Property } from "./Property";
import PropertyCard from "./PropertyCard";
import PropertyForm from "./PropertyForm";

interface PropertyListProps {
    properties: Property[];
    onSave: (property: Property) => void;
}

function PropertyList({ properties, onSave }: PropertyListProps) {

    const [activePropertyEditing, setActivePropertyEditing] = useState<Property | null>(null);

    const handleEdit = (property: Property) => {
        setActivePropertyEditing(property);
        // console.log(property);
    };


    return (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {properties.map((project) => (
            <div key={project.id}>
                <PropertyCard property={project} onEdit={handleEdit} />
                <br />

                {(activePropertyEditing && project.id === activePropertyEditing?.id) &&
                    <PropertyForm
                        property={activePropertyEditing}
                        onCancel={() => setActivePropertyEditing(null)}
                        onSave={(savedProperty) => {                            
                            onSave(savedProperty);                        
                            setActivePropertyEditing(null);
                        }} />
                }

            </div>
        ))}
    </div>
    );
}

export default PropertyList;