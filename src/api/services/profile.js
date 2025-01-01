import { ciitMerchApi } from "..";

class Profile {
  fnUpdateProfile = async (values) => {
    const payload = {
      Email: values.Email,
      FullName: values.FullName,
      Password: values.Password,
      ContactNumber: values.ContactNumber,
    };

    return await ciitMerchApi("Users").update(values.id, payload);
  };

  fnGetProfileDetails = async (values) => {
    return await ciitMerchApi("Users").find(values.id);
  };

  fnUpdateShippingAddress = async (values) => {
    const payload = {
      ShippingAddress: `${values.address}, ${values.city}, ${values.country} ${values.postalCode}`,
    };

    return await ciitMerchApi("Users").update(values.id, payload);
  };
}

Profile.api = new Profile();
export default Profile;
