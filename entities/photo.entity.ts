import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./article.entity";

@Index("uq_photo_article_id_image_path", ["articleId"], {
  unique: true,
})
@Entity("photo")
export class Photo {
  @PrimaryGeneratedColumn({ type: "int", name: "photo_id", unsigned: true })
  photoId: number;

  @Column({type:"int",  name: "article_id", unsigned: true })
  articleId: number;

  @Column({ type:"varchar", name: "image_path", length: 255 })
  imagePath: string;

  @ManyToOne(() => Article, (article) => article.photos, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "articleId" }])
  article: Article;
}
