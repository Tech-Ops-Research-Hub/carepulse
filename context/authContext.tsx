
import { PropsWithChildren, createContext, useContext, useState } from 'react'

type ProfileDataType = { 
  name: string,
  email: string,
  phone: string,
  dob?: string,
  gender?: string,
  address?: string,
  occupation?: string,
  emergencyName?: string,
  emergencyPhone?: string,
  physician?: string,
  policyProvider?: string,
  policyNumber?: string,
  allergies?: string,
  currentMedications?: string,
  familyMedicalHistory?: string,
  medicalHistory?: string,
  idType?: string,
  idNumber?: string,
  idFileUrl?: string,
  treatmentConsent?: boolean,
  informationConsent?: boolean,
  privacyConsent?: boolean,
 };

type CreateProfileType = {
  profileData: ProfileDataType
  setProfileData: (value: ProfileDataType) => void
}


const createProfileTypeValues: CreateProfileType = {} as CreateProfileType

const context = createContext<CreateProfileType>(createProfileTypeValues)

const AuthContext = ({ ...props }: PropsWithChildren) => {
  const [profileData, setProfileData] = useState<ProfileDataType>({} as ProfileDataType)

  const values = {
    profileData,
    setProfileData
  } as const

  return <context.Provider value={values} {...props} />
}

const useAuthCtx = () => useContext(context)

export { AuthContext, useAuthCtx }
