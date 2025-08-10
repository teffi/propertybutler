import { type SyntheticEvent, useState } from 'react';
import { Property } from "./Property";


export default function PropertyForm({ property: initialProperty, onCancel, onSave }: { property: Property, onCancel: () => void, onSave: (property: Property) => void }) {
    // rename property prop as initialProperty
    const [property, setProperty] = useState(initialProperty);
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        budget: '',
    });


    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if (!isValid()) return;
        onSave(property);
    }

    const handleChange = (event: any) => {

        const { type, name, value, checked } = event.target;
        let updatedValue = (type === 'checkbox') ? checked : value;

        if (type === 'number') {
            updatedValue = Number(updatedValue);
        }

        // Impt: This works because the form's input name is same with the attributes' key name in Property.  
        const change = {
            [name]: updatedValue,
        };

        // need to do functional update b/c
        // the new project state is based on the previous project state
        // so we can keep the project properties that aren't being edited +like project.id
        // the spread operator (...) is used to
        // spread the previous project properties and the new change

        let updatedProperty: Property;
        setProperty((prev) => {
            updatedProperty = new Property({ ...prev, ...change }); //
            return updatedProperty;
        })

        setErrors(() => validate(updatedProperty));
        //setProperty({ ...property, [name]: updatedValue });
    }

    function validate(project: Property) {
        let errors: any = { name: '', description: '', budget: '' };
        if (project.name.length === 0) {
            errors.name = 'Name is required';
        }
        if (project.name.length > 0 && project.name.length < 3) {
            errors.name = 'Name needs to be at least 3 characters.';
        }
        if (project.description.length === 0) {
            errors.description = 'Description is required.';
        }
        if (project.budget === 0) {
            errors.budget = 'Budget must be more than $0.';
        }
        return errors;
    }

    function isValid() {
        return (
            errors.name.length === 0 &&
            errors.description.length === 0 &&
            errors.budget.length === 0
        );
    }


    return (
        <form className="bg-white p-4" onSubmit={handleSubmit}>

            <div className="block py-3">
                <label htmlFor="name" className=" text-sm/6 font-medium">Property Name</label>
                <input type="text" name="name" id="name" placeholder="enter name" className="bg-slate-100" onChange={handleChange} value={property.name} />

                {errors.name.length > 0 && (
                    <div className="py-1 text-red-500">
                        <p>{errors.name}</p>
                    </div>
                )}
            </div>


            <div className="block py-3">
                <label htmlFor="description" className=" text-sm/6 font-medium">Property Description</label>
                <input type="text" name="description" id="description" placeholder="enter description" className="bg-slate-100" onChange={handleChange} value={property.description} />

                {errors.description.length > 0 && (
                    <div className="py-1 text-red-500">
                        <p>{errors.description}</p>
                    </div>
                )}
            </div>

            <div className="block py-3">
                <label htmlFor="budget" className=" text-sm/6 font-medium">Property Budget</label>
                <input type="text" name="budget" id="budget" placeholder="enter budget" className="bg-slate-100" onChange={handleChange} value={property.budget} />

                {errors.budget.length > 0 && (
                    <div className="py-1 text-red-500">
                        <p>{errors.budget}</p>
                    </div>
                )}
            </div>

            <div className="block py-3 ">
                <input type="checkbox" name="isActive" id="isActive" onChange={handleChange} checked={property.isActive} />
                <label htmlFor="isActive" className=" text-sm/6 font-medium"> Active?</label>
            </div>

            <div className="flex flex-row gap-4">
                <button className="bg-green-100 p-3 rounded-sm">Save</button>
                <span />
                <button type="button" className="" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
}