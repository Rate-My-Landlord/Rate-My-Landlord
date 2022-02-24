// For user state
export interface IAuthUser {
    token?: string,
    id?: number
}


/***** Date Types *****/ 
export interface IUser {
    id: string,
    phone: string,
    firstName: string,
    lastName: string,
    email: string,
    reviews: IReview[],
    createdAt: string
}

export interface IReview {
    id: string,
    author: IUser,
    landlord: ILandlord,
    property: IProperty,
    overallStarRating: number,
    communicationStarRating: number,
    maintenanceStarRating: number,
    text: string,
    createdAt: string
}

export interface ILandlord {
    id: string,
    user: IUser,
    firstName: string,
    lastName: string,
    zipCode: string,
    overallRating: number,
    properties: IProperty[],
    reviews: IReview[],
}

export interface IProperty {
    id: string,
    landlord: ILandlord,
    address1: string,
    address2: string,
    city: string,
    zipCode: string,
    state: string,
    country: string
  }



/***** GraphQL Response Types *****/ 


export interface IReviewResult {
    success: boolean,
    errors?: string[],
    review?: IReview
}

export interface IReviewsResult {
    success: boolean,
    errors?: string[],
    reviews?: IReview[]
}

export interface ILandlordResult {
    success: boolean,
    errors?: string[],
    landlord: ILandlord
}

export interface ILandlordsResult {
    success: boolean,
    errors?: string[],
    landlords: ILandlord[]
}

export interface IPropertyResult {
    success: boolean,
    errors?: string[],
    property: IProperty[]
}


export interface IUserResult {
    NewUser: {
        success: boolean,
        errors?: string[],
        user?: IUser,
        token?: string,
    }
}
