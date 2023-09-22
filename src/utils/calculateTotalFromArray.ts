function calculateTotalFromArray<T>(array: T[], propertyPath: string): number {
  // Use the reduce() method to iterate through the array and calculate the total
  const total = array.reduce((accumulator, currentValue) => {
    // Split the property path into segments using dot notation
    const segments = propertyPath.split(".");

    // Traverse the object based on the property path segments
    let nestedValue: any = currentValue;
    for (const segment of segments) {
      // Check if the nested value is an object and if the segment exists
      if (
        typeof nestedValue === "object" &&
        nestedValue !== null &&
        segment in nestedValue
      ) {
        nestedValue = nestedValue[segment];
      } else {
        // If any segment is missing or not an object, consider it as 0
        nestedValue = 0;
        break;
      }
    }

    // Check if the nested value is a valid number
    if (!isNaN(nestedValue)) {
      // Add the nested value to the accumulator
      return accumulator + parseFloat(nestedValue);
    }

    // If the nested value is not a valid number, return the accumulator as is
    return accumulator;
  }, 0); // Initialize accumulator with 0

  return total;
}

export default calculateTotalFromArray;
