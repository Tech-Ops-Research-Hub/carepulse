type commonType = { [key: string]: string }

export const phoneNumberRegex = /^0\d{9}$/;

export const genderList: commonType[] = [
  {
    label: "Male",
    value: "Male"
  },
  {
    label: "Female",
    value: "Female"
  },
  {
    label: "Other",
    value: "Other"
  }
];
export const identificationTypes: commonType[] = [
  {
    label: "Birth Certificate",
    value: "BirthCertificate"
  },
  {
    label: "National Id",
    value: "NationalId"
  },
  {
    label: "Other",
    value: "Other"
  }
];