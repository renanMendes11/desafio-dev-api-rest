import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountHolderDto {
  @ApiProperty()
  cpf: string;
  @ApiProperty()
  name: string;
}
