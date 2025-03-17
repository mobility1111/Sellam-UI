export interface Company {
    userId: string;
    name: string;
    tradeNumber: string;
    licenseNumber: string;
    ownerName: string;
    licenseExpiry: string;
    licenceActivity: string;
    commercialLicenseDoc: string;
    longitude: number | null;
    latitude: number | null;
    address: string;
    closeByBusiness: boolean;
    isVerified: boolean;
    isPhysicalShop: boolean;
    user: any | null;
    images: any | null;
    id: string;
    isDeleted: boolean;
    createdDate: string;
    modifiedDate: string | null;
  }