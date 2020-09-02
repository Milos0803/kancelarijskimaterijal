import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./cart.entity";
import { Article } from "./article.entity";
import * as Validator from 'class-validator';
@Index("uq_cart_article_cart_id", ["cartId"], { unique: true })
@Index("uq_cart_article_id", ["articleId"], { unique: true })
@Entity("cart_article")
export class CartArticle {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "cart_article_id",
    unsigned: true,
  })
  cartArticleId: number;

  @Column( {type:"int", name: "cart_id", unique: true, unsigned: true })
  cartId: number;

  @Column({ type: "int", name: "article_id", unique: true, unsigned: true })
  articleId: number;

  @Column({ type: "int", unsigned: true })
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity:false,
    allowNaN:false,
    maxDecimalPlaces:0
  
  })
  quantity: number;

  @OneToOne(() => Cart, (cart) => cart.cartArticle, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "cart_id", referencedColumnName: "cartId" }])
  cart: Cart;

  @OneToOne(() => Article, (article) => article.cartArticle, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "articleId" }])
  article: Article;
}
