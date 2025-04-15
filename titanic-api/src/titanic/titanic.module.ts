import { Module } from '@nestjs/common';
import { TitanicController } from './titanic.controller';
import { TitanicService } from './titanic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passenger } from './entities/passenger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Passenger])],
  controllers: [TitanicController],
  providers: [TitanicService],
})
export class TitanicModule {}
