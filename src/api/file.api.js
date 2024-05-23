import axiosClient from "./axiosClient"

export const uploadFoodImage = (file, food_id) => {

  const formData = new FormData();
  formData.append('image', file);
  formData.append('id', food_id);
  return axiosClient.post('file/upload/food-image/',formData,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const uploadServiceImage = (file, service_id) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('id', service_id);
  return axiosClient.post('file/upload/service-image/',formData,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};


