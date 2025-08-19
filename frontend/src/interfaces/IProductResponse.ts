export default interface IProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
}
