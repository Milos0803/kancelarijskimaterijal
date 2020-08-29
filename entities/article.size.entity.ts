import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./article.entity";

@Index("uq_article_size_article_id", ["articleId"], { unique: true })
@Entity("article_size")
export class ArticleSize {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "article_size_id",
    unsigned: true,
  })
  articleSizeId: number;

  @Column( { type: "text", })
  size: string;

  @Column( {type:"int", name: "article_id", unique: true, unsigned: true })
  articleId: number;

  @OneToOne(() => Article, (article) => article.articleSize, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "articleId" }])
  article: Article;
}
