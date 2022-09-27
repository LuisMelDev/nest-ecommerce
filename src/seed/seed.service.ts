import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductsService) {}

  async executeSeed() {
    await this.addNewProducts();
    return 'SEED EXECUTED';
  }

  private async addNewProducts() {
    await this.productService.deleteProducts();
    initialData.products.forEach((product) => {
      this.productService.create(product);
    });
  }
}
