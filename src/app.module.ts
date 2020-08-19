import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/database.configuration';
import { Administrator } from 'entities/administrator.entity';
import { AdministratorService } from './services/administrator/administrator.service';
import { ArticleColor } from 'entities/article.color.entity';
import { Article } from 'entities/article.entity';
import { ArticlePrice } from 'entities/article.price.entity';
import { ArticleSize } from 'entities/article.size.entity';
import { CartArticle } from 'entities/cart.article.entyty';
import { Cart } from 'entities/cart.entity';
import { Category } from 'entities/category.entyty';
import { Feauture } from 'entities/feauture.entity';
import { Order } from 'entities/order.entity';
import { Pohoto } from 'entities/photo.entity';
import { User } from 'entities/user.entity';




@Module({
  imports: [
    TypeOrmModule.forRoot({

      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3306,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities:[ Administrator,
        ArticleColor,
        Article,
        ArticlePrice,
        ArticleSize,
        CartArticle,
        Cart,
        Category,
        Feauture,
        Order,
        Pohoto,
        User
      
      
      ]
    }),
    TypeOrmModule.forFeature([ Administrator ])


  ],
  controllers: [AppController],
  providers: [AppService,AdministratorService],
})
export class AppModule {}
