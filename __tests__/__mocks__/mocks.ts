import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

export class Mocks {
    static databaseTypeOrm(entities: any = [`${__dirname}/**/*.entity{.ts,.js}`]) {
        return [
            TypeOrmModule.forRoot({
                type: 'mysql',
                host: '127.0.0.1',
                port: 9300,
                username: 'root',
                password: '123456aa',
                database: 'testing',
                entities,
                keepConnectionAlive: true,
                // logging: true,
                synchronize: true,
            }),
        ];
    }

    static databaseMongoose() {
        return [
            MongooseModule.forRoot('mongodb://admin:123456aa@localhost:9301/testing?authSource=admin', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            }),
        ];
    }
}
