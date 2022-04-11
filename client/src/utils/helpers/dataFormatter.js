// Clone an object
export const clone = (obj) => Object.assign({}, obj);

// Rename a key in an object
export const renameKey = (object, key, newKey) => {
  const clonedObj = clone(object);
  const targetKey = clonedObj[key];
  delete clonedObj[key];
  clonedObj[newKey] = targetKey;
  return clonedObj;
};

// Data formatting handler
export const dataFormatter = (data, isMultipart) => {
  // If there is a file attached, we format the data as FormData
  if (isMultipart) {
    const formData = new FormData();

    // If user data, rename the 'profilePic' key to 'image'
    if (data?.profilePic) {
      data = renameKey(data, "profilePic", "image");
    }

    // Fill formData with dava values
    Object.keys(data).forEach((key) => formData.append(key, data[key]));

    return formData;

    // If no file is attached, we send back the data as is
  } else {
    return data;
  }
};