import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./article.entity";

@Index("uq_article_color_article_id", ["articleId"], { unique: true })
@Entity("article_color")
export class ArticleColor {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "article_color_id",
    unsigned: true,
  })
  articleColorId: number;

  @Column( { type:"text",  })
  color: string;

  @Column( { type: "int",name: "article_id", unique: true, unsigned: true })
  articleId: number;

  @OneToOne(() => Article, (article) => article.articleColor, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "articleId" }])
  article: Article;
}
