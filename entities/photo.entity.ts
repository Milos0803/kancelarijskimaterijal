import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./article.entity";

@Index("uq_photo_article_id_image_path", ["articleId", "imagePath"], {
  unique: true,
})
@Entity("pohoto",)
export class Pohoto {
  @PrimaryGeneratedColumn({ type: "int", name: "pohoto_id", unsigned: true })
  pohotoId: number;

  @Column({type:"int",  name: "article_id", unsigned: true })
  articleId: number;

  @Column({ type:"varchar", name: "image_path", length: 255 })
  imagePath: string;

  @ManyToOne(() => Article, (article) => article.pohotos, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "articleId" }])
  article: Article;
}
