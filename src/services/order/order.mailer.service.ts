import { Injectable } from "@nestjs/common";
import { Order } from "src/entities/order.entity";
import { MailConfig } from "config/mail.config";
import { MailerService } from "@nestjs-modules/mailer";


@Injectable()
export class OrderMailerService {
    constructor(private readonly mailerService: MailerService) {}

async sendOrderEmail(order: Order){
    await this.mailerService.sendMail({
        to: order.cart.user.email,
        bcc: MailConfig.orderNotificationMail,
        subject: 'Order details',
        encoding: ' UTF-8',
        replyTo: 'no-replay@domain.com',
        html: this.createOrderHtml(order),
    });
}

private createOrderHtml(order: Order): string {
    let suma = 0;

    for (const cartArticle of order.cart.cartArticle) {
        const currentPrice = cartArticle.article.articlePrices[cartArticle.article.articlePrices.length-1].price;
        suma += currentPrice;
    }

    return `<p>Poštovani,</p>
            <p>Hvala za Vašu porudžbinu.</p>
            <p>Ovo su stavke Vaše porudžbine:</p>
            <ul>
                ${ order.cart.cartArticle.map(cA => {
                    return `<li>${ cA.article.name } x ${ cA.quantity }</li>`
                }).join('') }
            </ul>
            <p>Ukupno za uplatu: ${ Number(suma).toFixed(2) } EUR</p>`;
}
}
