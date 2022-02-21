export default interface IReview{
    id: number,
    author_id: number,
    property_id: number,
    landlord_id: number,
    url: string,
    author_url: string,
    property_url: string,
    landlord_url: string,
    communication_star_rating: number,
    maintenance_star_rating: number,
    overall_star_rating: number,
    text: string,
    created_at: string
}