import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas = [
    { id: '1', name: 'ninjaA', weapon: 'stars' },
    { id: '2', name: 'ninjaB', weapon: 'nunChucks' },
  ];

  getNinjas(weapon?: 'stars' | 'nunChucks') {
    if (weapon) {
      return this.ninjas.filter((item) => item?.weapon === weapon);
    }
    return this.ninjas;
  }

  getNinjaById(id: string) {
    return this.ninjas.find((item) => item?.id === id);
  }

  createNinja(data: CreateNinjaDto) {
    this.ninjas.push(data);
  }

  updateNinja(id: string, data: UpdateNinjaDto) {
    console.log(this.ninjas);
    console.log(data);
    const updatedNinja = this.ninjas.map((item) => {
      if (item?.id === id) {
        return { ...item, ...data };
      }
      return item;
    });
    this.ninjas = updatedNinja;
    return this?.ninjas?.find((item) => item?.id === data?.id);
  }

  removeNinja(id: string) {
    const updatedNinja = this.ninjas.filter((item) => item?.id !== id);
    this.ninjas = updatedNinja;
    console.log(this.ninjas);
  }
}
