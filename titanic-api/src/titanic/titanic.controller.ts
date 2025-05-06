// src/titanic/titanic.controller.ts
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  NotFoundException,
  Query,
} from '@nestjs/common';
import {
  TitanicService,
  SurvivalCountDto,
  SurvivalRateByClassDto,
  SurvivalRateBySexDto,
  AvgAgeByClassDto,
  EmbarkedCountDto,
} from './titanic.service';
import { Passenger } from './entities/passenger.entity';

@Controller('titanic') // Préfixe de route pour ce contrôleur
export class TitanicController {
  constructor(private readonly titanicService: TitanicService) {}

  @Get('passengers') // GET /titanic/passengers
  async findAll(): Promise<Passenger[]> {
    return this.titanicService.findAll();
  }

  @Get('morceau') // GET /titanic/morceau
  async getPieceOfData(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<{ data: Passenger[]; total: number }> {
    return this.titanicService.getPieceOfData(+page, +limit);
  }

  @Get('passengers/:id') // GET /titanic/passengers/892
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Passenger> {
    try {
      return await this.titanicService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error; // Rethrow autres erreurs
    }
  }

  @Get('stats/survival-counts') // GET /titanic/stats/survival-counts
  async getSurvivalCounts(): Promise<SurvivalCountDto[]> {
    return this.titanicService.getSurvivalCounts();
  }

  @Get('stats/survival-rate/by-class') // GET /titanic/stats/survival-rate/by-class
  async getSurvivalRateByClass(): Promise<SurvivalRateByClassDto[]> {
    return this.titanicService.getSurvivalRateByClass();
  }

  @Get('stats/survival-rate/by-sex') // GET /titanic/stats/survival-rate/by-sex
  async getSurvivalRateBySex(): Promise<SurvivalRateBySexDto[]> {
    return this.titanicService.getSurvivalRateBySex();
  }

  @Get('stats/average-age/by-class') // GET /titanic/stats/average-age/by-class
  async getAverageAgeByClass(): Promise<AvgAgeByClassDto[]> {
    return this.titanicService.getAverageAgeByClass();
  }

  @Get('stats/passengers/by-embarked') // GET /titanic/stats/passengers/by-embarked
  async getPassengerCountByEmbarked(): Promise<EmbarkedCountDto[]> {
    return this.titanicService.getPassengerCountByEmbarked();
  }

  @Get('stats/fare-distribution/by-class') // GET /titanic/stats/fare-distribution/by-class
  async getFareDistributionByClass(): Promise<
    Pick<Passenger, 'Pclass' | 'Fare'>[]
  > {
    // Retourne les données brutes pour que le frontend puisse créer le boxplot
    return this.titanicService.getFareDistributionByClass();
  }

  @Get('passengersWithSameSurvived/:survived')
  async getPassengersWithSameSurvived(
    @Param('survived', ParseIntPipe) survived: number,
  ) {
    return this.titanicService.getPassengerWithSameSurvived(survived);
  }

  @Get('passengersWithSameClass/:pclass')
  async getPassengersWithSameClass(
    @Param('pclass', ParseIntPipe) pclass: number,
  ) {
    return this.titanicService.getPassengersWithSameClass(pclass);
  }

  @Get('survivedPassengersWithSameSex/:sex')
  async getSurvivedPassengersWithSameSex(@Param('sex') sex: string) {
    return this.titanicService.getSurvivedPassengersWithSameSex(sex);
  }

  @Get('passengersWithSameEmbarked/:embarked')
  async getPassengersWithSameEmbarked(@Param('embarked') embarked: string) {
    return this.titanicService.getPassengersWithSameEmbarked(embarked);
  }

  @Get('survivedPassengersWithSameClass/:pclass')
  async getSurvivedPassengersWithSameClass(
    @Param('pclass', ParseIntPipe) pclass: number,
  ) {
    return this.titanicService.getSurvivedPassengersWithSameClass(pclass);
  }
}
