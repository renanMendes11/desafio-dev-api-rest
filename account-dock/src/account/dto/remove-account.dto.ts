import { ApiProperty } from '@nestjs/swagger';

export class RemoveAccountDto {
  @ApiProperty()
  cpf: string;
}
