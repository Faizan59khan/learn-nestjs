import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { NinjasService } from './ninjas.service';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@ApiTags('Ninja')
@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjaServices: NinjasService) {}

  @Get()
  getNinjas(@Query('weapon') weapon?: 'stars' | 'nunChucks') {
    // const service = new NinjasService(); make constructor once
    return this.ninjaServices.getNinjas(weapon);
  }

  @Get(':id')
  getNinja(@Param('id') id: string) {
    const ninja = this.ninjaServices.getNinjaById(id);
    if (!ninja) {
      throw new Error('Ninja not found');
    }
    return ninja;
  }

  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() data: UpdateNinjaDto) {
    return this.ninjaServices.updateNinja(id, data);
  }

  @Post()
  createNinja(@Body() createNinjaDto: CreateNinjaDto) {
    return this.ninjaServices.createNinja(createNinjaDto);
  }

  @Delete(':id')
  removeNinja(@Param('id') id: string) {
    return this.ninjaServices.removeNinja(id);
  }
}
