import IProperty from './property';
import IReview from './review';
export default interface ILandlord {
    id: number,
    url: string,
    user_url: string,
    first_name: string,
    last_name: string,
    zip_code: string,
    overall_rating: number,
    properties: IProperty[],
    reviews: IReview[]

}