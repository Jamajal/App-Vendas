import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity('products')
class Product{
  @PrimaryColumn('uuid')
  id: string

  @Column('varchar')
  name: string

  @Column('decimal')
  price: number

  @Column('int')
  quantity: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }
}

export default Product;
