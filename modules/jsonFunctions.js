// Function to find the name of the parent key of a given child element
export function findParentKey(json, childKey) {
    // Iterate over each key in the JSON object
    for (let key in json) {
        // If the current value is an object (potential parent)
        if (typeof json[key] === 'object' && json[key] !== null) {
            // If the childKey exists in this object, return the parent key
            if (json[key][childKey] !== undefined) {
                return key;
            }
        }
    }
    // If no parent key is found, return null
    return null;
}