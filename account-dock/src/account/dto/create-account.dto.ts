import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty()
  cpf: string;
  @ApiProperty()
  agency: string;
}
