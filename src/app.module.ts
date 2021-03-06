import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/database.configuration';
import { Administrator } from 'src/entities/administrator.entity';
import { AdministratorService } from './services/administrator/administrator.service';
import { ArticleColor } from 'src/entities/article.color.entity';
import { Article } from 'src/entities/article.entity';
import { ArticlePrice } from 'src/entities/article.price.entity';
import { ArticleSize } from 'src/entities/article.size.entity';
import { CartArticle } from 'src/entities/cart.article.entyty';
import { Cart } from 'src/entities/cart.entity';
import { Category } from 'src/entities/category.entyty';
import { Order } from 'src/entities/order.entity';
import { Photo } from 'src/entities/photo.entity';
import { User } from 'src/entities/user.entity';
import { AdministratorController } from './controllers/api/administrator.controller';
import { CategoryController } from './controllers/api/category.controller';
import { CategoryService } from './services/category/category.service';
import { ArticleService } from './services/article/article.service';
import { ArticleController } from './controllers/api/article.controller';
import { ArticleFeature } from 'src/entities/article.feature.entity';
import { AuthController } from './controllers/api/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { PhotoService } from './services/photo/photo.service';
import { UserService } from './services/user/user.service';
import { CartService } from './services/cart/cart.service';
import { UserCartController } from './controllers/api/user.cart.controller';
import { OrderService } from './services/order/order.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfig } from 'config/mail.config';
import { OrderMailerService } from './services/order/order.mailer.service';
import { AdministratorOrderController } from './controllers/api/administrator.order.controller';
import { UserRefreshTokenDto } from './dtos/auth/user.refresh.token.dto';
import { UserToken } from './entities/user.token.entity';






@Module({
  imports: [
    TypeOrmModule.forRoot({

      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3306,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [Administrator,
        ArticleColor,
        Article,
        ArticlePrice,
        ArticleSize,
        CartArticle,
        Cart,
        Category,
        Order,
        Photo,
        User,
        ArticleFeature,
        UserToken



      ]
    }),
    TypeOrmModule.forFeature([
      Administrator,
      ArticleColor,
      Article,
      ArticlePrice,
      ArticleSize,
      CartArticle,
      Cart,
      Category,
      Order,
      Photo,
      User,
      ArticleFeature,
    UserToken]),
    MailerModule.forRoot({
      transport: 'smtps://' + MailConfig.username + ':'
        + MailConfig.password + '@'
        + MailConfig.hostname,

      defaults:{
        from: MailConfig.senderEmail,
      }
    }),


  ],
  controllers: [AppController,
    AdministratorController,
    CategoryController,
    ArticleController,
    AuthController,
    UserCartController,
  AdministratorOrderController],
  providers: [
    AppService,
    AdministratorService,
    CategoryService,
    ArticleService,
    PhotoService,
    UserService,
    CartService,
    OrderService,
    OrderMailerService
  ],

  exports: [
    AdministratorService,
    UserService,

  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('auth/*', 'api/category')
      .forRoutes('api/*');
  }

}
