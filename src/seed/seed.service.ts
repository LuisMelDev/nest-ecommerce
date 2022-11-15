import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(
    private readonly productService: ProductsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async executeSeed() {
    await this.addNewProducts();
    return 'SEED EXECUTED';
  }

  private async addNewProducts() {
    await this.productService.deleteProducts();
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();

    const users: User[] = [];

    initialData.users.forEach(async (user) => {
      users.push(this.userRepository.create(user));
    });

    await this.userRepository.save(users);

    const userAdmin = users[0];

    initialData.products.forEach((product) => {
      this.productService.create(product, userAdmin);
    });
  }
}
