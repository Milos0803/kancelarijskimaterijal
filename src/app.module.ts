import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
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
import { Order } from 'entities/order.entity';
import { Pohoto } from 'entities/photo.entity';
import { User } from 'entities/user.entity';
import { AdministratorController } from './controllers/api/administrator.controller';
import { CategoryController } from './controllers/api/category.controller';
import { CategoryService } from './services/category/category.service';
import { ArticleService } from './services/article/article.service';
import { ArticleController } from './controllers/api/article.controller';
import { ArticleFeature } from 'entities/article.feature.entity';
<<<<<<< HEAD
import { AuthController } from './controllers/api/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
=======
>>>>>>> 97e8d85106799f0ab61dc2039b89be56c80d5b11







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
        Order,
        Pohoto,
        User,
        ArticleFeature
        
      
      
      ]
    }),
    TypeOrmModule.forFeature([ 
      Administrator,
      Category,
      Article,
      ArticlePrice,
    ArticleFeature])


  ],
  controllers: [AppController,
                AdministratorController,
                CategoryController,
<<<<<<< HEAD
                ArticleController,
              AuthController],
=======
                ArticleController],
>>>>>>> 97e8d85106799f0ab61dc2039b89be56c80d5b11
  providers: [
    AppService,
    AdministratorService,
    CategoryService,
  ArticleService],
<<<<<<< HEAD
  
  exports:[
    AdministratorService,

  ]
=======
>>>>>>> 97e8d85106799f0ab61dc2039b89be56c80d5b11
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .exclude('auth/*')
    .forRoutes('api/*');
  }

}
