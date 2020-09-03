import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { CartArticle } from "./cart.article.entyty";
import { Order } from "./order.entity";

@Index("uq_cart_user_id", ["userId"], { unique: true })
@Entity("cart")
export class Cart {
  @PrimaryGeneratedColumn({ type: "int", name: "cart_id", unsigned: true })
  cartId: number;

  @Column( {type: "timestamp", name: "created_at" })
  createdAt: Date;

  @Column({type:"int", name: "user_id", unique: true, unsigned: true })
  userId: number;

  @OneToOne(() => User, (user) => user.cart, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;

  @OneToOne(() => CartArticle, (cartArticle) => cartArticle.cart)
  cartArticle: CartArticle[];

  @OneToOne(() => Order, (order) => order.cart)
  order: Order;
}
