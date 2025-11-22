export interface StorageDao {
  getImage(imageUrl: string): string;
}