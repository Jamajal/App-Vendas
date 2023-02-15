import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
  id: string,
  name: string,
  price: number,
  quantity: number
}

class UpdateProductService {
  public async execute({ id, name, price, quantity }: IRequest): Promise<Product | undefined>{
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne(id);
    const productExists = await productRepository.findByName(name);

    if(!product)
      throw new AppError('Product not found!', 404)

    if(productExists && productExists.name !== name)
      throw new AppError('Product already exists');

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);
    return product;
  }
}

export default UpdateProductService;
